(window.webpackJsonp=window.webpackJsonp||[]).push([[114],{510:function(t,r,a){"use strict";a.r(r);var e=a(3),s=Object(e.a)({},(function(){var t=this,r=t._self._c;return r("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[r("h1",{attrs:{id:"vue-ssr-学习笔记"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#vue-ssr-学习笔记"}},[t._v("#")]),t._v(" Vue SSR 学习笔记")]),t._v(" "),r("h2",{attrs:{id:"问题"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#问题"}},[t._v("#")]),t._v(" 问题")]),t._v(" "),r("h3",{attrs:{id:"为什么路由需要通过工厂函数创建"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#为什么路由需要通过工厂函数创建"}},[t._v("#")]),t._v(" 为什么路由需要通过工厂函数创建")]),t._v(" "),r("ul",[r("li",[t._v("因为每次用户请求的时候，都需要创建新的实例。跟单页应用是不一样的。")]),t._v(" "),r("li",[t._v("每个用户的访问，应该是独立的实例和路由实例。")])]),t._v(" "),r("h3",{attrs:{id:"由vue接管路由"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#由vue接管路由"}},[t._v("#")]),t._v(" 由Vue接管路由")]),t._v(" "),r("ul",[r("li",[t._v("服务端的入口处，所有的路由透传给 vue的路由，封装为 context 对象传递给 renderer.")]),t._v(" "),r("li",[r("code",[t._v("context = {url: req.url, title: ''}")])]),t._v(" "),r("li",[r("code",[t._v("const html = await renderer.renderToString(context)")])])]),t._v(" "),r("h3",{attrs:{id:"同构代码"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#同构代码"}},[t._v("#")]),t._v(" 同构代码")]),t._v(" "),r("ul",[r("li",[t._v("客户端、服务端是两个不同的Vue 实例，store 不通，通过"),r("code",[t._v("__INITIAL_STATE__")]),t._v("属性来试数据互通。")])]),t._v(" "),r("h2",{attrs:{id:"预渲染"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#预渲染"}},[t._v("#")]),t._v(" 预渲染")]),t._v(" "),r("ul",[r("li",[t._v("prerender-spa-plugin")])]),t._v(" "),r("h2",{attrs:{id:"ipad"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#ipad"}},[t._v("#")]),t._v(" ipad")]),t._v(" "),r("ul",[r("li",[t._v("屏幕尺寸：15.800751670378618 * 22.737667037861915")])])])}),[],!1,null,null,null);r.default=s.exports}}]);