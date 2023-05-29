---
sidebar: auto
---

# React Hooks VS Vue Composition API

## Hooks的意义
* 之前为了逻辑复用，避免耦合，后来各大框架纷纷想出了一些办法，比如 minix, render props, 高阶组件等实现逻辑上的复用，但是都有一些额外的问题。
  - minix 与组件之间存在隐式依赖，可能产生冲突。
  - 高阶组件 多层包裹嵌套组件，增加了复杂度和理解成本，调试也会相对麻烦。
  - Render Props 不好维护, 同样存在嵌套问题。
* 通过 function 抽离的方式，实现了复杂逻辑的内部封装：
  - 逻辑代码的复用
  - 减小了代码体积
  - 没有 `this` 的问题

## 对比
* Compotision API 受到了 Hooks 的启发，规避了一些 Hooks 的问题。
* Hooks 是纯函数。两者的思想是不同的。
* 使用 React Hooks 就要尽量采用 immutable 变量，降低函数调用过频影响性能（部分 React 调度策略兜底）；使用 Vue 就尽量不要依赖跟踪丢失或者滥用依赖跟踪导致行为不可预测。

## 兼容性
* 可以在 Vue 2.x 中通过 @vue/composition-api 插件尝试新 API
* React 不反对类组件。

## 相同点
* React 的 useRef 和 Vue 的 ref 都允许你引用一个子组件 或 要附加到的 DOM 元素。
* 使用`use`作为hooks的前缀。

## 差别

### React Hooks
* React Hook 底层是基于链表实现，调用的条件是每次组件被 render 的时候都会顺序执行所有的 Hooks。每一个 Hook 的 next 是指向下一个 Hook 的，if 会导致顺序不正确，从而导致报错。
* 由于 React Hooks 会多次运行，所以 render 方法必须遵守某些规则，比如:
  - 不要在循环内部、条件语句中或嵌套函数里调用 Hooks
  - Hooks 只能用在函数组件中
* 每次render的时候，Hooks 都会重新注册，通过`useCallback`和`useMemo`来提升性能。
* 如何追踪依赖：
  - 默认情况下，所有用 useEffect 注册的函数都会在每次渲染之后运行，但可以定义真实依赖的状态和属性。跳过不必要的渲染。
  - useCallback和useMemo 都有依赖项，用来决定是否返回缓存过的回调或值。
* 生命周期不同：
  - `useEffect`相当于`componentDidMount、componentDidUpdate 及 componentWillUnmount 的合集`
  - 从生命周期，转变为对状态的依赖，更符合习惯。
* 上下文：
  - 提供的`useContext`

### Composition API
* Vue Hook 只会被注册调用一次，Vue 能避开这些麻烦的问题，原因在于它对数据的响应是基于 proxy 的，对数据直接代理观察。
* setup() 为 Vue 组件提供了状态、计算值、watcher 和生命周期钩子.
* 只要对data进行了修改，那么相关的函数和模板都会被重新计算。
*  setup() 晚于 beforeCreate 钩子，早于 created 钩子被调用。
* 追踪依赖：
  - 包裹在watch函数中，来相应状态或属性的改变。
* 生命周期
  - 提供了`onMounted、onUpdated 和 onBeforeUnmount`生命周期钩子。
* 提供了：
  - inject/provide
  - 如果想保持响应性，必须明确提供一个 ref/reactive 作为值.





## 参考
* [翻译：Vue Composition API 和 React Hooks 对比](https://juejin.cn/post/6847902223918170126)