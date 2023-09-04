---
sidebar: auto
---

# React 知识点梳理

## fiber机制
* render 阶段是允许暂停、终止和重启的。 
* render 阶段的生命周期都可能是被重复执行的。

### 废弃的API
* 废弃的API有：`componentWillMount`,`componentWillUpdate`,`componentWillReceiveProps`，都是处于render阶段，可能被重复执行的。
* 这些API使用不推荐的操作：
  - 在`componentWillMount`中，请求数据，应该放到`componentDidMount`中。首屏渲染依然会在数据返回之前执行。 
  - `componentWillUpdate`和`componentWillReceiveProps`中滥用`setState`导致死循环。
* fiber异步渲染机制下，可能导致的bug:
  - 由于render阶段，生命周期可以重复执行，`componentWillMount`被打断、重复多次后，可能会发出多个请求。
* 新的生命周期：`getDerivedStateFromProps`是静态方法，不能访问`this`
* React 16 改造生命周期的动机是为了配合 fiber 架构带来的异步渲染机制。 

## 数据传递
* `UI = render(data)`, 视图会随着数据变化而变化。

### props
* 基于`props`的单向数据流，当前组件的`state`以`props`的形式流动时，只能流向组件树中比自己层级更低的组件。`props`传参适用于
  - 父子间的组件通信
  - 兄弟组件间的数据通信
  - 其他场景，不推荐，不如超过了两层关系传递数据。
* 父组件的更新，都会触发子组件`componentWillReceiveProps`，而不仅仅是传入的`props`发生改变。

### 发布订阅模式
* 常见的有：`socket.io`, `Node.js`中的`EventEmitter`，`Vue.js`中的`EventBus`
* `target.addEventListener(type, listener, useCapture` 创建事件监听器
* 监听位置和触发事件的位置不受限制。事件的监听即订阅，事件的触发即发布。
* 使用发布订阅模式，可以在任意的组件间进行通信。

### Context API
* 16.3 版本后，新的`context API`，即使组件的`shouldComponentUpdate`返回`false`,它依然可以穿透组件，向子组件进行传播。

### Redux
* Redux是js的状态容器。由三部分组成：`store`,`action`,`reducer`,在`redux`工作流程中，数据是严格单向的。
* `store`是单一的数据源，只读。
* `action`是对变化的描述，包含`type`和`payload`
* 使用`dispatch`来派发`action`,`store.dispatch(action)`, `action`会进入到`reducer`触发对应的更新。
* `reducer`纯函数，对变化进行分发和处理，返回新的数据给`store`

## 函数组件与类组件对比
* 类组件需要继承，函数组件不需要
* 类组件可以访问生命周期方法，函数组件不可以
* 类组件中可以获取实例化后的this，然后可以调用各种实例方法，有生命周期钩子。
* 类组件中有state状态，函数组件没有。

### 类组件
* 是基于面向对象的一种封装，提供了各种钩子函数，但对于一些简单的场景，类组件的实现有些复杂。
* 类组件的内部逻辑难以拆分和复用
* 面向对象编程思想。

### 函数组件
* 轻量、灵活。
* 函数组件会捕获`render`内部的状态，这是与类组件最大的不同。
* 函数式编程思想。

## React Hooks
* 16.8 版本开始推广的。 

### 使用原则
* 只在React 函数中使用 Hook
* 不要在循环、条件或嵌套中使用 Hook

### 底层实现
* 依赖于顺序链表，`hooks`的本质是链表。所有的hook是通过单向链表存储的，每个`hook`是一个对象。
* 首次渲染的时候，调用`moutState`构建链表并渲染
* 二次渲染的时候，调用`updateState`一次遍历链表并渲染。
* hooks的渲染是通过`依次遍历`来定位每个hook的内容的。如果前后两次读到的链表在顺序上的位置不一样，那么渲染就会出现问题。

## 虚拟DOM
* 本质上是`js`和`DOM`之间的一个映射缓存，一个能描述`DOM`结构和属性的js对象。
* 简单来讲，虚拟DOM是一个js对象，是对真实DOM的描述。
* 挂载阶段：通过`JSX`，构建出虚拟DOM树，然后通过`ReactDOM.render`实现虚拟DOM到真实DOM的映射。
* 更新阶段：页面的变化，会先作用于虚拟DOM，虚拟DOM借助diff算法，对比出需要改变的DOM，然后将这些改变作用于真实DOM。

