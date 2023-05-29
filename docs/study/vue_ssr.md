---
sidebar: auto
---

# Vue SSR 学习笔记

## 问题
### 为什么路由需要通过工厂函数创建
* 因为每次用户请求的时候，都需要创建新的实例。跟单页应用是不一样的。
* 每个用户的访问，应该是独立的实例和路由实例。

### 由Vue接管路由
* 服务端的入口处，所有的路由透传给 vue的路由，封装为 context 对象传递给 renderer.
* `context = {url: req.url, title: ''}`
* `const html = await  renderer.renderToString(context)`

### 同构代码
* 客户端、服务端是两个不同的Vue 实例，store 不通，通过`__INITIAL_STATE__`属性来试数据互通。

## 预渲染
* prerender-spa-plugin

## ipad
* 屏幕尺寸：15.800751670378618 * 22.737667037861915