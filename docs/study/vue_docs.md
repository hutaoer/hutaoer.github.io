---
sidebar: auto
category: 学习笔记
tags:
  - Vue
  - 文档
---

# Vue 文档学习笔记

## 概述
* Vue 是一套用于构建用户界面的渐进式框架，自底向上逐层应用。一开始不需要你完全掌握它的全部功能特性，可以后续逐步增加功能。
* MVVM响应式编程模型，避免直接操作DOM , 降低DOM操作的复杂性。
  - V: 对应 View，原生的DOM，前端展示页面。
  - M: 对应 Model，原生的JS 对象，即数据对象。
  - VM: ViewModel, 用于双向绑定数据和页面，即 Vue 实例。
* 渐进式框架：用你想用或者能用的功能特性，你不想用的部分功能可以不用。各个功能都是独立的，也能按需进行整合：
  - Declartive Rendering: 声明式渲染，采用简洁的模板语法来声明式地将数据渲染进 DOM，仅作为 View 层的渲染工具。
  - Component System: 代码组件化系统，单文件组件，用来提效、复用、抽象。
  - Client-Side Routing: 客户端路由。
  - Large Scale State Management: 大规模数据管理，构建大型项目。
  - Build System: 构建系统。
  - Server-Side Rendering: 支持服务端渲染。
  - 支持TS

## 计算属性（computed）
* 对于任何包含响应式数据的复杂逻辑，你都应该使用计算属性。
* 比如：`author.books.length > 0 ? 'Yes' : 'No' }}`，如果模板中多次使用，用计算属性可以缓存数据，提升性能。
* 跟方法不一样，**计算属性** 是基于它们的反应依赖关系缓存的。计算属性只在相关响应式依赖发生改变时它们才会重新求值。如果`author.books`没有发生改变，计算属性会立即返回之前的计算结果，不需要再次执行函数。如果是调用方法，则每次都执行函数。
* 下面的计算属性，不会再更新，因为不是响应式依赖。
```js
computed: {
  now() {
    return Date.now()
  }
}
```
* 计算属性默认只有`getter`，可以根据需要提供`setter`


## 侦听器（watch）
* 通过使用 `watch` 选项允许我们执行异步操作 (比如访问一个` API`)，限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态。这些都是计算属性无法做到的。
* 不要滥用`watch`，当需要一些数据随着其依赖的数据变动时，通常更好的做法是使用计算属性。


## Class 与 Style 绑定
* 对象语法：`:class="{ active: isActive, 'text-danger': hasError }"`
* 通过计算属性达到一样的效果
```js
computed: {
  classObject() {
    return {
      active: expression,
      'text-danger': expression
    }
  }
}
```
* 数组语法:`<div :class="[activeClass, errorClass]"></div>`
* 可以使用三元表达式: `<div :class="[isActive ? activeClass : '', errorClass]"></div>`
* 在数组语法中也可以使用对象语法:`<div :class="[{ active: isActive }, errorClass]"></div>`
* 内联样式支持对象语法：`<div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>`
* 内联样式支持数组语法：`<div :style="[baseStyles, overridingStyles]"></div>`

## 条件渲染

### v-show
* `v-show` 只是简单地切换元素的 `CSS property display`。
* `v-show` 不支持 `<template>` 元素，也不支持 `v-else`。

### v-show 对比 v-if
* `v-if`会确保在切换过程中，条件块内的事件监听器和子组件适当地被销毁和重建。
* 一般来说，`v-if` 有更高的切换开销，而 `v-show` 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 `v-show` 较好；如果在运行时条件很少改变，则使用 `v-if` 较好。

### v-if 与 v-for 一起使用
* 当 `v-if` 与 `v-for` 一起使用时，`v-if `具有比 `v-for `更高的优先级。
* `v-if` 将没有权限访问 `v-for` 里的变量。可以通过调整嵌套关系来实现。


