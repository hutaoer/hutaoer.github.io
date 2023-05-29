---
sidebar: auto
---

# 面试常见问题

## 函数式组件
* 没有this
* 没有状态
* 组件需要的一切都通过`context`参数来传递。
* [Vue函数式组件](https://cn.vuejs.org/v2/guide/render-function.html#%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BB%84%E4%BB%B6)

## 产出
* 文档
* 规范
* 落地
* 招聘
* 委员会

## Vue常见面试题。

### v-if、v-for 优先级
* 同级渲染的时候，先遍历。判断在循环内执行。循环不可避免，会影响性能。
* 先判断，再进行遍历。

#### 源码
* `v-if`的判断在`v-for`前面
```js
if (condition) {}
} else if (el.for && !el.forProcessed) {
return genFor(el, state)
} else if (el.if && !el.ifProcessed) {
return genIf(el, state)
}
```

#### 结论
* Vue 3.0 里面 `v-for` 优先级更高

#### 优化策略
* 尽量不要写到一个标签中，否则会每次都先进入循环。
* v-if 放到外层，使用`template`进行包裹。

## js基础
### forEach 如何跳出循环？
- return 结束本次循环
- 跳出整个循环，需要抛出异常
- 跳出嵌套的异常，需要在外层catch，内层不能catch，否则只能结束内层循环。
- 参考：https://segmentfault.com/a/1190000038854657