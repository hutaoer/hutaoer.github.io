(window.webpackJsonp=window.webpackJsonp||[]).push([[82],{477:function(s,t,e){"use strict";e.r(t);var a=e(3),o=Object(a.a)({},(function(){var s=this,t=s._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"node-js-学习笔记-并发处理"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#node-js-学习笔记-并发处理"}},[s._v("#")]),s._v(" Node.js 学习笔记 —— 并发处理")]),s._v(" "),t("h2",{attrs:{id:"介绍"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#介绍"}},[s._v("#")]),s._v(" 介绍")]),s._v(" "),t("ul",[t("li",[s._v("众所周知，Node.js 是适合用于处理 I/O 密集操作（读取文件、数据库查询等），不适合CPU密集型操作（压缩、解压、加密、解密等），博客文章都这么说，但对于很多初学者来讲，都是一头雾水，今天我们来一探究竟。")]),s._v(" "),t("li",[s._v("本质来讲，对于 Node.js 而言，只是将这些请求转化为一个个异步的任务，并挂起，交给后台进行处理。当任务处理完后，再通过回调将结果拿到。")]),s._v(" "),t("li",[s._v("当面临高并发请求的时候，虽然 Node.js 能承接住流量，却不一定能高效的处理并这些任务。所谓的高并发，更多的是在承接流量这一环节。单纯使用 Node.js 既要处理请求，又要完成请求背后的计算逻辑，也不一定高效。所以，Node.js 高并发的请求处理能力，更多解决的是请求的问题。")]),s._v(" "),t("li",[s._v("打个比方，一个班级 30个人的作业，每天都需要交给一个老师进行批改。老师相当于接到了一次高并发请求，如果每个同学都只是提交一个选择题，那么老师可能几分钟就处理完了。如果是提交的暑假作业，那估计要批改好几天。那老师不累坏了。所以老师需要提高效率的话，有很多方式，比如将这批暑假作业，分配给好几个老师，一起批改，启用多进程；也可以把这个活外包出去，比如有这么个系统可以自动阅卷批改，那么老师只需要等待机器处理完成即可。")])])])}),[],!1,null,null,null);t.default=o.exports}}]);