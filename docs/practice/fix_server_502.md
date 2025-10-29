---
sidebar: auto
category: practice
ate: 2025-10-29 
tags:
  - Nginx
  - api
  - 接口
  - 502
  - AI
---

# 服务端接口返回 502 错误排查与解决方案

## 问题现象

在 Kubernetes 环境中，当 Get 请求大分页数据时出现以下现象：

- ✅ 请求立刻返回 502 错误（非超时）
- ✅ Nginx 返回 `upstream_status: 502`
- ✅ 应用日志出现 `Broken pipe` 错误
- ✅ 与 `pageSize` 大小强相关（小页正常，大页必现）
- ✅ Pod 状态正常（READY 1/1），readinessProbe 通过

## 问题分析

### 核心矛盾点

1. **Pod 是 READY 状态** → Nginx 应该正常转发请求
2. **请求已进入应用** → 为什么处理完却收到 Broken pipe？
3. **只在 pageSize 大时出现** → 说明响应体大小触发了保护机制

### 根本原因

**Ingress Nginx 的缓冲机制导致大响应体处理失败**

Nginx 默认会缓冲后端响应：
- 小响应体 → 全部缓存到内存，再返回给客户端
- 大响应体 → 写入磁盘临时文件
- 缓冲区耗尽或临时文件写失败 → 直接断开连接 → 502

## 排查步骤

### 1. 检查 Ingress Nginx 缓冲配置

```bash
# 查看当前配置
kubectl exec -n ingress-nginx ingress-nginx-controller-xxxxx -c controller -- cat /etc/nginx/template/nginx.tmpl | grep -A 5 -B 5 proxy_buffer
```

关注以下配置项：
- `proxy_buffering`
- `proxy_buffer_size`
- `proxy_buffers`
- `proxy_max_temp_file_size`

### 2. 检查 Ingress Controller 资源限制

```bash
kubectl describe pod ingress-nginx-controller-xxxxx -n ingress-nginx
```

查看内存限制是否过小：
```yaml
Resources:
  Limits:
    memory: 100Mi   # ❌ 太小！
  Requests:
    memory: 50Mi
```

### 3. 检查临时目录权限和磁盘空间

```bash
kubectl exec -it ingress-nginx-controller-xxxxx -n ingress-nginx -c controller -- sh

# 检查磁盘空间
df -h /tmp

# 测试写入权限
touch /tmp/test.txt && rm /tmp/test.txt
```

### 4. 查看 Ingress Controller 日志

```bash
kubectl logs -n ingress-nginx ingress-nginx-controller-xxxxx | grep -i "buffer"
```

查找相关错误：
- `upstream sent too big response`
- `could not allocate memory for buffer`
- `failed to write body to temp file`

## 解决方案

### 方案1：调整 Ingress Nginx 缓冲配置

通过 ConfigMap 调整缓冲参数：

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: nginx-configuration
  namespace: ingress-nginx
data:
  proxy-buffering: "on"
  proxy-buffer-size: "16k"
  proxy-buffers: "8 16k"
  proxy-max-temp-file-size: "1024m"
```

⚠️ 修改后需要重启 Ingress Controller Pod。

### 方案2：增加 Ingress Controller 内存限制

```yaml
resources:
  limits:
    memory: 512Mi   # 建议至少 512Mi
  requests:
    memory: 256Mi
```

### 方案3：关闭缓冲（推荐）

在 Ingress 注解中关闭缓冲，实现流式传输：

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: cms-ingress
  annotations:
    nginx.ingress.kubernetes.io/configuration-snippet: |
      proxy_buffering off;
      proxy_request_buffering off;
      chunked_transfer_encoding on;
```

**优点：**
- 不占用 Nginx 内存
- 适合大响应体
- 避免 Broken pipe 因缓冲失败

### 方案4：服务端分页限制 + 流式响应（根本解决）

```java
@GetMapping(value = "/open/article/page", produces = "application/json")
public ResponseEntity<StreamingResponseBody> getArticlePage(
    @RequestParam(defaultValue = "1") int pageNum,
    @RequestParam(defaultValue = "20") int pageSize) {

    if (pageSize > 100) pageSize = 100; // 限制分页大小

    StreamingResponseBody stream = outputStream -> {
        List<Article> data = cmsService.getPage(pageNum, pageSize);
        objectMapper.writeValue(outputStream, data);
        outputStream.flush();
    };

    return ResponseEntity.ok(stream);
}
```

## 问题总结

| 问题 | 原因 | 解决方案 |
|------|------|----------|
| 立刻 502 + Broken pipe + 大 pageSize | Ingress Nginx 缓冲区不足 | ✅ 增加 proxy_max_temp_file_size |
| | Ingress Pod 内存限制太小 | ✅ 提升到 512Mi |
| | /tmp 不可写或磁盘满 | ✅ 检查挂载和权限 |
| | 大响应体缓冲失败 | ✅ 关闭 proxy_buffering |
| | 前端传 pageSize 太大 | ✅ 后端强制限制 |

## 快速排查命令

```bash
# 1. 检查 Ingress Controller 内存限制
kubectl describe pod ingress-nginx-controller -n ingress-nginx

# 2. 检查临时目录磁盘和权限
kubectl exec -it ingress-nginx-controller-xxxxx -n ingress-nginx -c controller -- sh
df -h /tmp
touch /tmp/test.txt && rm /tmp/test.txt

# 3. 查看缓冲相关错误日志
kubectl logs -n ingress-nginx ingress-nginx-controller-xxxxx | grep -i "buffer"

# 4. 临时关闭 proxy_buffering 测试
```

## 关键记忆点

**"立刻 502" + "Broken pipe" + "大数据量" = Ingress 缓冲或资源问题，不是应用健康问题。**

当遇到这类问题时，应该重点排查 Nginx 的缓冲机制和资源限制，而不是应用本身的问题。
