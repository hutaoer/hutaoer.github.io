(window.webpackJsonp=window.webpackJsonp||[]).push([[81],{474:function(v,_,e){"use strict";e.r(_);var o=e(3),t=Object(o.a)({},(function(){var v=this,_=v._self._c;return _("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[_("h1",{attrs:{id:"h5-布局方案"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#h5-布局方案"}},[v._v("#")]),v._v(" H5 布局方案")]),v._v(" "),_("h2",{attrs:{id:"flexible"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#flexible"}},[v._v("#")]),v._v(" flexible")]),v._v(" "),_("ul",[_("li",[v._v("原理：使用rem模拟vw的特性从而达到适配目的。")]),v._v(" "),_("li",[_("code",[v._v("rem")]),v._v("是相对于"),_("code",[v._v("html")]),v._v("元素的"),_("code",[v._v("font-size")]),v._v("来做计算的计算属性值。通过设置"),_("code",[v._v("documentElement")]),v._v("的"),_("code",[v._v("fontSize")]),v._v("属性值。")]),v._v(" "),_("li",[_("code",[v._v("Flexible")]),v._v("将整个页面的宽度切成了10份，然后将计算出来的页面宽度的"),_("code",[v._v("1/10")]),v._v("设置为"),_("code",[v._v("htm")]),v._v("l节点的"),_("code",[v._v("fontSize")]),v._v("。")]),v._v(" "),_("li",[v._v("等比设置"),_("code",[v._v("viewport")]),v._v("的"),_("code",[v._v("initial-scale、maximum-scale、minimum-scale")]),v._v("的值，从而实现1物理像素=1css像素。")]),v._v(" "),_("li",[v._v("一些问题：\n"),_("ul",[_("li",[v._v("一些环境有bug，比如在微信环境，把微信的字体调大，会导致视口的等比缩小。")]),v._v(" "),_("li",[v._v("高倍屏的安卓机没有做处理，因为安卓机的型号太多了，"),_("code",[v._v("dpr")]),v._v("的值也存在很多种。")])])])]),v._v(" "),_("h2",{attrs:{id:"vw适配"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#vw适配"}},[v._v("#")]),v._v(" vw适配")]),v._v(" "),_("ul",[_("li",[v._v("使用"),_("code",[v._v("CSS3")]),v._v("中的长度单位："),_("code",[v._v("vw")]),v._v(","),_("code",[v._v("vh")]),v._v(","),_("code",[v._v("vmax")]),v._v("和"),_("code",[v._v("vmin")])]),v._v(" "),_("li",[_("code",[v._v("vw")]),v._v("是视口宽度的1%，"),_("code",[v._v("vh")]),v._v("是视口高度的1%")]),v._v(" "),_("li",[_("code",[v._v("vmax")]),v._v("是"),_("code",[v._v("vw")]),v._v("和"),_("code",[v._v("vh")]),v._v("中的较大值")]),v._v(" "),_("li",[_("code",[v._v("vmin")]),v._v("是"),_("code",[v._v("vw")]),v._v("和"),_("code",[v._v("vh")]),v._v("中的较小值")]),v._v(" "),_("li",[v._v("如果视口宽度为"),_("code",[v._v("750px")]),v._v("，那么"),_("code",[v._v("1vw = 7.5px")])]),v._v(" "),_("li",[v._v("使用"),_("code",[v._v("postcss-px-to-viewport")]),v._v("将代码中的"),_("code",[v._v("px")]),v._v("进行转换。")])])])}),[],!1,null,null,null);_.default=t.exports}}]);