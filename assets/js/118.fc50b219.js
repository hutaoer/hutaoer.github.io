(window.webpackJsonp=window.webpackJsonp||[]).push([[118],{554:function(t,a,s){"use strict";s.r(a);var n=s(2),e=Object(n.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"qiankun-学习笔记"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#qiankun-学习笔记"}},[t._v("#")]),t._v(" qiankun 学习笔记")]),t._v(" "),a("h2",{attrs:{id:"介绍"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#介绍"}},[t._v("#")]),t._v(" 介绍")]),t._v(" "),a("ul",[a("li",[a("code",[t._v("qiankun")]),t._v(" 是一个基于 "),a("code",[t._v("single-spa")]),t._v(" 的微前端实现库。")]),t._v(" "),a("li",[t._v("微前端的核心功能：技术栈无关，独立开发、部署、运行。")]),t._v(" "),a("li",[t._v("在我看来，微前端主要解决了以下问题：\n"),a("ul",[a("li",[t._v("方便架构升级")]),t._v(" "),a("li",[t._v("对巨石应用进行拆分")])])])]),t._v(" "),a("h2",{attrs:{id:"基座"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#基座"}},[t._v("#")]),t._v(" 基座")]),t._v(" "),a("ul",[a("li",[a("code",[t._v("qiankun")]),t._v(" 内部通过 "),a("code",[t._v("import-entry-html")]),t._v(" 加载子应用。")]),t._v(" "),a("li",[t._v("每个子应用有三个生命周期的钩子："),a("code",[t._v("boostrap")]),t._v(","),a("code",[t._v("mount")]),t._v(","),a("code",[t._v("unmount")]),t._v("。如果子应用没有导出这三个生命周期函数，子应用会加载失败。")])]),t._v(" "),a("h3",{attrs:{id:"注册子应用"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#注册子应用"}},[t._v("#")]),t._v(" 注册子应用")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("registerMicroApps"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'qiankun'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" apps "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./apps'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("registerMicroApps")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("apps"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("beforeLoad")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("app")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\tconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'before load'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" app"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("name"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" Promise"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("resolve")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("afterMount")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("app")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\tconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'after mount'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" app"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("name"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" Promise"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("resolve")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),a("h2",{attrs:{id:"子应用"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#子应用"}},[t._v("#")]),t._v(" 子应用")]),t._v(" "),a("h2",{attrs:{id:"应用通信"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#应用通信"}},[t._v("#")]),t._v(" 应用通信")]),t._v(" "),a("ul",[a("li",[t._v("我们定义应用，应该都是按照业务进行划分。每个业务的子应用，要最大可能的保持独立，减少与基座和其他子应用的通信。")]),t._v(" "),a("li",[t._v("子应用间频繁的通信会增加应用的复杂度和耦合度。")])]),t._v(" "),a("h2",{attrs:{id:"沙箱机制"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#沙箱机制"}},[t._v("#")]),t._v(" 沙箱机制")]),t._v(" "),a("ul",[a("li",[t._v("Qiankun的沙箱隔离主要实现了三种模式：\n"),a("ul",[a("li",[t._v("LegacySandbox")]),t._v(" "),a("li",[t._v("ProxySandBox")]),t._v(" "),a("li",[t._v("snapshotSanBox")])])]),t._v(" "),a("li",[a("code",[t._v("LegacySanBox")]),t._v("用于singular单例模式，而多实例的场景将切换为"),a("code",[t._v("ProxySanBox")])])]),t._v(" "),a("h3",{attrs:{id:"legacysandbox"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#legacysandbox"}},[t._v("#")]),t._v(" LegacySandbox")]),t._v(" "),a("ul",[a("li",[t._v("使用"),a("code",[t._v("Proxy")]),t._v("对"),a("code",[t._v("window")]),t._v("对象进行劫持。")]),t._v(" "),a("li",[a("code",[t._v("addedPropsMapInSandbox")]),t._v("，用于记录在沙盒运行期间新增的全局变量，用于在卸载自应用时还原全局变量。")]),t._v(" "),a("li",[a("code",[t._v("modifiedPropsOriginalValueMapInSandbox")]),t._v("，记录沙盒运行期间更新的全局变量，用于在卸载自应用时还原全局变量。")]),t._v(" "),a("li",[t._v("当调用set向子应用的proxy/window对象设置属性时，所有的属性设置和更新都会记录在"),a("code",[t._v("addedPropsMapInSandbox")]),t._v("，"),a("code",[t._v("modifiedPropsOriginalValueMapInSandbox")]),t._v("，然后在统一记录到"),a("code",[t._v("currentUpdatedPropsValueMap")]),t._v("中。而调用get从子应用"),a("code",[t._v("proxy/window")]),t._v("中取值时，对于非构造函数的函数取值将会"),a("code",[t._v("this")]),t._v("绑定到"),a("code",[t._v("window")]),t._v("之后在进行返回。")]),t._v(" "),a("li",[t._v("在激活沙箱是会通过"),a("code",[t._v("currentUpdatedPropsValueMap")]),t._v("查询子应用的独立状态池(即沙箱激活状态下更新的全局状态)，还原子应用状态。")])]),t._v(" "),a("h3",{attrs:{id:"snapshotsandbox"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#snapshotsandbox"}},[t._v("#")]),t._v(" SnapshotSandbox")]),t._v(" "),a("ul",[a("li",[t._v("当浏览器不支持"),a("code",[t._v("Proxy")]),t._v("的时候，降级为"),a("code",[t._v("SnapshotSandbox")]),t._v(".")]),t._v(" "),a("li",[t._v("active函数： 在子应用激活时，为window对象打一个快照，记录沙箱激活前的状态，打完快照之后内部通过modifyPropsMap将window还原到上次沙箱运行环境，也就是恢复沙箱运行期间的window状态")]),t._v(" "),a("li",[t._v("inactive函数：沙箱关闭时，通过遍历比较每个属性，将被改变的window对象属性记录在modifyPropsMap中，并通过快照还原被激活前沙箱的状态，相当于时清除沙箱运行期间全局变量的污染。")]),t._v(" "),a("li",[t._v("SnapshotSandbox沙箱实现对window状态的隔离管理，但是在子应用运行期间将会对全局window对象进行污染，所以SnapshotSandbox只可以用于在单实例的情况下，在多实例的场景下将不在支持隔离。")])]),t._v(" "),a("h3",{attrs:{id:"sandbox"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#sandbox"}},[t._v("#")]),t._v(" Sandbox")]),t._v(" "),a("ul",[a("li",[t._v("提供了两个实例方法："),a("code",[t._v("active")]),t._v("和"),a("code",[t._v("inactive")])]),t._v(" "),a("li",[t._v("在"),a("code",[t._v("active")]),t._v("的时候，")]),t._v(" "),a("li",[t._v("在"),a("code",[t._v("inactive")]),t._v("的时候，将更新的全局属性更新到全局，新增的全局属性删除。")])]),t._v(" "),a("h2",{attrs:{id:"css隔离"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#css隔离"}},[t._v("#")]),t._v(" CSS隔离")]),t._v(" "),a("ul",[a("li",[t._v("BEM、CSS Modules、CSS in JS。")]),t._v(" "),a("li",[t._v("BEM: 依赖于内部的约定，容易出错。")]),t._v(" "),a("li",[t._v("CSS Modules: 通过编译生成，依赖预处理器和打包工具。")]),t._v(" "),a("li",[t._v("CSS-in-JS: 有运行时的开销，运行时会重新加载样式，有一定的性能损耗。")])]),t._v(" "),a("h2",{attrs:{id:"参考"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#参考"}},[t._v("#")]),t._v(" 参考")]),t._v(" "),a("ul",[a("li",[t._v("https://segmentfault.com/a/1190000039200142")])]),t._v(" "),a("h2",{attrs:{id:"参考-2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#参考-2"}},[t._v("#")]),t._v(" 参考")]),t._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"https://qiankun.umijs.org/zh/guide",target:"_blank",rel:"noopener noreferrer"}},[t._v("qiankun官网"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://blog.csdn.net/qq_44746132/article/details/117385571",target:"_blank",rel:"noopener noreferrer"}},[t._v("从阿里QianKun看前端沙箱隔离"),a("OutboundLink")],1)])])])}),[],!1,null,null,null);a.default=e.exports}}]);