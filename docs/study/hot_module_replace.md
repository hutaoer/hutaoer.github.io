---
sidebar: auto
---

# 热更新

## websocket
* webpack-dev-server启动的时候，启动了`websocket`服务。通过websocket，可以建立本地服务和浏览器的双向通信。这样就可以实现当本地文件发生变化，立马告知浏览器可以热更新代码啦！

## webpack监听文件变化
* `webpack-dev-middleware`，调用`compiler.watch`方法。
* 开启对本地文件的监听，当文件发生变化，重新编译，编译完成之后继续监听。
* 将打包好的代码放入内存中。

## HotModuleReplacementPlugin
