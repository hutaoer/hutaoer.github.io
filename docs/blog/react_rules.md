---
sidebar: auto
---

# react 编码规范

## 不要使用数组的索引作为 key

- 数组渲染的时候，用索引作为 key，那么数组元素顺序调换后，数组的渲染 DOM 结构不变。
- 在以下几种情况下可以安全的使用 index 作为索引。
  - 列表不被计算和改变。
  - 列表项没有 ID 属性
  - 列表不会执行重排或筛选操作

## useEffect

- 数据获取，设置订阅或者手动直接更改 React 组件中的 DOM 都属于副作用。
- useEffect Hook 视作 componentDidMount、componentDidUpdate 和 componentWillUnmount 的组合体。
- 每次 render 都会执行`useEffect`，effect 会针对每个 render 运行而不仅仅是一次，这就是 React 在下次运行 effect 之前还清除前一个 render effect 的原因。
- 通过 useEffect，能够将之前在两个生命周期中的内容整合到一个 function 中。

### 需要清理的副作用

- 为什么从 effect 中返回一个 function？这是 effect 可选的清理机制。每个 effect 都可以返回一个在它之后清理的 function。这使得我们能够保持添加订阅和删除订阅彼此接近的订阅的逻辑。这同样是 effect 的一部分。
- 当组件卸载的时候，React 会执行清理工作。
- 如果你习惯了使用 class 组件，你可能想知道为什么每次 re-render 之后，effect 的清理都会执行，而不是在卸载过程中只执行一次（打断点就能知道）。
-

### 不需要清理的副作用

- 什么时候调用`useEffect`?

### effect 优化性能

- 在某些情况下，每次 render 后清理或者使用 effect 可能会产生性能问题。在类组件中，可以通过 componentDidUpdate 中编写 prevProps 或 prevState 的额外比较来解决这个问题：
- 这种方式已经被内置到 useEffect Hook 的 API 中，如果在重新渲染之间没有更新某些值，则可以告诉 React 跳过 effect，为了实现这种方式，需要将数组作为可选的第二个参数传递给 useEffect：

```js
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // 只有在 count 发生变化的时候才会执行这个 effect
```

- 如果数组中有多个项目，只要有一个的比较值是不相同的， React 也会执行这个 effect。
- 如果要运行效果并且仅将其清理一次（在 mount 和 unmount 的时候），可以把空数组 [] 作为第二个参数传递。这告诉 React 你的效果不依赖于来自 props 或 state 的任何值，所以它永远不需要重新运行。这不会作为特殊情况进行处理 - 它直接遵循输入数组的工作方式。虽然传递 [] 更接近 componentDidMount 和 componentWillUnmount 的模式，但是不建议将其作为一种习惯，如果存在订阅的话，经常会导致错误。

### async, await 写法

```js
useEffect(async () => {
  const res = await fetch("https://www.reddit.com/r/reactjs.json");

  const json = await res.json();

  setPosts(json.data.children.map((c) => c.data));
}); //
```

### 用途

- 可以用于很多事情，从设置订阅到创建和清理计时器，再到更改 ref 的值。

## 参考文章

- [React Hook：使用 useEffect](http://www.ptbird.cn/react-hoot-useEffect.html)
  - 阅读总结：
  - useEffect 整合了 class 写法的生命周期函数，包括：`componentWillMount, componentDidMount, componentDidUpdate, componentWillUnmount`
  - useEffect，默认每次都会执行，后一次的 render 会执行前一次 render 的清理方法后，再执行。如果只想执行一次，传参空数组`[]`
  - 不需要手动做优化，默认对比数组中的每个 key 值的变化，任意一个值不同，就执行一次 render 方法。
  - 如果有一些监听的方法，需要在清理方法中解绑，否则会有内存泄漏。
- [useEffect 与 useLayoutEffect](https://zhuanlan.zhihu.com/p/53077376)
