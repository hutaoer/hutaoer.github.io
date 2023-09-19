---
sidebar: auto
category: 实践 
tags:
  - docker
---

# 背景
docker比虚拟机更加的轻量化，很适合在服务器或本地部署服务，且不会对其他应用造成影响。毕竟典型的应用，不如一个php的应用，要么使用LAMP，要么使用LNMP。如果是在云服务器上部署一个php环境，需要手动安装nginx 或 apache ，还有 mysql，毕竟繁琐，而使用社区已经打包好的镜像，通过docker部署，相对简单。

# 使用docker

## 安装

### Linux centos7
通过yum安装
```shell
yum install docker  
```
启动docker
```shell
service docker start
```

### MacOS
直接下载对应的安装包，[https://docs.docker.com/desktop/mac/install/](https://docs.docker.com/desktop/mac/install/) <br />安装完成后，启动docker应用。

## 下载镜像
比如，我们下载一个XAMPP的镜像，自带apache，mysql和phpMyAdmin。现在有三个版本，分别支持不容的php版本：

| **PHP version** | **Corresponding tag** |
| --- | --- |
| 8.0.2 | tomsik68/xampp:8 |
| 7.3.7 | tomsik68/xampp:7 |
| 5.6.40 | tomsik68/xampp:5 |

我们选择常用的php 7，那么就下载的时候，带上版本号。
```shell
docker pull tomsik68/xampp:7
```
下载完成后，可以看到类似的结果信息。
![image.png](https://cdn.jsdelivr.net/gh/hutaoer/images/1656250191279-d53d37ad-fe53-410f-8131-4a711d5e8634.png)

## 常用命令

### 镜像操作

#### docker images ，列出本地镜像
![image.png](https://cdn.jsdelivr.net/gh/hutaoer/images/1656253066241-93c800d0-c932-4fc3-a8b4-08f6f118ad68.png)

- **REPOSITORY：**表示镜像的仓库源
- **TAG：**镜像的标签，同一仓库源可以有多个 TAG，代表这个仓库源的不同个版本。
- **IMAGE ID：**镜像ID
- **CREATED：**镜像创建时间
- **SIZE：**镜像大小

#### docker run 镜像，以某个镜像启动容器
```shell
docker run -t -i ubuntu:15.10 /bin/bash 
```
参数说明：

- **-i**: 交互式操作。
- **-t**: 终端。
- **ubuntu:15.10**: 这是指用 ubuntu 15.10 版本镜像为基础来启动容器。如果不指定一个镜像的版本标签，例如你只使用 ubuntu，docker 将默认使用 ubuntu:latest 镜像。
- **/bin/bash**：放在镜像名后的是命令，这里我们希望有个交互式 Shell，因此用的是 /bin/bash

#### docker pull 镜像，拉取某个镜像

#### docker rmi 镜像，删除某个镜像

#### docker build ，构建镜像，本次不会涉及到。

## 启动容器
容器是镜像的实例。
```shell
docker run --name myXampp -p 41061:22 -p 41062:80 -d -v /Users/hutaoer/Sites/test:/www tomsik68/xampp:7
```
通过宿主机的/Users/hutaoer/Sites/test 目录挂载到容器的/www 目录，可通过以下方式指定。这样的话，访问容器的 /www 目录，就对应的会访问到宿主机的 /Users/hutaoer/Sites/test  目录。需要注意的是，这里的 /www 目录，是我们自己在启动容器的时候创建生成的，并不是XAMPP默认的html目录。
```shell
-v /Users/hutaoer/Sites/test:/www
```
启动成功后，会生成一个容器id，通过 docker ps -a 可以查看活跃的容器。CONTAINER_ID 对应的就是容器id的hash缩写。docker ps 是查看所有运行的容器。
```shell
docker ps -a
```
![image.png](https://cdn.jsdelivr.net/gh/hutaoer/images/1656250373961-35cc7b19-652c-4d51-b5de-bc739556529b.png)<br />启动成功后，访问 ：http://localhost:41062（或者127.0.0.1, 或者局域网IP） 
* 就可以访问到 XAMPP 的默认网页。
![image.png](https://cdn.jsdelivr.net/gh/hutaoer/images/1656250462324-289216df-9184-41b5-9213-a209863313c0.png)

## 访问容器终端

#### 有以下几种种方式
方式一：MacOS中，可以通过GUI界面，点击对应容器的【CLI】按钮，会唤起一个宿主机的终端，直接进入。
![image.png](https://cdn.jsdelivr.net/gh/hutaoer/images/1656252053589-4a059063-82e7-44c8-bc42-38a7647980bb.png)
方式二：在命令行中输入 
```shell
docker attach container_id
```
方式三：还是通过命令行输入
```shell
docker exec -it cd6ad6023 /bin/sh
```
好了，掌握了如何进入容器的方式，我们就可以进入到容器进行相应的一些操作。
通过查询`XAMPP`文档，我们知道了`XAMPP`的对应的配置目录为：`/opt/lampp/etc/httpd.conf`  ， 找到 `DocumentRoot` 对应的目录为：`DocumentRoot` `"/opt/lampp/htdocs"` 。这时候，我们把目录修改为 `/www`。
![image.png](https://cdn.jsdelivr.net/gh/hutaoer/images/1656251161114-bee2f4cf-0859-4412-bbab-e543070a7f8b.png)
```shell
DocumentRoot "/www"
<Directory "/www">
```
然后再重启XAMPP服务。<br />使用命令：
```shell
/opt/lampp/lampp restart
```
![image.png](https://cdn.jsdelivr.net/gh/hutaoer/images/1656251255550-48b6b714-9bb0-4fba-a685-80b82a93747e.png)
再把你想要部署的应用，比如 wordpress，解压后放到宿主机的目录下，我这里就是：/Users/hutaoer/Sites/test ，也就是我们把宿主机的目录挂载到了容器上。这样子，你就能通过docker的服务，访问到挂载目录中的应用咯。

## 查看挂载目录
```shell
docker inspect containerId | grep HostConfig -A 20
```


## 宿主机往docker实例传输文件
注意：这里的容器id需要写完整的id
```shell
docker cp php.tar 3ef75ddb2ce8cb29d71e479757ddc32fd797c96a7a4b2573b696ac7d44f21f31:/opt/lampp/htdocs
```

# 配置nginx代理docker
很多情况下，我们服务器或者本机都是装有nginx的，可以利用nginx强大的能力，帮我们做代理。比如把docker容器中的服务，通过nginx代理，实现docker服务的访问。<br />比如，我宿主机中，已经启动了一个docker容器，对外暴露端口为 41062，那么我们宿主机的nginx可以配置如下：
```sh
server {
  listen       80;
  server_name 192.168.0.101; # or localhost
  
  ssl_session_timeout  5m;
  ssl_protocols  TLSv1 TLSv1.1 TLSv1.2;
  ssl_ciphers  ECDHE-RSA-AES128-SHA:AES128-SHA:ECDHE-RSA-DES-CBC3-SHA:DES-CBC3-SHA:ECDHE-RSA-AES256-SHA:AES256-SHA;
  ssl_prefer_server_ciphers   on;
  
  location / {
    proxy_pass      http://127.0.0.1:41062; # 这里是关键
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```
然后，重启你的nginx服务，便可以通过 localhost 或者 ip 或者域名的方式，访问docker暴露的服务了。

### 注意
如果你使用的是云服务器，云平台可能会有一些安全措施，导致你docker暴露的端口无法访问。这时候，就需要在你的ECS实例上面，打开相应的端口才行。