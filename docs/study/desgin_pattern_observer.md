---
sidebar: auto
category: 学习笔记
tags:
  - 设计模式
  - 观察者模式
---

# 设计模式 —— 观察者模式
* 观察者模式的定义是在对象之间定义一个一对多的依赖，当对象自身状态改变的时候，会自动通知给关心该状态的观察者。

## 角色介绍
* 观察者（订阅者）—— `watcher`
  - `update()`，当事件发生时，具体要做的事情。
* 目标（发布者）—— `Dep`
  - `subs`数组：存储所有的观察者
  - `addSub()`，添加观察者
  - `notify()`, 事件发生的时候，调用观察者的`update()`方法
* 不存在事件中心。依靠发布者来通知观察者。


## 代码实现
```js
class Dep {
	constructor() {
		this.subs = []
	}
	// 添加观察者
	addSub(sub) {
		if(sub && sub.update) {
			this.subs.push(sub)
		}
	}
	notify() {
		this.subs.forEach(sub => sub.update())
	}
}

class Watcher {
	update() {
		console.log('update')
	}
}

let dep = new Dep()
let watcher = new Watcher()
dep.addSub(watcher)
dep.notify()

```

## 总结
* 观察者模式是由具体目标调度，比如当事件触发，Dep 就会去调用观察者的方法，所以观察者模 式的订阅者与发布者之间是存在依赖的。
* 发布/订阅模式由统一调度中心调用，因此发布者和订阅者不需要知道对方的存在。