## 列表渲染
* `v-for` 指令需要使用 `(item, index )in items `形式的特殊语法，也可以使用`item of items`
* 也可以用 `v-for` 来遍历一个对象的 `property`，第二个的参数为 property 名称 (也就是键名 key)，`(value, name) of myObject`。还支持第三个参数：索引：`(value, name, index) of myObject`。在遍历对象时，会按 `Object.keys()` 的结果遍历，但是不能保证它在不同 JavaScript 引擎下的结果都一致。

### 数组更新检测
* Vue 将被侦听的数组的变更方法进行了包裹，所以它们也将会触发视图更新。这些被包裹过的方法包括：
  - `push()`
  - `pop()`
  - `shift()`
  - `unshift()`
  - `splice()`
  - `sort()`
  - `reverse()`
* 替换数组。`filter()`、`concat()` 和 `slice()`。它们不会变更原始数组，而总是返回一个新数组。当使用非变更方法时，可以用新数组替换旧数组.


## 事件处理
* 监听事件：`v-on:click="methodName"`或使用快捷方式 `@click="methodName"`
* 如果在监听的事件方法的地方，不带参数，那么在方法定义的地方，默认参数就是 `event`对象。
* 如果在监听的事件方法的地方，传了参数，默认不会传 `event`对象，需要显示传入`$event`关键字，例如：`<button @click="say('what', $event)">Say what</button>`
* 绑定多个事件处理器：`<button @click="one($event), two($event)">Submit</button>`


## 组件

### 监听子组件事件
* 父级组件可以像处理原生 DOM 事件一样通过 `v-on` 或 `@ `监听子组件实例的任意事件：
```js
// 方式一 通过表达式处理, $event 获取子组件中的传参
<child @doSomeThing="$event + 1"></child>
// 方式二,调用在父组件中的方法`doItInParent`
<child @doSomeThing="doItInParent"></child>
```
* 子组件中触发自定义事件
```js
// 在组件的 emits 选项中列出已抛出的事件
app.component('child', {
  emits: ['doSomeThing']
})

// 触发事件
<button @click="$emit('doSomeThing', 333)">触发事件</button>

//  在子组件的方法中触发
{
	methods: {
		handleClick() {
			this.$emit('doSomeThing')
		}
	}
}
```

### 组件绑定 v-model
* 将其 `value attribute` 绑定到一个名叫 `modelValue` 的 `prop` 上
* 在其 组件 事件被触发时，将新的值通过自定义的 `update:modelValue` 事件抛出，以`input`组件为例
```js
app.component('custom-input', {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  template: `
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    >
  `
})
```

### 动态子组件
* 通过 `Vue` 的 `<component>` 元素加一个特殊的 `is attribute` 来实现。
* 使用`keep-alive`来缓存组件，该模式下，多了生命周期`activated`
```js
<keep-alive>
  <component :is="currentTabComponent"></component>
</keep-alive>
```

#### keep-alive
* 页面第一次进入，生命周期顺序：`created -> mounted -> activated`
* 退出时，执行`deactivated`，再次进入时，只触发`activated`

### 异步组件

#### Vue 2.0
* 方式一：接收一个`resolve`回调。或者通过 webpack 和 ES6 语法，动态导入
```js
Vue.component('async-example', function (resolve, reject) {
  setTimeout(function () {
    // 向 `resolve` 回调传递组件定义
    resolve({
      template: '<div>I am async!</div>'
    })
  }, 1000)
})

Vue.component('async-webpack-example', function (resolve) {
  // 这个特殊的 `require` 语法将会告诉 webpack
  // 自动将你的构建代码切割成多个包，这些包
  // 会通过 Ajax 请求加载
  require(['./my-async-component'], resolve)
})

new Vue({
  // ...
  components: {
  	// 动态导入，返回一个 Promise 对象
    'my-component': () => import('./my-async-component')
  }
})
```
* 方式二：通过配置，功能会更加强大些。
```js
const AsyncComponent = () => ({
  // 需要加载的组件 (应该是一个 `Promise` 对象)
  component: import('./MyComponent.vue'),
  // 异步组件加载时使用的组件
  loading: LoadingComponent,
  // 加载失败时使用的组件
  error: ErrorComponent,
  // 展示加载时组件的延时时间。默认值是 200 (毫秒)
  delay: 200,
  // 如果提供了超时时间且组件加载也超时了，
  // 则使用加载失败时使用的组件。默认值是：`Infinity`
  timeout: 3000
})
new Vue({
  // ...
  components: {
    'my-component': AsyncComponent
  }
})
```

