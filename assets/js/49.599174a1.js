(window.webpackJsonp=window.webpackJsonp||[]).push([[49],{444:function(t,e,s){"use strict";s.r(e);var a=s(3),v=Object(a.a)({},(function(){var t=this,e=t._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"vue-组件库搭建-md"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#vue-组件库搭建-md"}},[t._v("#")]),t._v(" Vue 组件库搭建.md")]),t._v(" "),e("h2",{attrs:{id:"打包考虑的东西"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#打包考虑的东西"}},[t._v("#")]),t._v(" 打包考虑的东西")]),t._v(" "),e("ul",[e("li",[t._v("提供不同类型的包："),e("code",[t._v("commonjs")]),t._v(","),e("code",[t._v("umd")]),t._v(","),e("code",[t._v("es模块")])]),t._v(" "),e("li",[t._v("对组件单独打包，方便按需加载；")]),t._v(" "),e("li",[t._v("样式单独打包；")]),t._v(" "),e("li",[t._v("提供压缩后的文件"),e("code",[t._v("min.js")])]),t._v(" "),e("li",[t._v("webpack本身打包不支持导出es模块，所以最终的打包构建我们只能借助于"),e("code",[t._v("rollup")]),t._v("了。")]),t._v(" "),e("li",[t._v("对于组件库总包，使用"),e("code",[t._v("rollup")]),t._v(", 可提供"),e("code",[t._v("es模块")]),t._v("的打包产物。")]),t._v(" "),e("li",[t._v("对于各个组件的单独打包，使用"),e("code",[t._v("webpack")])]),t._v(" "),e("li",[t._v("对css文件单独打包，无论是rollup还是webpack都不能把打包入口指定为css文件，所以我们只能借助gulp来打包css了。")]),t._v(" "),e("li",[t._v("后编译：在发布npm依赖包的时候，不进行编译构建，跟随npm包把源码也一起发出去，之后让用户直接引用未编译的源文件，自行打包编译。\n"),e("ul",[e("li",[t._v("优点：1、共用公共依赖。2、bebal转码只有一次，减少代码量。3、方便换肤功能实现。（直接针对源码sass编译）")]),t._v(" "),e("li",[t._v("缺点：1、用户的打包配置要兼容，甚至需要额外做配置。2、配置很有可能是侵入式的，对于用户的接入成本过大。")])])])]),t._v(" "),e("h2",{attrs:{id:"全量加载"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#全量加载"}},[t._v("#")]),t._v(" 全量加载")]),t._v(" "),e("ul",[e("li",[t._v("总包比较大。")]),t._v(" "),e("li",[t._v("组件库仅暴露一个入口的场景：\n"),e("ul",[e("li",[t._v("组件库中无法使用特殊代码。vue-cli会静态编译在 node_module 引用的 .vue 文件，但不会编译 node_module 中的其他文件，一旦组件库代码存在特殊的语法扩展（JSX），或者特殊的语言（TypeScript）。此时项目启动会运行失败。")]),t._v(" "),e("li",[t._v("组件库中的 webpack 配置不会被业务系统去执行，所以组件库中的路径别名等属性无法使用。")])])])]),t._v(" "),e("h2",{attrs:{id:"按需加载"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#按需加载"}},[t._v("#")]),t._v(" 按需加载")]),t._v(" "),e("ul",[e("li",[t._v("简单总结一下，如果你要利用sideEffects和tree-shaking来实现按需加载，需要确保以下几点：")]),t._v(" "),e("li",[t._v("1、利用rollup打包，导出es模块；")]),t._v(" "),e("li",[t._v("2、配置package.json文件，如果你确保模块没有副作用，可直接把sideEffects设置为false，同时，指定module入口；")]),t._v(" "),e("li",[t._v("3、导出时使用export，而非export default；")]),t._v(" "),e("li",[t._v("4、用户在实际开发中需要使用webpack4.x 或 rollup进行打包。")]),t._v(" "),e("li",[t._v("评定标准为：\n"),e("ul",[e("li",[t._v("较少业务使用")]),t._v(" "),e("li",[t._v("组件体积较大，或者依赖第三方资源较多")]),t._v(" "),e("li",[t._v("未被其他组件内部引用")])])]),t._v(" "),e("li",[t._v("按需加载组件，需要安装 "),e("code",[t._v("babel-plugin-import")]),t._v(" 插件且配置 "),e("code",[t._v("babel.config.js")]),t._v(" 来完成导入语句的转换")])]),t._v(" "),e("h2",{attrs:{id:"类型定义"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#类型定义"}},[t._v("#")]),t._v(" 类型定义")]),t._v(" "),e("ul",[e("li",[t._v("参照"),e("code",[t._v("element-ui")])])]),t._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[t._v("└── types\n    ├── index"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("d"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("ts "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 类型定义总入口")]),t._v("\n    ├── oleiwa"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("ui"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("d"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("ts  "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 类型定义入口，在这里import其他的组件定义")]),t._v("\n    ├── component"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("d"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("ts  "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 定义组件基类")]),t._v("\n    └── helloworld"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("d"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("ts "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//  helloworld组件的类型定义")]),t._v("\n")])])]),e("h2",{attrs:{id:"单元测试"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#单元测试"}},[t._v("#")]),t._v(" 单元测试")]),t._v(" "),e("ul",[e("li",[t._v("1、组件渲染，快照对比")]),t._v(" "),e("li",[t._v("2、props传递")]),t._v(" "),e("li",[t._v("3、回调函数执行")]),t._v(" "),e("li",[t._v("4、document.createEvent模拟事件触发，检测核心交互逻辑")])]),t._v(" "),e("h2",{attrs:{id:"组件库文档"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#组件库文档"}},[t._v("#")]),t._v(" 组件库文档")]),t._v(" "),e("h2",{attrs:{id:"组件通信"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#组件通信"}},[t._v("#")]),t._v(" 组件通信")]),t._v(" "),e("ul",[e("li",[e("a",{attrs:{href:"https://github.com/xingbofeng/xingbofeng.github.io/issues/32",target:"_blank",rel:"noopener noreferrer"}},[t._v("Vue组件库开发总结：通信方式"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://juejin.cn/post/6847902222328528903",target:"_blank",rel:"noopener noreferrer"}},[t._v("业务组件库的搭建与发布"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://juejin.cn/post/6844904147049775118",target:"_blank",rel:"noopener noreferrer"}},[t._v("将Vue组件库更换为按需加载"),e("OutboundLink")],1)])])])}),[],!1,null,null,null);e.default=v.exports}}]);