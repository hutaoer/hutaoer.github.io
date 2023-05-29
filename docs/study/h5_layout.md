---
sidebar: auto
---

# H5 布局方案

## flexible
* 原理：使用rem模拟vw的特性从而达到适配目的。
* `rem`是相对于`html`元素的`font-size`来做计算的计算属性值。通过设置`documentElement`的`fontSize`属性值。
* `Flexible`将整个页面的宽度切成了10份，然后将计算出来的页面宽度的`1/10`设置为`htm`l节点的`fontSize`。
* 等比设置`viewport`的`initial-scale、maximum-scale、minimum-scale`的值，从而实现1物理像素=1css像素。
* 一些问题：
  - 一些环境有bug，比如在微信环境，把微信的字体调大，会导致视口的等比缩小。
  - 高倍屏的安卓机没有做处理，因为安卓机的型号太多了，`dpr`的值也存在很多种。

## vw适配
* 使用`CSS3`中的长度单位：`vw`,`vh`,`vmax`和`vmin`
* `vw`是视口宽度的1%，`vh`是视口高度的1% 
* `vmax`是`vw`和`vh`中的较大值
* `vmin`是`vw`和`vh`中的较小值
* 如果视口宽度为`750px`，那么`1vw = 7.5px`
* 使用`postcss-px-to-viewport`将代码中的`px`进行转换。