#### Vue 3.0
* Vue 3.0 中，需要调用`defineAsyncComponent`，它接受一个函数，改函数必须返回一个`Promise`，将组件`resolve`。或者通过`import`方式引入。
```js
const { createApp, defineAsyncComponent } = Vue;
const AsyncComp = defineAsyncComponent(
  () =>
    new Promise((resolve, reject) => {
      resolve({
        template: '<div>I am async!</div>'
      })
    })
)
const AsyncComp = defineAsyncComponent(() =>
  import('./components/AsyncComponent.vue') // 注意这里是直接 return import('component.vue')
)

```
* 同样也可以通过配置方式实现，跟2.0相比，`component` 选项现在被重命名为 `loader`:
```js
const asyncPageWithOptions = defineAsyncComponent({
  loader: () => import('./NextPage.vue'),
  delay: 200,
  timeout: 3000,
  errorComponent: ErrorComponent,
  loadingComponent: LoadingComponent
})
```

### props
* 传入静态数组：`:data="[1,2,3]"`
* 传入静态数字：`:num="333"`
* 传入静态对象：`{name: "hutaoer"}`
* 如果想要将一个对象的所有 `property` 都作为 `prop` 传入，你可以使用不带参数的 `v-bind` (取代 `v-bind:prop-name`)。`v-bind="data"`
* `prop` 会在一个组件实例创建之前进行验证，所以实例的 `property`，在属性校验的方法`validator()`，`default()`中不能使用。
* 类型检查的类型包括：`String`,`Number`,`Boolean`,`Object`,`Symbol`,`Array`,`Date`,`Function`，此外也是可以使用自定义`class`
* 当你使用 DOM 中的模板时，camelCase (驼峰命名法) 的 prop 名需要使用其等价的 kebab-case (短横线分隔命名) 命名.

### 单向数据流
* 每次父级组件发生变更时，子组件中所有的 prop 都将会刷新为最新的值。
* 你不应该在一个子组件内部改变 prop。
* 对象和数组是通过引用传入的，所以对于一个数组或对象类型的 `prop` 来说，在子组件中改变变更这个对象或数组本身将会影响到父组件的状态。

### Attribute 继承
* 当组件返回单个根节点时，非 prop attribute 将自动添加到根节点的 attribute 中。
* 同样的规则也适用于事件监听器。
* 如果不希望组件的根元素继承 attribute，你可以在组件的选项中设置 `inheritAttrs: false`。禁用 attribute 继承的常见情况是需要将 attribute 应用于根节点之外的其他元素。


## 插槽
* `v-slot` 只能添加在 `<template>` 上，有一种情况例外：仅使用默认插槽时候。当被提供的内容只有默认插槽时，组件的标签才可以被当作插槽的模板来使用。这样我们就可以把 `v-slot` 直接用在组件上：
*  作用域插槽：让插槽内容能够访问子组件中才有的数据。
* 默认插槽的缩写语法不能和具名插槽混用，因为它会导致作用域不明确。
* 具名插槽的缩写：例如 `v-slot:header` 可以被重写为 `#header`。该缩写只在其有参数的时候才可用。


