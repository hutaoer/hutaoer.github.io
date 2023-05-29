---
sidebar: auto
category: 学习笔记
tags:
  - React
---

# React 学习笔记
* `React`是一个用于构建用户界面的 JS 库，相当于 `MVC` 中的`View`层。

## 设计思想
* React 通过一种比传统的双向绑定略微繁琐的方法来实现反向数据传递。尽管如此，但这种需要显式声明的方法更有助于人们理解程序的运作方式。
* state 只能由拥有它们的组件进行更改。

## 版本更新
* React 16
* React 17，没有添加任何面向开发人员的新功能，简化React自身的一次升级。
  - 去除事件池。
  - 事件代理更改。在React 16和更早的版本中，React将对大多数事件执行`document.addEventListener()`。 React 17将在后调用`rootNode.addEventListener()`。
  - 新的`jsx`转换。为全新的 JSX 转换器添加 `react/jsx-runtime` 和 `react/jsx-dev-runtime`。
  - `Concurrent Mode` (实验阶段)。在实现性 API 前添加 `unstable_` 前缀。 
  - `useEffect` 的回调修改为异步调用。`useEffect` 的副作用清理函数是在 `effect` 执行之后立马执行的，但是在使用中发现了如果回调中的操作比较耗时，会造成一些性能问题，现在`useEffect` 的 副作用清理函数会在 `render` 后执行了。
* React 18 Alpha
  - 时间分片是利用了 fiber 的可中断，可继续的功能，每个渲染周期内都会留一部分的时间来响应用户的输入,或者其他 IO 的状态修改。
  - 使用 Transition API 进行并发控制。React 在内部使用了一个“调度程序”，负责对这些回调进行优先级排序和请求
  - 自动批处理，多次调用状态修改函数，会进行合并。如果不想批处理，需要在函数外面包裹一层`flushSync`函数，同步渲染。
  - SSR 支持 Suspense，更快的加载页面。

## 基础

### 对比 Vue
* `JSX` 是一种扩展的 `XML` 语言，最终 `JSX` 写出的代码会被转换成 `React.createElement`的形式。
* `JSX` 中的表达式，是使用`{}`来插入；而 Vue 使用的是“Mustache”语法 (双大括号) 的文本插值。
* 跟 Vue 比较，更接近于原生 JS，比如少了指令、修饰符等一些语法糖。
* `portal` 跟 Vue 中的 `teloport` 类似。
* `props.children` 跟 `slot`类似。
* `Context` 类似 `provider/inject`

#### 指定属性
* 通过引号来指定字符串字面量， `const element = <div dataIndex="o"></div>`
* 通过大括号，来指定表达式，`const el = <img src={url}></img>`
* `React DOM` 使用 `camelCase`（小驼峰命名）来定义属性的名称。
* `React DOM` 在渲染所有输入内容之前，默认会进行转义。它可以确保在你的应用中，永远不会注入那些并非自己明确编写的内容。可以有效的防止XSS攻击。

### 生命周期
* 挂载过程中会依次执行：
  - constructor
  - componentWillMount
  - render
  - componentDidMount,一般组件需要自己加载数据，放到这个函数中

#### 更新
* 有三种途径：父组件更新、自身的状态变化、强制更新

### 数据 State
* 构造函数是唯一可以给 `this.state` 赋值的地方。
* 出于性能考虑，`React` 可能会把多个 `setState()` 调用合并成一个调用。
* 数据是向下流动的，也称之为单向数据流。

### 组件
* 所有 React 组件的 `props` 不能更改。

#### Functional Component
* 函数式组件
```js
function Welcome(props) {
	return <h1>{props.name}></h1>
}
```

#### 类组件
* 即：class 组件。
* `Class` 组件应该始终使用 `props` 参数来调用父类的构造函数。

```js
class Welcome extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return <h1>{this.props.name}</h1>
	}
}
```

#### PureComponent
* 15.3 引入的一个组件基类。
* `shouldComponentUpdate`不会直接返回`true`，而是会对属性和状态进行浅层比较。

#### 渲染
* 条件渲染：
  - `condition && expression`
  - `condition ? expression1 : expression2`
* 在组件的 render 方法中返回 null 并不会影响组件的生命周期。

#### 列表
* 如果列表项目的顺序可能会变化，我们不建议使用索引来用作 `key` 值，因为这样做会导致性能变差，还可能引起组件状态的问题。
* 当我们生成两个不同的数组时，我们可以使用相同的 `key` 值。

#### 事件
* 不能通过返回 `false` 的方式阻止默认行为。你必须显式的使用 `preventDefault`。
* class 的方法默认不会绑定 this，需要手动绑定。有两种方法可以解决：
  - 试验性质的`public class fields`语法，声明方法的时候：`handleClick = () => {console.log()}`, 事件监听：`<button onClick={this.handleClick}></button>`
  - 或者可以使用箭头函数，`handleClick() {}`，事件监听：`<button onClick={() => {this.handleClick()}></button`。这种写法有个问题，每次渲染的时候都会创建回调函数。如果是作为props传入子组件的话，会进行额外的重新渲染。
