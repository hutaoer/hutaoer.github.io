---
sidebar: auto
---

# lighthouse 学习笔记
* lighthouse github 地址：https://github.com/GoogleChrome/lighthouse
* lighthouse 是一款网页性能分析工具，它通过收集分析页面性能相关的各种数据，通过可视化的方式呈现给用户，还能给出优化建议。

## 性能指标
* `First Content Paint(FCP)`：浏览器第一次文本绘制的时间，这个指标对于没有使用ssr技术的web app意义并不大：因为第一绘制发生的时间通常JS还没加载完毕；也可能页面绘制了一个占位的 loading 图片，这通常不是用户所关心的内容。
* `First Meaningful Paint(FMP)`：首次有意义的内容的绘制时间。比如博客的博文主体绘制时间，具体的值为绘制内容单位时间增加最多的时间点。
* `Largest Contentful Paint(LCP)`:即最大内容绘制。它统计的是从页面开始加载到视窗内最大内容绘制的所需时间，这里的内容指文本、图片、视频、非空的 canvas 或者 SVG 等。
* `Speed Index(SI)`: 反映了网页内容填充的速度。
* `First CPU idle(FCI)`：主线程初次空闲时间，意味着此时的用户交互可以被处理，比如react的第一次异步调度就可能出现在这里。
* `Time to Interactive(TTI)`：即页面可交互时间，这个指标并不是指的最早的可交互时间，它需要满足以下条件：
  - 页面开始绘制内容之后
  - 用户的交互能及时响应
  - 页面中大部分可见的元素已经注册了对应的监听事件
  - 在 TTI 之后持续 5 秒的时间内无长任务执行（没有超过 50 ms 的执行任务）
* `Max Potential First Input Delay()`：用户可能体验到的最大无响应时间，具体的值就是最长的task执行时间。