## Provide / Inject
* 用来解决嵌套组件直接的数据传递问题。
* 这个特性有两个部分：父组件有一个 `provide` 选项来提供数据，子组件有一个 `inject` 选项来开始使用这些数据。
* 父组件不需要知道哪些子组件使用它 `provide 的 property`
* 子组件不需要知道 `inject` 的 `property` 来自哪里.
* 要访问组件实例 `property`，我们需要将 `provide` 转换为返回对象的 **函数** ，即：`provide() {return {}}`
* 默认情况下，`provide/inject` 绑定并不是响应式的。如果我们想对祖先组件中的更改做出响应，我们需要为 `provide` 的`property`分配一个组合式 `API computed property`：`property:Vue.computed(() => {// return property value})`

## 过渡 & 动画
* 如果要对一个元素进行硬件加速，使用下面任何一个属性均可：
  - `perspective: 1000px;`
  - `backface-visibility: hidden;`
  - `transform: translateZ(0);`


## 组合式API

### setup
* 接收两个参数`(props, context)`
* 因为 `props` 是响应式的，你不能使用 `ES6` 解构，它会消除 `prop` 的响应性。如果需要解构 `prop`，可以在 `setup` 函数中使用 `toRefs` 函数来完成此操作。
* `context` 是一个普通的 JavaScript 对象，它暴露组件的三个 `property：attrs, slots, emit`
* 执行`setup`时候，组件实例还未创建。只能访问：`props, attrs, slots, emit`，不能访问`data, computed, methods`.
* 如果 `setup` 返回一个对象，那么该对象的 `property` 以及传递给 `setup` 的 `props` 参数中的 `property` 就都可以在模板中访问到。`props`不需要再从`setup`中`return`出去。
* 从 `setup` 返回的 `refs` 在`模板`中访问时是被`自动浅解包`的，不需要在模板中使用 `.value`。
* `setup` 还可以返回一个渲染函数，该函数可以直接使用在同一作用域中声明的响应式状态，会覆盖掉`template`中的内容。
* `setup` 中的`this`不是指向当前组件实例，不能同选项式`API`混用。

### 生命周期钩子
* 选项式API: `beforeCreate`,`created`,`beforeMount`,`mounted`,`beforeUpdate`,`updated`,`beforeUnmount`,`unmounted`。
* `onBeforeMount`,`onMounted`,`onBeforeUpdate`,`onUpdated`,`onBeforeUnmount`,`onUnMounted`，`setup`是围绕`beforeCreate`和`created`生命周期钩子运行的，所以不需要显示定义它们。

### provide / inject
* `setup`中使用`provide/inject`都需要显示导入。
* 使用字面量：`provide('key', 'string')`, `inject('key')`
* 使用响应式对象：`provide('key', ref('string'))`，`provide('key', reactive({}))`
* 当使用响应式 `provide / inject` 值时，建议尽可能将对响应式 `property` 的所有修改限制在定义 `provide` 的组件内部。
* 需要在注入数据的组件内部更新 inject 的数据。在这种情况下，我们建议 provide 一个方法来负责改变响应式 property。
* 如果要确保通过 `provide` 传递的数据不会被 `inject` 的组件更改，我们建议对提供者的 `property` 使用 `readonly`，比如：`provide('key', readonly(reactiveData))`

### mixin
* Vue 2 中，mixin是组件逻辑抽象的主要工具。
* 但它存在一些缺点：1. 容易产生冲突；2. 复用性有限，不能向 mixin 传递任何参数来改变它的逻辑。
* Vue 3 中，使用组合式API来代替 mixin

### 注意
* 在 setup 中你应该避免使用 this，因为它不会找到组件实例。setup 的调用发生在 data property、computed property 或 methods 被解析之前，所以它们无法在 setup 中被获取。

## 自定义指令
* 自定义指令总是会被应用在组件的根节点上。

## teleport
* 允许我们控制在 DOM 中哪个父节点下渲染了 HTML，而不必求助于全局状态或将其拆分为两个组件。
* `<teleport to="body"></teleport>`，渲染到`body`标签。
* 如果`teleport`中存在Vue子组件，虽然在DOM节点中，可能不是父子关系，但子组件在 `Vue Devtools` 中的，仍然在父组件之下，而不是放在实际内容移动到的位置。父子组件之间的通信没有变化。
* 如果有多个`teleport`都挂载到同一个DOM节点，那么其顺序将是一个简单的追加——稍后挂载将位于目标元素中较早的挂载之后，跟组件在模板中出现的顺序保持一致。