### 原始的方案
* 原生对DOM操作，比较繁琐。
* jQuery，解决浏览器兼容性，API更人性化，链式调用。
* 模板引擎，拼接DOM。没有缓存，更新的时候，性能存在瓶颈。
* 使用虚拟DOM，更多的考虑是在于开发体验和研发效率，虚拟DOM不一定回带来更高的渲染效率。
* 模板渲染过程：动态生成HTML字符串 -> 旧的DOM元素整体被替换为新的DOM元素（全量更新）
* 虚拟DOM渲染过程：构建新的虚拟DOM树 -> 通过diff对比出新旧两个树的差异 -> 差量更新DOM 

### 为什么要使用虚拟DOM
* 模板引擎和虚拟DOM存在着递进的关系。
* 解决了研发体验、研发效率、和跨平台的问题。
* 解决跨平台问题：同一套虚拟DOM可以映射为不同平台的渲染元素。


## diff 算法 
* 调和不等同于diff.
* React 15 使用的是 `Stack Reconciler`，同步递归，不可被打断。如果嵌套节点层级很深，递归的过程时间会很长，导致js长时间的占用主线程，从而导致页面的渲染卡顿。
* React 16 使用的是 `Fiber`。从架构来看，是对React核心算法重写；从编码来看，是React内部定义的一种数据结构，是虚拟节点；从工作流来看，Fiber节点保存了组件更新的状态和副作用。

### 设计思想
* 若两个组件属于同一个类型，它们拥有一样的DOM树形结构
* 同一层级的一组子节点，可以通过设置`key`作为唯一标识，来维持各个节点在不同渲染过程中的稳定性。
* diff的关键点：1. 递归的进行分层对比；2. 必须是类型一致的节点；3. key属性设置，利于对节点的复用。

### Reconciler
* `Reconciler`中文意思是”调和器“
* 虚拟DOM保存在内存中，通过`ReactDOM`等类库的作用，使之与真实的DOM同步，这个过程称之为协调（调和）。
* 简单讲：就是将虚拟DOM转变为真实DOM的过程。
* 调和器的工作：组件的挂载、卸载、更新等等。

## setState
* 为了避免频繁的二次渲染，setState 有异步更新、批量更新的机制。每次调用`setState`，将`state`缓存起来，在合适的时机，将`state`做合并，针对最新的`state`做更新渲染。
* `setTimout` 可以帮助`setState` 脱离`React`的管控，从而变成同步的。一般而言，React管控下的`setState`一定是异步的。
* `setState`并不是具备同步渲染的特性，而是在特定的场景下，比如在`setTimout`的回调中的时候，`isBatchingUpdates`的值，就是`false`，所以就变成了同步更新。

### 工作流程
* `setState` -> `enqueueSetState` -> `enqueueUpState` -> `isBatchingUpdates??`
* `isBatchingUpdates`的判断，决定了是立刻渲染，还是等待，是一个全局的锁。默认是`false`，异步批量更新。
* `isBatchingUpdates(true)` -> `dirtyComponents`
* `isBatchingUpdates(false)` -> 循环更新`dirtyComponents`

### transaction（事务）
* 批量更新，就是一次事务的执行。

### 总结
* `setState`的表现，会因为调用场景的不同而不同。
* 在生命周期钩子函数及合成事件中，表现为异步。
* 在`setTimeout`,`setInterval`, 原生DOM事件中，表现为同步。

## Fiber
* 浏览器是多线程的，包括处理DOM和UI的渲染。js是单线程，但是可以操作DOM。
* GUI渲染线程与JS线程是互斥的。渲染线程必须互斥，否则渲染结果难以预料。当一个线程执行的时候，另个一线程必须挂起。
* js中，事件被触发的时候，将由事件线程把它添加到任务队列末尾，等到js的同步代码执行完成后，在空闲时间执行出队。
* 架构核心：可中断、可恢复、优先级。
* React 15流程：Reconciler -> render
* React 16流程：Scheduler -> Reconciler -> render，多了一个更新优先级的调度。
  - Scheduler（调度器）—— 调度任务的优先级，高优任务优先进入Reconciler
  - Reconciler（协调器）—— 负责找出变化的组件
  - Renderer（渲染器）—— 负责将变化的组件渲染到页面上
* 每个更新任务，会被赋予一个优先级。
* Fiber架构是一种同时兼容同步渲染和异步渲染的设计。
* 深度优先遍历。


