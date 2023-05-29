---
sidebar: auto
---

# HTTP2

## 介绍
* HTTP/2 的主要目标是通过支持完整的请求与响应复用来减少延迟，通过有效压缩 HTTP 标头字段将协议开销降至最低，同时增加对请求优先级和服务器推送的支持。 
* SPDY 引入一个新的 `二进制分帧` 层，以实现请求和响应复用、优先级和标头压缩，目的是更有效地利用底层 TCP 连接。它跟`HTTP/1.X`不兼容。
* HTTP 工作组 基于 SPDY 制定了 `HTTP/2` 这个标准。与 `HTTP/1.1` 相比，`HTTP/2` 的主要变化在于性能提升: 例如复用、标头压缩、优先级和协议协商。

## 二进制分帧层
* `HTTP/2` 所有性能增强的核心在于新的二进制分帧层，它定义了如何封装 HTTP 消息并在客户端与服务器之间传输。
* `HTTP/1.x` 协议以换行符作为纯文本的分隔符，而 `HTTP/2` 将所有传输的信息分割为更小的消息和帧，并采用二进制格式对它们编码。

## 数据流、消息和帧
* 数据流: 已建立的连接内的双向字节流，可以承载一条或多条消息。
* 消息: 与逻辑请求或响应消息对应的完整的一系列帧。
* 帧: HTTP/2 通信的最小单位，每个帧都包含帧头，至少也会标识出当前帧所属的数据流。
* 所有通信都在一个 TCP 连接上完成，此连接可以承载任意数量的双向数据流。
* 每个数据流都有一个唯一的标识符和可选的优先级信息，用于承载双向消息。
* 每条消息都是一条逻辑 HTTP 消息（例如请求或响应），包含一个或多个帧。
* 帧是最小的通信单位，承载着特定类型的数据，例如 HTTP 标头、消息负载等等。 来自不同数据流的帧可以交错发送，然后再根据每个帧头的数据流标识符重新组装。


## 请求与响应复用
* 在 `HTTP/1.x` 中，如果客户端要想发起多个并行请求以提升性能，则必须使用多个 TCP 连接。
* `HTTP2`将 `HTTP` 消息分解为独立的帧，交错发送，然后在另一端重新组装。

## 数据流优先级
* `HTTP/2` 标准允许每个数据流都有一个关联的权重和依赖关系

## 每个来源一个连接
* 所有 HTTP/2 连接都是永久的，而且仅需要每个来源一个连接。

## 服务器推送
* 服务器推送是 HTTP/2 协议里面，唯一一个需要开发者自己配置的功能。其他功能都是服务器和浏览器自动实现，不需要开发者关心。
* 还没有收到浏览器的请求，服务器就把各种资源推送给浏览器。

### Nginx 配置
* 访问`/`目录的时候，推送`/style.css`，添加`http2_push`
```js
server {
    listen 443 ssl http2;
    server_name  localhost;

    ssl                      on;
    ssl_certificate          /etc/nginx/certs/example.crt;
    ssl_certificate_key      /etc/nginx/certs/example.key;

    ssl_session_timeout  5m;

    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_protocols SSLv3 TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers   on;

    location / {
      root   /usr/share/nginx/html;
      index  index.html index.htm;
      http2_push /style.css;
    }
}
```


## 标头压缩
* `HTTP/2` 使用 HPACK 压缩格式压缩请求和响应标头元数据