## 渲染函数
* DOM树：每个元素都是一个节点。每段文字也是一个节点。甚至注释也都是节点。一个节点就是页面的一个部分。
* 虚拟节点，简称为`VNode`, 虚拟DOM是我们对由 Vue 组件树建立起来的整个 `VNode` 树的称呼。

### h函数
* 用于创建`VNode`，接受三个参数：
  - `{String | Object | Function} tag`，一个HTML标签名，一个组件，一个异步组件或一个函数式组件。必须的。
  - `{Object} props`,与 attribute、prop 和事件相对应的对象。可选的。
  - `{String | Array | Object} children`，子 `VNodes`，可选的。
* 如果没有 `prop`，那么通常可以将 `children` 作为第二个参数传入。如果会产生歧义，可以将 `null` 作为第二个参数传入，将 `children` 作为第三个参数传入。
* 要为某个组件创建一个 `VNode`，传递给 `h` 的第一个参数应该是组件本身。
* `<template>`的优先级高于`render`函数。
* 模板使用 `resolveDynamicComponent` 来实现 `is attribute`
* 诸如 `<keep-alive>、<transition>、<transition-group> 和 <teleport> `等内置组件默认并没有被全局注册。这使得打包工具可以 `tree-shake`，因此这些组件只会在被用到的时候被引入构建。
* Vue 的模板实际上被编译成了渲染函数。

## 插件
* 插件是自包含的代码，通常向 Vue 添加全局级功能。它可以是公开 `install()` 方法的对象，也可以是 `function`.

## 响应性

### 响应性原理
* Vue 3 使用`Proxy`来实现，在`get`的时候，添加`track`函数，来追踪依赖；在`set`的是时候，添加了`trigger`，触发依赖。
* `Proxy` 是一个对象，它包装了另一个对象，并允许你拦截对该对象的任何交互。ES6 引入了另一个名为 `Reflect` 的新特性。
* `Proxy` 实现响应性的第一步就是跟踪一个 `property` 何时被读取。我们在一个名为 `track `的处理器函数中执行此操作，该函数可以传入 `target` 和 `property` 两个参数。它将检查当前运行的是哪个副作用，并将其与 target 和 property 记录在一起。这就是 Vue 如何知道这个 `property` 是该副作用的依赖项。
* 需要在 `property` 值更改时重新运行这个副作用。`trigger(target, property)`

### 具体过程
* 当一个值被读取时进行追踪：proxy 的 get 处理函数中 track 函数记录了该 property 和当前副作用。
* 当某个值改变时进行检测：在 proxy 上调用 set 处理函数。
* 重新运行代码来读取原始值：trigger 函数查找哪些副作用依赖于该 property 并执行它们。
* 如果这些 property 中的任何一个随后发生了变化，它将触发副作用再次运行，重新运行 `render` 函数以生成新的 `VNodes`。

### 响应性基础
* 为对象创建响应式状态，可以使用 `reactive` 方法。当从组件中的 `data()` 返回一个对象时，它在内部交由 `reactive()` 使其成为响应式对象。
* 把值类型数据变成响应式，可以使用`ref`。
* `ref`解包：当 `ref` 作为渲染上下文 (从 setup() 中返回的对象) 上的 `property` 返回并可以在模板中被访问时，它将自动浅层次解包内部值。不需要再通过`.value`的方式去访问。只有访问嵌套的`ref`时，需要在模板中使用`.value`访问。`Ref` 解包仅发生在被响应式 `Object` 嵌套的时候。当从` Array `或原生集合类型如 `Map`访问 `ref `时，不会进行解包。
* 当 `ref` 作为响应式对象的 `property `被访问或更改时，为使其行为类似于普通 `property`，它会自动解包内部值。
* 如果将新的 `ref` 赋值给现有 `ref` 的 `property`，将会替换旧的 `ref`.
* 结构一个`reactive`创建的对象：`const info = reactive({name:'hutaoer'})`，会丢失响应性。可以使用`toRefs`转为`ref`，这样就可以保留与源对象的响应式关联:`let {name} = toRefs(info)`,`name.value='yilin'`

