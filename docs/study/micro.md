---
sidebar: auto
category: 学习笔记
tags:
  - 微前端
---

# qiankun 学习笔记

## 介绍
* `qiankun` 是一个基于 `single-spa` 的微前端实现库。
* 微前端的核心功能：技术栈无关，独立开发、部署、运行。
* 在我看来，微前端主要解决了以下问题：
  - 方便架构升级
  - 对巨石应用进行拆分

## 基座
* `qiankun` 内部通过 `import-entry-html` 加载子应用。
* 每个子应用有三个生命周期的钩子：`boostrap`,`mount`,`unmount`。如果子应用没有导出这三个生命周期函数，子应用会加载失败。

### 注册子应用
```js
import {registerMicroApps} from 'qiankun';
import apps from './apps';
registerMicroApps(apps, {
	beforeLoad: (app) => {
		console.log('before load', app.name);
		return Promise.resolve()
	},
	afterMount: (app) => {
		console.log('after mount', app.name);
		return Promise.resolve()
	}
})
```

## 子应用


## 应用通信
* 我们定义应用，应该都是按照业务进行划分。每个业务的子应用，要最大可能的保持独立，减少与基座和其他子应用的通信。
* 子应用间频繁的通信会增加应用的复杂度和耦合度。


## 沙箱机制
* Qiankun的沙箱隔离主要实现了三种模式：
  - LegacySandbox
  - ProxySandBox
  - snapshotSanBox
* `LegacySanBox`用于singular单例模式，而多实例的场景将切换为`ProxySanBox`

### LegacySandbox
* 使用`Proxy`对`window`对象进行劫持。
* `addedPropsMapInSandbox`，用于记录在沙盒运行期间新增的全局变量，用于在卸载自应用时还原全局变量。
* `modifiedPropsOriginalValueMapInSandbox`，记录沙盒运行期间更新的全局变量，用于在卸载自应用时还原全局变量。
* 当调用set向子应用的proxy/window对象设置属性时，所有的属性设置和更新都会记录在`addedPropsMapInSandbox`，`modifiedPropsOriginalValueMapInSandbox`，然后在统一记录到`currentUpdatedPropsValueMap`中。而调用get从子应用`proxy/window`中取值时，对于非构造函数的函数取值将会`this`绑定到`window`之后在进行返回。
* 在激活沙箱是会通过`currentUpdatedPropsValueMap`查询子应用的独立状态池(即沙箱激活状态下更新的全局状态)，还原子应用状态。

### SnapshotSandbox
* 当浏览器不支持`Proxy`的时候，降级为`SnapshotSandbox`.
* active函数： 在子应用激活时，为window对象打一个快照，记录沙箱激活前的状态，打完快照之后内部通过modifyPropsMap将window还原到上次沙箱运行环境，也就是恢复沙箱运行期间的window状态
* inactive函数：沙箱关闭时，通过遍历比较每个属性，将被改变的window对象属性记录在modifyPropsMap中，并通过快照还原被激活前沙箱的状态，相当于时清除沙箱运行期间全局变量的污染。
* SnapshotSandbox沙箱实现对window状态的隔离管理，但是在子应用运行期间将会对全局window对象进行污染，所以SnapshotSandbox只可以用于在单实例的情况下，在多实例的场景下将不在支持隔离。


### Sandbox
* 提供了两个实例方法：`active`和`inactive`
* 在`active`的时候，
* 在`inactive`的时候，将更新的全局属性更新到全局，新增的全局属性删除。


## CSS隔离
* BEM、CSS Modules、CSS in JS。
* BEM: 依赖于内部的约定，容易出错。
* CSS Modules: 通过编译生成，依赖预处理器和打包工具。
* CSS-in-JS: 有运行时的开销，运行时会重新加载样式，有一定的性能损耗。

## 参考
* https://segmentfault.com/a/1190000039200142







## 参考
* [qiankun官网](https://qiankun.umijs.org/zh/guide)
* [从阿里QianKun看前端沙箱隔离](https://blog.csdn.net/qq_44746132/article/details/117385571)