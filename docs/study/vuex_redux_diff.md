---
sidebar: auto
---

# Vuex 与 Redux 区别

## 相同点
* 全局数据共享
* 流程相同：

## 不同点
* Redux 使用的是不可变数据，而Vuex的数据是可变的。Redux每次都是用新的state替换旧的state，而Vuex是直接修改。
* Redux 在检测数据变化的时候，是通过 diff 的方式比较差异的，而Vuex其实和Vue的原理一样，是通过 getter/setter来比较的。
从表现层来说：
vuex定义了state、getter、mutation、action四个对象；redux定义了state、reducer、action。
vuex中state统一存放，方便理解；reduxstate依赖所有reducer的初始值
vuex有getter,目的是快捷得到state；redux没有这层，react-redux mapStateToProps参数做了这个工作。
vuex中mutation只是单纯赋值(很浅的一层)；redux中reducer只是单纯设置新state(很浅的一层)。他俩作用类似，但书写方式不同
vuex中action有较为复杂的异步ajax请求；redux中action中可简单可复杂,简单就直接发送数据对象（{type:xxx, your-data}）,复杂需要调用异步ajax（依赖redux-thunk插件）。
* vuex触发方式有两种commit同步和dispatch异步；redux同步和异步都使用dispatch

## redux
* 三大原则：单一数据源，State 只读，使用纯函数进行修改。
* 数据流流动很自然，因为任何 dispatch 都会导致广播，需要依据对象引用是否变化来控制更新粒度。
* 如果充分利用时间回溯的特征，可以增强业务的可预测性与错误定位能力。
* 时间回溯代价很高，因为每次都要更新引用，除非增加代码复杂度，或使用 immutable。
* 时间回溯的另一个代价是 action 与 reducer 完全脱节，数据流过程需要自行脑补。原因是可回溯必然不能保证引用关系。
* 引入中间件，其实主要为了解决异步带来的副作用，业务逻辑或多或少参杂着 magic。
* 但是灵活利用中间件，可以通过约定完成许多复杂的工作。
* 对 typescript 支持困难。

## mobx
* 面向对象的方式
* api简洁。
* 数据流流动不自然，只有用到的数据才会引发绑定，局部精确更新，但免去了粒度控制烦恼。
* 没有时间回溯能力，因为数据只有一份引用。
* 自始至终一份引用，不需要 immutable，也没有复制对象的额外开销。
* 没有这样的烦恼，数据流动由函数调用一气呵成，便于调试。
* 业务开发不是脑力活，而是体力活，少一些 magic，多一些效率。
* 由于没有 magic，所以没有中间件机制，没法通过 magic 加快工作效率（这里 magic 是指 action 分发到 reducer 的过程）。
* 完美支持 typescript。 


## 总结
* 一般前端数据流不太复杂的情况，使用 Mobx，因为更加清晰，也便于维护；如果大型项目建议使用redux。