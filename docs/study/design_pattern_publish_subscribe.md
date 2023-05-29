---
sidebar: auto
category: 学习笔记
tags:
  - 设计模式
  - 发布-订阅模式
---

# 设计模式 —— 发布-订阅模式

## 角色介绍
* 观察者
* 发布者
* 事件中心

## 代码实现
```js
class EventEmitter {
  constructor(){
    // { eventType: [ handler1, handler2 ] }
    this.subs = {}
  }
  // 订阅通知
  $on(eventType, fn) {
    this.subs[eventType] = this.subs[eventType] || []
    this.subs[eventType].push(fn)
  }
  // 发布通知
  $emit(eventType) {
    if(this.subs[eventType]) {
      this.subs[eventType].forEach(v=>v())
    }
  }
}

// 测试
var bus = new EventEmitter()

// 注册事件
bus.$on('click', function () {
  console.log('click')
})

bus.$on('click', function () {
  console.log('click1')
})

// 触发事件 
bus.$emit('click')

```

## 总结
* 观察者模式是由具体目标调度，比如当事件触发，Dep 就会去调用观察者的方法，所以观察者模 式的订阅者与发布者之间是存在依赖的。
* 发布/订阅模式由统一调度中心调用，因此发布者和订阅者不需要知道对方的存在。