### 计算值
* `computed`方法，有两种方式：1. 一个参数的时候，默认为getter函数，并返回一个不可变的响应式`ref`对象；2. 接受一个带有`get`和`set`函数的对象，返回一个可写的`ref`对象。

### 注意
* 被代理对象与原始对象不相等
* 最佳实践是永远不要持有对原始对象的引用，而只使用响应式版本。
* Vue 的 计算属性 (computed) 中应当仅包含用于返回值的计算，不应该包含 DOM操作，修改外部变量，异步操作 等。这些操作应该在 侦听器 (watch) 中实现。否则会提示`Unexpected side effect in “...“ computed property`

## 副作用

### 纯函数
* 纯函数需要满足以下条件：1.它应始终返回相同的值。2.它不应修改程序的状态或引起副作用。
* 纯函数中的副作用（side effect）就是如果有一个函数在输入和输出之外还做了其他的事情，那么这个函数额外做的事情就被称为副作用。

### watchEffect
* `Vue3`中的`watchEffect`函数的`onInvalidate`方法就是用来清除副作用的。清除副作用实际上是Vue3提供给用户的一种取消异步副作用的实现方法。
* `onInvalidate`只作用于异步函数，并且只有在如下两种情况下才会被调用：1. `effect`重新调用时；2.监听器被注销，比如组件被卸载。
* 如果希望副作用函数在组件更新后发生，可以将`flush`设为`post`（默认是`pre`）
* 与`watch`区别：
 -（1）不需要手动传入依赖
 -（2）每次初始化时会执行一次回调函数来自动获取依赖
 -（3）无法获取到原值，只能得到变化后的值
* `onTrack` 和 `onTrigger` 只能在开发模式下工作。

### watch
* `watch` 需要侦听特定的数据源，并在回调函数中执行副作用。
* 默认情况下，它也是惰性的，即只有当被侦听的源发生变化时才执行回调。
* 同`watchEffect`区别：
  - 懒执行副作用；
  - 更具体地说明什么状态应该触发侦听器重新运行；
  - 访问侦听状态变化前后的值。
* 检查深度嵌套对象或数组中的 `property` 变化时，仍然需要 `deep` 选项设置为 `true`。

## Vue 2 中的更改检测

### 对于对象
* Vue 无法检测到 property 的添加或删除。
* Vue 不允许动态添加 **根级别** 的响应式 property。
  - 可以使用 `Vue.set(object, propertyName, value)` 方法向 **嵌套对象** 添加响应式 `property`
  - 也可以使用`vm.$set 实例方法，这也是全局 Vue.set 方法的别名`
* 为已有对象赋值多个新 property，比如使用 `Object.assign()` 或 `_.extend()`。但是，这样添加到对象上的新 `property` 不会触发更新。应该用原对象与要混合进去的对象的 property 一起创建一个新的对象。`this.someObject = Object.assign({}, this.someObject, { a: 1, b: 2 })`

### 对于数组
* Vue 不能检测以下数组的变动：1. 直接通过索引设置元素；2.修改数组长度。
* 解决方法：
  - 全局方法：`Vue.set(vm.items, indexOfItem, newValue)`
  - 实例方法：`vm.$set(vm.items, indexOfItem, newValue)`
  - 通过`splice`，`vm.items.splice(indexOfItem, 1, newValue)`

### 异步更新队列
* 只要侦听到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。如果同一个侦听器被多次触发，它只会被推入到队列中一次。
* 在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作。Vue 在内部对异步队列尝试使用原生的 `Promise.then、MutationObserver 和 setImmediate`，如果执行环境不支持，则会采用 `setTimeout(fn, 0)` 代替。


