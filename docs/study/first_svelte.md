---
sidebar: auto
category: 学习
date: 2023-01-18 
tags:
  - Svelte
---

# Svelte 初体验

## Svelte 介绍
* `Svelte`正如其名“苗条的”，是一个轻量级的View渲染库。
* `Svelte` 是一种全新的构建用户界面的方法。不同于市面上主流的`React`和`Vue`。得益于`Svelte`的编译系统，可以书写更加简洁的代码来构建我们的应用。
* `Svelte` 在 构建/编译阶段 将你的应用程序转换为理想的 `JavaScript` 应用，而不是在 `运行阶段` 解释应用程序的代码。
* 此外，不使用虚拟DOM，无需复杂的状态管理库。

## 代码结构
* 跟`Vue`类似，CSS，html, js，都放到一个文件（后缀`.svelte`）中。html不需要放到`<template>`标签中。这些 CSS 样式规则 的作用域被限定在当前组件中。
* 可以通过`import`语法来引入其他的组件，但本组件中的样式，也不会对其他的组件产生影响。本组件的样式最终会编译为一个`svelte-${hash}`的class
* 组件本身不需要再额外编写导出语句。
```html
<script>
	import Nested from './Nested.svelte';
</script>
<style>
p {color:red;}
</style>
<p>this is a p tag</p>
```

## 语法细节

### 插入HTML
* 有点类似`React`的 `dangerouslySetInnerHTML`属性，使用`{@html string}`
* 如果使用此功能，则必须手动转义来自不信任源的 `HTML` 代码，否则会使用户面临 `XSS` 攻击的风险。
```html
<script>
	let string = `this string contains some <strong>HTML!!!</strong>`;
</script>

<p>{@html string}</p>
```

### 事件绑定
* 语法为`on:{事件名}`
```html
<script>
	let count = 0;

	function handleClick() {
		count += 1;
	}
</script>

<button on:click={handleClick}>
	Clicked {count} {count === 1 ? 'time' : 'times'}
</button>
```

### 反应性
* 通过 `$:`声明反应式变量
* `反应性`是由`赋值语句`触发的。数组的`push`,`splice` 之类的方法就不会触发自动更新，可以替换为`pop、shift、unshift、splice`方法。


### 属性
* 属性需要声明，并通过`export`暴露给父组件，可以给变量设置默认值。
* 子组件: `A`
```html
<script>
	export let name = 'A component'; // 设置默认值
  export let propA = 'propA'
</script>

<p>My name is {name}, propA is {propA}</p>
```
* 父组件
```html
<script>
	import A from './a.svelte';

	const props = {
		name: 'svelte',
    propA: 'hello A'
	};
</script>

<A {...props}/>
```

### 逻辑
* 多个 `if else`，让我想到了 `PHP`，`Vue`也是类似。
* 使用 `each` 循环输出列表
```html
<script>
let list = [{
  name: '小明',
  age: 20
}, {
  name: '小红',
  age: 20
}]
</script>
{#if x > 10}
	<p>{x} is greater than 10</p>
{:else if 5 > x}
	<p>{x} is less than 5</p>
{:else}
	<p>{x} is between 5 and 10</p>
{/if}
```

## 优势
* 轻量级，仅4KB的大小。相较下，React 足有40多KB
* 简洁优雅，容易上手
* 性能较好：无虚拟DOM，在真实DOM上做了优化。属于构建时，非运行时去解释应用代码。

## 局限性
* 生态不够完善，组件库较少，许多社区提供更多的支持。已经成熟的`React`和`Vue`，都有比较强大的社区力量，还有很多大厂在使用，生态也更完善。
* 用于实际生产环境的大型的企业级的应用案例还较少，其可用性有待进一步验证。
* 构建后的代码体积大小，存在一定的不确定性。
* 国内用户规模较小，大多数公司不愿意冒风险做尝试。

## 结论
* `Svelte`开了一个好头，可以作为兴趣私下研究，但不建议作为生产级的应用开发选择。