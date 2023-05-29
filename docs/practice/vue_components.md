---
sidebar: auto
---

# Vue 组件库搭建.md

## 打包考虑的东西
* 提供不同类型的包：`commonjs`,`umd`,`es模块`
* 对组件单独打包，方便按需加载；
* 样式单独打包；
* 提供压缩后的文件`min.js`
* webpack本身打包不支持导出es模块，所以最终的打包构建我们只能借助于`rollup`了。
* 对于组件库总包，使用`rollup`, 可提供`es模块`的打包产物。
* 对于各个组件的单独打包，使用`webpack`
* 对css文件单独打包，无论是rollup还是webpack都不能把打包入口指定为css文件，所以我们只能借助gulp来打包css了。
* 后编译：在发布npm依赖包的时候，不进行编译构建，跟随npm包把源码也一起发出去，之后让用户直接引用未编译的源文件，自行打包编译。
  - 优点：1、共用公共依赖。2、bebal转码只有一次，减少代码量。3、方便换肤功能实现。（直接针对源码sass编译）
  - 缺点：1、用户的打包配置要兼容，甚至需要额外做配置。2、配置很有可能是侵入式的，对于用户的接入成本过大。


## 全量加载
* 总包比较大。
* 组件库仅暴露一个入口的场景：
  - 组件库中无法使用特殊代码。vue-cli会静态编译在 node_module 引用的 .vue 文件，但不会编译 node_module 中的其他文件，一旦组件库代码存在特殊的语法扩展（JSX），或者特殊的语言（TypeScript）。此时项目启动会运行失败。
  - 组件库中的 webpack 配置不会被业务系统去执行，所以组件库中的路径别名等属性无法使用。

## 按需加载
* 简单总结一下，如果你要利用sideEffects和tree-shaking来实现按需加载，需要确保以下几点：
* 1、利用rollup打包，导出es模块；
* 2、配置package.json文件，如果你确保模块没有副作用，可直接把sideEffects设置为false，同时，指定module入口；
* 3、导出时使用export，而非export default；
* 4、用户在实际开发中需要使用webpack4.x 或 rollup进行打包。
* 评定标准为：
  - 较少业务使用
  - 组件体积较大，或者依赖第三方资源较多
  - 未被其他组件内部引用
* 按需加载组件，需要安装 `babel-plugin-import` 插件且配置 `babel.config.js` 来完成导入语句的转换


## 类型定义
* 参照`element-ui`
```js
└── types
    ├── index.d.ts // 类型定义总入口
    ├── oleiwa-ui.d.ts  // 类型定义入口，在这里import其他的组件定义
    ├── component.d.ts  // 定义组件基类
    └── helloworld.d.ts //  helloworld组件的类型定义
```

## 单元测试
* 1、组件渲染，快照对比
* 2、props传递
* 3、回调函数执行
* 4、document.createEvent模拟事件触发，检测核心交互逻辑

## 组件库文档


## 组件通信
* [Vue组件库开发总结：通信方式](https://github.com/xingbofeng/xingbofeng.github.io/issues/32)
* [业务组件库的搭建与发布](https://juejin.cn/post/6847902222328528903)
* [将Vue组件库更换为按需加载](https://juejin.cn/post/6844904147049775118)