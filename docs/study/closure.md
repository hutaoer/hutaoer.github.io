---
sidebar: auto
---

# 闭包

## 概念
* 闭包是指有权访问另一个函数作用域中变量的函数。
* 说人话就是：在一个函数里边再定义一个函数。这个内部函数一直保持有对外部函数中作用域的访问权限。

## 堆栈内存
* 堆内存：存储引用类型。
* 栈内存：代码执行环境和存储基本类型。
* 函数执行完，但是函数的私有作用域内有内容被栈外的变量还在使用的，栈内存就不能释放里面的基本值也就不会被释放。全局下的栈内存只有页面被关闭的时候才会被释放。
* 闭包中的变量存储的位置是堆内存。假如闭包中的变量存储在栈内存中，那么栈的回收会把处于栈顶的变量自动回收。所以闭包中的变量如果处于栈中那么变量被销毁后，闭包中的变量就没有了。所以闭包引用的变量是出于堆内存中的。

## 使用场景
* 自执行函数
* 回调函数
* 节流防抖函数

### 节流
* 高频函数，按固定的频率触发
```js
function throttle(fn, time) {
	let timer = null;
	return function(...arg) {
		if(timer) return;
		timer = setTimeout(() => {
			fn.apply(this, arg);
			timer = null
		}, time)
	}
}
```

### 防抖
* 一定时间内多次触发，仅执行一次
```js
function debounce(fn, time) {
	let timer = null;
	return function(...arg) {
		clearTimeout(timer)
		timer = setTimeout(() => {
			fn.apply(this, arg);
			timer = null;
		}, time)
	}
}

```