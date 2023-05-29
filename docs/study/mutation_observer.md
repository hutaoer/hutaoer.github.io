---
sidebar: auto
category: 学习笔记
tags:
  - ES6
  - MutationObserver
---

# MutationObserver 学习

## 介绍
* `mutation`有转变、突变的意思，根据字面意思理解，`MutationObserver`就是变化的监听者。
* `MutationObserver` 是一个现代浏览器提供的 Web API，用于检测 DOM 的变化。通过这个 API，我们可以监听 `DOM` 的任何变化，比如节点的增加、减少、属性的变动、文本内容的变动等等。
* 它用来替换掉在 `DOM 3` 事件规范中引入的` Mutation events`。

## 使用

### 创建 `MutationObserver` 实例
* 通过传入一个函数来创建一个 `MutationObserver` 实例，每当有变化发生，这个函数将会被调用。函数的第一个参数是一个批次内所有的变化`（mutation）`的集合。
* 语法：`const observer = new MutationObserver(callback);`，`callback`包含两个参数：一个是描述所有被触发改动的 `MutationRecord` 对象数组，另一个是调用该函数的 `MutationObserver` 对象。
* 示例如下：
```js
const mutationObserver = new MutationObserver(function(mutations, observer) {
	mutations.forEach((function(mutation) {
		console.log(mutation)
	}))
})
```

### MutaionRecord
* 每次 dom 变动都会触发通知，合理利用 MutationRecord 进行条件判断，避免执行不必要的 callback 操作。
* 常见的有以下几种类型：
  - `type`: 根据变动类型的不同，取值：`attributes|characterData|childList`
  - `target`: 触发通知的DOM节点
  - `addedNodes`: 被添加的节点
  - `removedNodes`: 被删除的节点

### 实例对象方法
* 创建的实例对象有三个方法：
  - `observe`:开始监听，接收两个参数：1. 观察的DOM；2. 配置监听的信息
  - `disconnect`: 停止监听。阻止 MutationObserver 实例继续接收通知，除非再次调用其 observe() 方法，否则该观察者对象包含的回调函数都不会再被调用。
  - `takeRecords`: 返回已检测到但尚未由观察者的回调函数处理的所有匹配 DOM 更改的列表，使变更队列保持为空。
* 监听元素 `targetNode` 的变化：
```js
mutationObserver.observe(targetNode, {
	attributes: true,
	childList: true,
	subtree: true
})
```
* 停止对变化的监听: `mutationObserver.disconnect()`

### MutationObserver 配置信息
* 用来确定需要观察节点的具体行为。
* 常见的有以下几种：
  - `childList`: 观察子节点的变动，默认值`false`
  - `subtree`: 观察所有后代节点变动，默认值`false`
  - `attributes`: 观察属性的变动，默认值`false`
  - `characterData`: 字符数据变化

## 对比 `Mutation events`
* `Mutation events` 是同步触发的，每次变动都会触发一次调用。
* `MutationObserver API` 是异步触发的， DOM 的变动并不会马上触发，而是要等到当前所有 DOM 操作都结束才触发。所以 `MutationObserver` 相比 `Mutation events` 性能要更高。
* `Mutation events`会被逐步废弃掉。

## 参考
* [你不知道的 MutationObserver](https://cloud.tencent.com/developer/article/1684756)