## TS支持
* 要让 `TypeScript` 正确推断 `Vue` 组件选项中的类型，需要使用 `defineComponent` 全局方法定义组件。
* 推荐配置
```js
// tsconfig.json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    // 这样就可以对 `this` 上的数据属性进行更严格的推断
    "strict": true,
    "jsx": "preserve",
    "moduleResolution": "node"
  }
}
```

### 与组合式 API 一起使用
* 在 `setup()` 函数中，不需要将类型传递给 `props` 参数，因为它将从 `props` 组件选项推断类型。

#### 类型声明 `reactive`
* 三种创建方式
```js
interface Book {
	title: string
	price?: number
}
export default defineComponent({
	setup() {
		const book = reactive<Book>({title: 'Vue'})
		const book:Book = reactive({title: 'Vue'})
		const book = reactive({title: 'Vue'}) as Book
	}
})
```

#### 类型声明 computed
* 计算值将根据返回值自动推断类型

#### 为事件处理器添加类型
* 添加事件类型注解
* 断言 `target`为 html 标签元素。
```js
const handleEvent = (evnt: Event) => {
	console.log(event.target as HTMLInputElement).value)
}
```

## 代码风格
* 组件名为多个单词。
* prop 的定义应该尽量详细，至少指定其类型。
* 单文件组件的文件名应该要么始终是单词大写开头 (PascalCase)，要么始终是横线连接 (kebab-case)。单词大写开头对于代码编辑器的自动补全最为友好，因为这使得我们在 JS(X) 和模板中引用组件的方式尽可能地一致。例如：`components/MyComponent.vue` 或者`components/my-component.vue`
* 

### v-if, v-for
* 在 vue 2.x 中，在一个元素上同时使用 v-if 和 v-for 时，v-for 会优先作用。
* 在 vue 3.x 中，v-if 总是优先于 v-for 生效。


### 组件样式作用域
* 对于单文件组件，推荐`scoped css`，作用域也可以通过 CSS Modules (一个基于 class 的，类似 BEM 的策略) 或者其它的库/约定来实现。
* 对于组件库来说，我们应该更倾向于选用基于 class 的策略，而不是 scoped attribute。
* 覆写内部样式变得更容易。


## 配置选型

### emits
* `emits` 选项中列出的事件不会从组件的根元素继承，也将从 `$attrs property` 中移除。

### DOM
* 如果 Vue 选项中包含渲染函数，模板将被忽略。
* `render` 函数的优先级高于根据 `template` 选项或挂载元素的 `DOM` 内 `HTML` 模板编译的渲染函数。

### 生命周期钩子
* 所有生命周期钩子的 this 上下文将自动绑定至实例中，因此你可以访问 `data、computed 和 methods`。
* 这意味着你不应该使用箭头函数来定义一个生命周期方法。
* `beforeCreate`: 实例初始化之后，进行数据侦听和事件/侦听器的配置之前同步调用。
* `created`: 实例已完成对选项的处理，意味着以下内容已被配置完毕：数据侦听、计算属性、方法、事件/侦听器的回调函数。挂载还未开始，`$el`不可使用。
* `beforeMount`: `render`函数首次被调用，在SSR的时候不能使用。
* `mounted`: 实例挂载完成，但不会保证所有子组件挂载完成。如果你希望等待整个视图都渲染完毕，可以在 `mounted` 内部使用 `vm.$nextTick`。SSR期间不可用。
* `beforeUpdate`: 在数据发生改变后，DOM 被更新之前被调用。该钩子在服务器端渲染期间不被调用，因为只有初次渲染会在服务器端进行。
* `updated`: 在数据更改导致的虚拟 DOM 重新渲染和更新完毕之后被调用。`updated` 不会保证所有的子组件也都被重新渲染完毕。如果你希望等待整个视图都渲染完毕，可以在 `updated` 内部使用 `vm.$nextTick`。该钩子在SSR期间不被调用。
* `activated`: `keep-alive`缓存的组件激活时候调用。SSR不可用。
* `deactivated`: 被 `keep-alive` 缓存的组件失活时调用。SSR不可用。
* `beforeUnmount`: 卸载组件实例前调用。SSR不可用。
* `unmounted`: 卸载组件实例后调用。调用此钩子时，组件实例的所有指令都被解除绑定，所有事件侦听器都被移除，所有子组件实例被卸载。SSR不可用。
* `errorCaptured`: 捕获一个来自后代的错误时被调用。
* `renderTracked`: 跟踪虚拟DOM重新渲染时候调用。
* `renderTriggered`: 虚拟DOM重新渲染被触发时调用。