* 事件传参，有两种方式
  - `<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>`，这种需要显示的传递事件对象 e。
  - `<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>`，默认隐式传递。

### 合成事件
* React 合成事件（`SyntheticEvent`）是React模拟原生DOM事件所有能力的一个事件对象。它遵循 W3C 规范，兼容所有浏览器，拥有与浏览器原生事件相同的接口。
* React 中，所有事件都是合成的，不是原生的，但可以通过 `e.nativeEvent` 属性获取 DOM 事件。
* 为什么使用合成事件
  - 浏览器兼容，使用顶级事件代理机制，保证冒泡的一致性。
  - 避免垃圾回收。引入事件池，从中获取或释放事件对象，避免频繁的创建和销毁事件对象。
  - 方便事件统一管理和事务机制。
* 可以使用 `e.stopPropagation()` 或者 `e.cancelBubble=true（IE）`来阻止事件的冒泡传播。
* 与原生事件区别
  - 命名方式不同。原生为纯小写`<button onclick='handleClick()'>`，React采用小驼峰，`<button onClick={handleClick}>`
  - 事件处理函数写法不同，原生是字符串，React是函数。
  - 阻止默认行为方式不同：原生返回`false`，React 显示调用`preventDefault()`
* 执行顺序
  - 在 React 中，“合成事件”会以事件委托`（Event Delegation）`方式绑定在组件最上层，并在组件卸载`（unmount）`阶段自动销毁绑定的事件。
  - React 所有事件都挂载在 document 对象上；
  - 当真实 DOM 元素触发事件，会冒泡到 document 对象后，再处理 React 事件；
  - 所以会先执行原生事件，然后处理 React 事件；
  - 最后真正执行 document 上挂载的事件。


### 表单
* 表单一般会设计为受控组件，它的状态，会收到用户交互影响而改变，从而也会导致UI层的改变。
* 当需要处理多个 input 元素时，我们可以给每个元素添加 name 属性，并让处理函数根据 event.target.name 的值选择要执行的操作。
* `this.setState({[name]: value})`，这里利用了ES6 计算属性名称的语法。
* 在受控组件上指定 `value` 的值， 会阻止用户更改输入。如果你指定了 value，但输入仍可编辑，则可能是你意外地将value 设置为 undefined 或 null。
* 处理表单的时候，推荐使用受控组件。另一种替代方案是使用非受控组件，这时表单数据将交由 DOM 节点来处理。

### 组合、继承
* 推荐使用组合而非继承来实现组件间的代码重用。
* 通过`children prop` 来将他们的子组件传递到渲染结果中，类似 Vue 中的插槽。也可以通过`prop`来传递组件。
* React 中没有“槽”这一概念的限制，你可以将任何东西作为 props 进行传递。
* 如果想要在组件间复用非 UI 的功能，我们建议将其提取为一个单独的 JavaScript 模块，如函数、对象或者类。组件可以直接引入`（import）`而无需通过 `extend` 继承它们。

## 高级部分

### 代码分割
* 使用 Create React App，该功能已开箱即用。
* 当使用 Babel 时，你要确保 Babel 能够解析动态 import 语法而不是将其进行转换。需要 `@babel/plugin-syntax-dynamic-import` 插件。
* `React.lazy`，可以动态引入组件。然后应在 Suspense 组件中渲染 lazy 组件，如此使得我们可以使用在等待加载 lazy 组件时做优雅降级。
* 如果动态加载的组件有带有样式的，需要做处理，那么打包跟 chunk 文件一起，这样的话 css 文件不会被异步加载。
* 注意：`React.lazy` 目前只支持默认导出（default exports）。
```js
import React, {Suspense} from 'react'
const LazyComp = React.lazy(() => import('./LazyComp'))
function MyComp() {
	return (
		<div>
			<Suspense fallback={<div>loading...</div>}>
				<LazyComp />
			</Suspense>
		</div>
	)
}
```

### Context
* `Context` 提供了一种在组件之间共享此类值的方式，而不必显式地通过组件树的逐层传递 `props`。
* TOFILL

### 高阶组件
* 定义：将组件作为参数，并返回新组件的函数。
* 常见的组件就是：Redux 的 `connect`
* 解决的问题：我们需要一个抽象，允许我们在一个地方定义这个逻辑，并在许多组件之间共享它。


## API

### createElement
* 跟 Vue3.0 中的 `h` 函数很像

## Concurrent 模式
* 目前尚处于实验阶段，可能会在 `React 18` 版本中落地。
* 概念：`Concurrent` 模式是一组 `React` 的新功能，可帮助应用保持响应，并根据用户的设备性能和网速进行适当的调整。在 `Concurrent` 模式中，渲染不是阻塞的。它是可中断的。
* 产生卡顿的原因很简单：一旦渲染开始，就不能被终止。`Concurrent` 模式减少了防抖和节流在 UI 中的需求。因为渲染是可以中断的，React 不需要人为地 延迟 工作以避免卡顿。