---
sidebar: auto
---

# vue-router 源码阅读笔记

## mixin了一个方法
* 保证每个组件上，都能挂载`vue-router`的实例。
```js
Vue.mixin({
	beforeCreate() {

	}
})
```

## $route
* 定义`_route`属性，来实现响应式，使用`Vue`提供的方法。
* `Vue.util.defineReactive(this,'_route', this.router.history.current)`
  - 需要测试下这个方法是否会触发更新，看下官网api
* 每次修改都是修改`_route`属性。 `history`上进行监听路由变化，每次变化后，重新赋值，实现`根实例`的更新。


## router-view
* 渲染的时候，需要做循环判断，不断的判断是否有父节点。
* 从最外层开始渲染，一直到最内层。

## 编码心得
* 使用空对象的时候，使用`Object.create(null)`代替`{}`，`{}`会有`__proto__`，另外一个没有，性能更好更纯粹？