### 首次渲染
* `ReactDOM.render`触发的首次渲染是同步过程。
* 几种启动方式：
  - `legacy模式`： `ReactDOM.render(<App/>, rootNode)`，当前版本的方式，同步渲染。
  - `blocking模式`： `ReactDOM.createBlockingRoot(rootNode).render(<App/>)`处于实验中，作为迁移到`concurrent模式`的一个步骤。
  - `concurrent模式`： `ReactDOM.createRoot(rootNode).render(<App/>)`, 开启异步渲染，目前也是在实验中，React的终极目标。
* `React 17`中可以开启`concurrent`异步渲染，但是是不稳定的，调用方式如下：`ReactDOM.unstable_createNode(rootNode)`
* 不同渲染模式在挂载阶段的差异，是由`mode`属性决定的。

## 事件系统 
* 一个事件的传播要经过一下3个阶段：
  - 事件捕获：事件从最外层向最内层传递，知道抵达目标元素。
  - 目标阶段：到达目标元素
  - 事件冒泡：从目标元素向外层传递。
* 在`React`里面，事件在具体的DOM节点上被触发后，都会冒泡到`document`上。`document`上所绑定的统一事件处理程序会将事件分发到具体组件实例。

### 合成事件
* 符合W3C规范，抹平了不同浏览器的差异。
* 暴露统一、稳定的，与原生DOM事件相同的事件接口。
* 可以通过`e.nativeEvent`访问到原生事件对象

### 事件工作流
* 事件绑定是在组件挂载时候完成。
* 最后绑定到`document`上，统一的事件分发函数，`dispatchEvent`。事件触发本质，是对`dispatchEvent`的调用。
* 整体流程：
  - 事件触发、冒泡到`docuemnt`
  - 执行`dispatchEvent`
  - 创建事件对应的合成事件对象`SyntheticEvent`
  - 收集事件在 **捕获阶段** 所涉及的回调函数和对应的节点实例。
  - 收集事件在 **冒泡阶段** 所涉及的回调函数和对应的节点实例。
  - 将前两步收集的回调按顺序执行，执行时`SyntheticEvent`作为入参传入每个回调中。
* 收集过程中，仅收集DOM元素对应的Fiber节点。
* 对于 React 来讲，事件委托帮助其实现了对所有事件的中心化管控。

## Redux
* 是对 `Flux` 架构的一种实现，是单向数据流，一共包含四个方面：
  - `View: 视图`
  - `Action: 动作`，通过视图来触发
  - `Dispatcher: 派发器`，对`Action`进行分发；
  - `Store：数据层`, 存储应用状态，定义修改状态的逻辑。
* 简单描述其过程：用户与`View`产生交互，发起一个`action`, `dispatcher` 将`action` 派发给 `store`，通知 `store` 进行相应的状态更新，状态更新完成后通知 `view` 更新界面。
* Flux 允许多个 store，Redux 只允许一个。

### 双向数据流的问题
* View 和 Model 可以直接通信。
* 可能会比较混乱，因为 View 的更新可能来自 Model
* 单向数据流的优点是：数据可预测。

### 设计思想
* `Store`: 一个单一的只读的数据源
* `Action`: 对变化的描述
* `Reducer`: 一个函数，对变化分发和处理，将新的数据返回给`Store`。`reducer` 是一个纯函数，接收旧的 `state` 和 `action`，返回新的 `state`。
* 任何组件都可以从`Store`读取全局的状态，并派发`Action`来修改全局状态。

### 工作原理

#### createStore
* `getState`：获取当前的状态 
* `subscribe`: 订阅监听函数
* `dispatch`: 派发action, 调用reducer触发订阅。

#### dispatch
* 先将`isDispatching`变量设置为`true`，
* 执行`reducer(state, action)`
* 执行完后，`isDispatching`设置为`false`
* 上锁的目的，是为了在执行`reducer`的时候，防止手动执行`dispatch`，`reducer`就不再是纯函数了，可能陷入死循环。

#### 触发订阅
* Redux 中，默认的订阅对象就是状态的变化。
* store对象创建后，通过调用`store.subscribe` 来注册监听函数，`dispatch` 发生时，在 `reducer` 执行完成后，将 listeners 数组中的监听函数逐个执行。
```js
const listeners = (currentLisnteners = nextListeners);
for(let i = 0; i < listeners.length; i++) {
	const listener = listeners[i];
	listener();
}

// 确保是两个数组
function ensureCanMutateNextListeners() {
	if(nextListeners === currentLisnteners) {
		nextListeners = currentLisnteners.slice()
	}
}
```
* 为什么有`currentLisnteners`和`nextListeners`两个数组？
  - `currentLisnteners`用于确保监听函数执行过程的稳定性，而对注册事件监听的取消都是发生在`nextListeners`上，因此需要一个稳定的数组。
  - 事件监听注册后，会返回一个取消注册的函数。dispatch 的时候，可能会取消注册，可能会影响执行过程中的 listenrs 数组。因此不能使用同一份数组。

