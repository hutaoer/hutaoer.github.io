(window.webpackJsonp=window.webpackJsonp||[]).push([[42],{406:function(t,e,s){"use strict";s.r(e);var a=s(45),o=Object(a.a)({},(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"node-js-学习笔记"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#node-js-学习笔记"}},[t._v("#")]),t._v(" Node.js 学习笔记")]),t._v(" "),s("h2",{attrs:{id:"处理es6模块"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#处理es6模块"}},[t._v("#")]),t._v(" 处理"),s("code",[t._v("ES6模块")])]),t._v(" "),s("ul",[s("li",[s("code",[t._v("require()")]),t._v("是同步加载，后面的代码必须等待这个命令执行完，才会执行。"),s("code",[t._v("import")]),t._v("命令则是异步加载，或者更准确地说，ES6 模块有一个独立的静态解析阶段，依赖关系的分析是在那个阶段完成的，最底层的模块第一个执行。")]),t._v(" "),s("li",[t._v("只要脚本文件里面使用"),s("code",[t._v("import")]),t._v("或者"),s("code",[t._v("export")]),t._v("命令，那么就必须采用"),s("code",[t._v(".mjs")]),t._v("后缀名。"),s("code",[t._v("Node.js")]),t._v("遇到"),s("code",[t._v(".mjs")]),t._v("文件，就认为它是 "),s("code",[t._v("ES6")]),t._v(" 模块，默认启用严格模式。")]),t._v(" "),s("li",[t._v("如果不希望将后缀名改成"),s("code",[t._v(".mjs")]),t._v("，可以在项目的"),s("code",[t._v("package.json")]),t._v("文件中，指定"),s("code",[t._v("type")]),t._v("字段为"),s("code",[t._v("module")]),t._v("。")]),t._v(" "),s("li",[s("code",[t._v(".mjs")]),t._v("文件总是以 "),s("code",[t._v("ES6")]),t._v(" 模块加载，"),s("code",[t._v(".cjs")]),t._v("文件总是以 "),s("code",[t._v("CommonJS")]),t._v("模块加载，"),s("code",[t._v(".js")]),t._v("文件的加载取决于"),s("code",[t._v("package.json")]),t._v("里面"),s("code",[t._v("type")]),t._v("字段的设置。")])]),t._v(" "),s("h3",{attrs:{id:"注意"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#注意"}},[t._v("#")]),t._v(" 注意")]),t._v(" "),s("ul",[s("li",[s("code",[t._v("Node.js")]),t._v(" 版本"),s("code",[t._v("13.2.0")]),t._v("正式支持"),s("code",[t._v("ES Modules")]),t._v("特性，之前的版本要使用该特性的话，需要增加"),s("code",[t._v("--experimental-modules")]),t._v(" 作为启动参数。比如"),s("code",[t._v("node --experimental-modules es6.mjs")])]),t._v(" "),s("li",[s("code",[t._v("import")]),t._v("的时候，如果是本地的"),s("code",[t._v("js")]),t._v("文件，请带上"),s("code",[t._v(".js")]),t._v("这个后缀。否则会提示："),s("code",[t._v("Error [ERR_MODULE_NOT_FOUND]: Cannot find module '/Users/localPath/xxx'")])]),t._v(" "),s("li",[t._v("在"),s("code",[t._v("cjs")]),t._v("中导入"),s("code",[t._v("ejs")]),t._v("模块，只能使用异步方式。")])]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("async")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" add "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("await")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./tool.mjs'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("add"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("ul",[s("li",[s("code",[t._v("require")]),t._v("命令不能加载"),s("code",[t._v(".mjs")]),t._v("文件，因此"),s("code",[t._v("ES6")]),t._v("模块和"),s("code",[t._v("CJS")]),t._v("模块尽量不要混用。")])]),t._v(" "),s("h2",{attrs:{id:"路径"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#路径"}},[t._v("#")]),t._v(" 路径")]),t._v(" "),s("ul",[s("li",[s("code",[t._v("process.cwd()")]),t._v(", 执行命令的目录。比如："),s("code",[t._v("project/bin/index.js")]),t._v(" "),s("ul",[s("li",[t._v("在"),s("code",[t._v("project")]),t._v("下，执行"),s("code",[t._v("node bin/index.js")]),t._v("，"),s("code",[t._v("process.cwd()")]),t._v("的值为"),s("code",[t._v("project")])]),t._v(" "),s("li",[t._v("在"),s("code",[t._v("project/bin")]),t._v("下，执行"),s("code",[t._v("node ndex.js")]),t._v("，"),s("code",[t._v("process.cwd()")]),t._v("的值为"),s("code",[t._v("project/bin")])])])])]),t._v(" "),s("h2",{attrs:{id:"参考"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#参考"}},[t._v("#")]),t._v(" 参考")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"https://www.ruanyifeng.com/blog/2020/08/how-nodejs-use-es6-module.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("Node.js 如何处理 ES6 模块"),s("OutboundLink")],1)])])])}),[],!1,null,null,null);e.default=o.exports}}]);