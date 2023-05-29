---
sidebar: auto
category: 学习笔记
tags:
  - Proxy
---

# Proxy 学习
* MDN定义：Proxy 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）。
* `const p = new Proxy(target, handler)`，`target`是指需要代理的对象，`handler`用来定义在执行各种操作时，代理对象的行为。


## 参考
* [MDN Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)