### mixins
* 可定义多个`mixin`, 钩子按照传入顺序依次调用，并在调用组件自身的钩子之前被调用。
* `const mixin = {created() {}}`
* `{mixins: [mixin]`

### provide / inject
* 跟`React`的`context`类似。

### setup
* 它是组件内部使用组合式 API 的入口点。
* 在创建组件实例时，在初始 `prop` 解析之后立即调用 `setup`。在生命周期方面，它是在 `beforeCreate` 钩子之前调用的。
* 从 `setup` 返回的 `refs` 在模板中访问时会自动解包，因此模板中不需要 `.value`。
* `setup` 还可以返回一个渲染函数.
* `setup` 的第一个参数是 `props`,此 `props` 对象是响应式的。在传入新的 `props` 时会对其进行更新。不要解构 `props` 对象，因为它会失去响应式.

### name
* 设置组件名称，便于调试。

### inheritAttrs
* 默认值为true。默认情况下父作用域的不被认作 props 的 attribute 绑定 (attribute bindings) 将会“回退”且作为普通的 HTML attribute 应用在子组件的根元素上。
* 通过设置 inheritAttrs 到 false，这些默认行为将会被去掉。而通过实例 property $attrs 可以让这些 attribute 生效，且可以通过 v-bind 显性的绑定到非根元素上。


## 实例属性
* `$data`: 组件实例监听的数据对象。
* `$props`: 组件接收的`props`对象。
* `$el`:实例正在使用的根 DOM 元素。

## 实例方法
* `$watch`
  - 当侦听的值是一个对象或者数组时，对其属性或元素的任何更改都不会触发侦听器，因为它们引用相同的对象/数组。
  - `$watch` 返回一个取消侦听函数，用来停止触发回调。
  - 选项：`deep`，为了发现对象内部值的变化。
  - 选项：`immediate`，指定 `immediate: true` 将立即以表达式的当前值触发回调。
  - 选项：`flush`。默认值是 `pre`，指定的回调应该在渲染前被调用。
* $forceUpdate: 迫使组件实例重新渲染。注意它仅仅影响实例本身和插入插槽内容的子组件，而不是所有子组件.
* $nextTick: 它跟全局方法 `nextTick` 一样，不同的是回调中的 `this` 自动绑定到调用它的实例上。

## 指令
* v-memo：通常用于长列表优化。该指令接收一个固定长度的数组作为依赖值进行记忆比对。如果数组中的每个值都和上次渲染的时候相同，则整个该子树的更新会被跳过。在 v-for 中使用 v-memo 时，确保它们被用在了同一个元素上。 v-memo 在 v-for 内部是无效的。

## 特殊属性
* `key`: 有相同父元素的子元素必须有唯一的 `key`。它也可以用于强制替换元素/组件而不是重复使用它。
* `ref`: `ref` 被用来给元素或子组件注册引用信息。引用信息将会被注册在父组件的 `$refs` 对象上。
* `is`: 有的时候你可能需要 Vue 将一个原生元素替换为一个 Vue 组件。这是你可以把 is attribute 的值加上 vue: 前缀，这样 Vue 就会将这些元素换为 Vue 组件进行渲染。

## 内置组件
* 可以直接在模板中使用，不需要注册。
* `<keep-alive>、<transition>、<transition-group> 和 <teleport>` 组件都可以被打包工具 `tree-shake`。

