### 注意事项
* 在`reducer`中，不能修改`state`，类似`Object.assign(state, {data: {}})`，这样会修改`state`。应该这样使用：`Object.assign({}, state, otherData)`
* 当管理的数据较多的时候，需要对`reducer`做拆分。每个 `reducer` 只负责管理全局 `state` 中它负责的一部分。每个 `reducer` 的 `state` 参数都不同，分别对应它管理的那部分 `state` 数据。
* `reducer` 是纯函数。它仅用于计算下一个 `state`。它应该是完全可预测的：多次传入相同的输入必须产生相同的输出。它不应做有副作用的操作，如 `API` 调用或路由跳转。这些应该在 `dispatch action` 前发生。

### react-redux
* 容器组件就是使用 `store.subscribe()` 从 `Redux state` 树中读取部分数据，并通过 `props` 来把这些数据提供给要渲染的组件。直接使用`connect()`方法来生成容器。
* 定义 `mapStateToProps` 函数来指定如何把当前 `state` 映射到组件的 `props` 中。
* 定义 `mapDispatchToProps` 方法接收 `dispatch()` 方法并返回期望注入到展示组件的 `props` 中的回调方法。
* 最后，调用`connect()`，与组件进行绑定。
* 在最外层根组件中，使用`Provider`将根组件包裹。
```js
import { connect } from 'react-redux'

class DemoComponent extends React.Component{}

const Demo = connect(
  mapStateToProps,
  mapDispatchToProps
)(DemoComponent)

export default Demo
```

#### 异步action
* 引入`redux-thunk`，`action`函数除了返回action对象外，还可以返回函数。
* 当 `action` 创建函数返回函数时，这个函数会被 `Redux Thunk` 执行。这个函数不需要保持纯净；它还可以带有副作用，包括执行异步 API 请求，还可以 `dispatch action`
* 通过`applyMiddleware()`来使用`redux-chunk`中间件。
```js
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'

const store = createStore(
  ...,
  applyMiddleware(
    thunkMiddleware, // 允许我们 dispatch() 函数
    loggerMiddleware // 用来打印 action 日志
  )
)
```

#### 其他方式
* 使用 redux-promise 或者 redux-promise-middleware 来 dispatch Promise 来替代函数。
* 使用 redux-observable 来 dispatch Observable。
* 使用 redux-saga 中间件来创建更加复杂的异步 action。
* 使用 redux-pack 中间件 dispatch 基于 Promise 的异步 Action。

## 优化技巧

### PureComponent、React.memo
* 如果父组件发生状态更新，及时父组件传给子组件的`props`没有修改，也会引起子组件的渲染。
* `PureComponent`是对类组件的 `Props` 和 `State` 进行浅比较，如果没有变化，则不会渲染组件。
* `React.memo` 是对函数组件的 Props 进行浅比较。

### shouldComponentUpdate
* 使用`shouldComponentUpdate`会存在一些隐患。如果存在很多子孙组件，「找出所有子孙组件使用的属性」就会有很多工作量，也容易因为遗漏导致 bug，且会带来一定的维护成本。

### useMemo、useCallback
* 子组件接收的函数或`props`，每次都是新的引用，那么`PureComponent` 和 `React.memo` 优化就会失效。需要使用 `useMemo` 和 `useCallback` 来生成稳定值，并结合 `PureComponent` 或 `React.memo` 避免子组件重新 Render。
* `useCallback` 是基于 `useMemo` 实现的，只是针对缓存函数。
* `useMemo` 用于非常耗时的计算场景。

### 节流、防抖
* 节流，可以想象为水龙头放水，不能一直放任其流水，为了节约用水，改成每隔固定的间隔滴水。无论规定时间内，事件有无触发，都会按照固定频率触发。比如滚动时候，请求数据。窗口拖动时候，resize 事件。
* 防抖，频繁触发的动作，在 n 秒内只执行一次。输入框不断的输入值，使用防抖节约请求。频繁点赞和取消，仅需获取最后一次的操作结果传递给服务端。




























