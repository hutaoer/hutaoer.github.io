---
sidebar: auto
---

# 节流函数

## 概念
* 防抖 一定时间内持续触发是不会重复调用，当超过一定时间后再回执行，主要应用在输入框这种地方，当需要查询一个东西的时候，持续输入是不会请求接口。

## 编码
```js
function debounce(fn, delay) {
	let timer = null;
	return function(...args) {
		clearTimeout(timer);
		timer = setTimeout(() => {
			fn.apply(this, args);
			clearTimeout(timer)
			timer = null;
		}, delay)
	}
}
```