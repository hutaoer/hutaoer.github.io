---
sidebar: auto
---

# Vue响应式原理

## Vue 2.0
* `Vue` 采用数据劫持结合`发布者-订阅者模式`的方式来实现数据的响应式。`Object.defineProperty`来劫持数据的`setter，getter`，在数据变动时发布消息给订阅者，订阅者收到消息后进行相应的处理。
* 使用`Object.defineProperty`实现。



## 参考
* [Vue3 为什么要用 Proxy 代替 Object.defineProperty 实现响应式](https://www.jianshu.com/p/8cde476238f0)