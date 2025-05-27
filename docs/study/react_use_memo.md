---
sidebar: auto
categories: 学习
date: 2025-05-27
tags:
  - React
  - memo
  - 性能优化
---

# React 中使用 memo, useMemo, useCallback

## 代码示例

- https://github.com/hutaoer/react-demo

## memo 的使用

- memo 允许你的组件在 props 没有改变的情况下跳过重新渲染。
- https://zh-hans.react.dev/reference/react/memo

### 子组件不添加 memo

- 默认情况下，组件触发渲染的时候，会按照父组件、子组件的顺序，进行渲染。即使子组件没有变化，也会触发渲染。
- 父组件代码

```jsx
import Demo1 from "./components/Demo1";
import Demo2 from "./components/Demo2";
import { useState, useEffect } from "react";
function App() {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    console.log("handleClick is called");
    setCount(count + 1);
  };
  console.log("App is update");

  return (
    <div className="App">
      <h1>Count: {count}</h1>
      <Demo1 onClick={handleClick} />
      <Demo2 />
    </div>
  );
}

export default App;
```

- Demo1 组件

```jsx
import React from "react";
export default function Demo1(props) {
  console.log("Demo1 is update");
  return (
    <div>
      <h1>Demo1</h1>
      <button
        onClick={() => {
          props.onClick();
        }}
      >
        Click me
      </button>
    </div>
  );
}
```

- Demo2 组件，没有任何的 props ，纯静态组件。但随着父组件的渲染，自身也会渲染，其实这些渲染是不必要的。

```jsx
import React from "react";

export default function Demo2() {
  console.log("Demo2 is update");
  return (
    <div>
      <h1>Demo2</h1>
    </div>
  );
}
```

- 打印日志如下，虽然 Demo2，没有改动，也会渲染。
- ![img](https://raw.githubusercontent.com/hutaoer/images/main/blog/study/react_memo/react_memo1.png)

### 子组件添加 memo 包裹

- 给 Demo2 组件，加上 memo 进行包裹。使用 memo 将组件包装起来，以获得该组件的一个 记忆化 版本。通常情况下，只要该组件的 props 没有改变，这个记忆化版本就不会在其父组件重新渲染时重新渲染。

```jsx
import React from "react";
import { memo } from "react";

export default memo(function Demo2() {
  console.log("Demo2 is update");
  return (
    <div>
      <h1>Demo2</h1>
    </div>
  );
});
```

- App 中，Demo2 传入静态 props 或不传 props

```jsx
// 静态props
<Demo2 count={333}/>
// 不传props
<Demo2 />
```

- 打印日志如下，Demo2 没有改动，props 不变，不会渲染。
- ![img](https://raw.githubusercontent.com/hutaoer/images/main/blog/study/react_memo/react_memo2.png)

### 子组件添加 memo 包裹，传入动态 props

- 这时候，如果 Demo2 的 props 没有改变，则 Demo2 不会重新渲染。但如果 props 为引用对象或发生改变，则失效。memo 仅对传入的 props 做浅比较，所以下面两种情况都会触发渲染。
- 例如：

```jsx
<Demo2 count={count}/>
<Demo2 onClick={handleClick}/>
```

- 由于 handleClick 是一个引用对象，我们可以使用 useCallback 来进行优化。将传入的方法使用 useCallback 来包裹即可。
- App 代码修改如下, 对 handleClick2 使用 useCallback 进行缓存，因此 Demo2 不会重新渲染。

```jsx
import "./App.css";
import Demo1 from "./components/Demo1";
import Demo2 from "./components/Demo2";
import { useState, useCallback } from "react";
function App() {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    console.log("handleClick is called");
    setCount(count + 1);
  };
  console.log("App is update");
  const handleClick2 = useCallback(() => {
    console.log("handleClick2 is called");
  }, []);

  return (
    <div className="App">
      <h1>Count: {count}</h1>
      <Demo1 onClick={handleClick} />
      <Demo2 onClick={handleClick2} />
    </div>
  );
}

export default App;
```

### useMemo 和 useCallback 区别

- useCallback 是 useMemo 的语法糖
- useMemo 需要返回一个结果，不仅可以缓存函数，也可以缓存其他值，比如一些需要大量计算的结果。复杂计算结果的缓存： 当你的组件需要根据输入进行复杂的计算，而这些计算结果不会频繁变化时，使用 useMemo 可以避免在每次渲染时重复计算。 例如，处理大 数据集 的排序、过滤或转换操作。使用 useMemo 来缓存这些 API 调用的结果，从而减少不必要的重绘或重排。

## 总结

- 对于静态组件，直接使用 memo 包裹，减少渲染次数。
- memo 和 useCallback，useMemo 需要配合才能生效。
- 具体问题，具体分析，不要滥用。需要传给 props 的方法，才使用 useCallback 包裹，且需要组件使用 memo 包裹才有效。
- 值得斟酌的场景：

### 非必要使用 useMemo

- 简单的计算

```jsx
const num = 1 + 2;
const num1 = useMemo(() => 1 + 2, []); // 大可不必
```

- 取对象属性

```jsx
const list = [];
const arrLen = list.length;
const arrLen1 = useMemo(() => list.length, []); // 大可不必
```

### 非必要使用 useCallback

- 组件内部的函数

```jsx
const getCount = () => 1 + 2;
const getCount = useCallback(() => 1 + 2, []); // 大可不必
```
