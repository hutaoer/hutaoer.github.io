---
sidebar: auto
category: 团队
date: 2023-01-08
tags:
  - CSS编码规范
---

# CSS编码规范

## 约束
样式文件，必须写一个根容器class，页面的样式都放到这个容器下面。<br />禁止使用全局的公共样式。

## 简写
CSS简写要慎用。<br />编写像 background:red; 这样的属性的确很省事，但是你这么写的意思其实是同时声明 background-image:none; background-position:top left; background-repeat: repeat; background-color:red;。虽然大多数时候这样不会出什么问题，但是哪怕只出一次问题就值得考虑要不要放弃简写了。这里应当改为 background-color:red;。<br />类似的，像 margin:0; 这样的声明的确简洁清爽，但是还是应当尽量写清楚。如果你只是想修改底边边距，就要具体一些，写成 margin-bottom:0;

## Debug
如果你要解决 CSS 问题的话，**先把旧代码拿掉再写新的**。如果旧的 CSS 中有问题的话，写新代码是解决不了的。<br />把 CSS 代码和 HTML 部分删掉，直到没有 BUG 为止，然后你就知道问题出在哪里了。<br />有时候写上一个 overflow:hidden 或者其它能把问题藏起来的代码的确效果立竿见影，但是 overflow 方面可能根本就没问题。所以**要治本，而不是单纯治标**。

## 命名
1.类名使用小写字母，以中划线分隔<br />2.id 采用驼峰式命名<br />3.scss 中的变量、函数、混合、placeholder 采用驼峰式命名<br />4.ID 和 class 的名称总是使用可以反应元素目的和用途的名称，或其他通用的名称。不要使用晦涩难懂的名称。
```css
.fw-800 {
  font-weight: 800;
}
.ft-16 {
  font-size: 16px;
}
.red {
  color: red;
}
```
```css
.highlight {
  font-weight: 800;
}
.content {
  font-size: 16px;
}
.warn {
  color: red;
}
```

## 选择器

1. css 选择器中避免使用标签名。从结构、表现、行为分离的原则来看，应该尽量避免 css 中出现 HTML 标签，并且在 css 选择器中出现标签名会存在潜在的问题。
2. 结构复杂的选择器将会影响性能。选择器结构越复杂（如 .sidebar h3 span 为三层，.content ul p a 是四层），浏览器的消耗就越大。尽量使得样式不依赖于其定位，尽量保持选择器简洁清晰。但是 class 名则不应当过于简略，例如 .user-avatar 就远比 .usr-avt 好。
3. 很多前端开发人员写选择器链的时候不使用 **直接子选择器**（注：直接子选择器和后代选择器的区别）。有时，这可能会导致疼痛的设计问题并且有时候可能会很耗性能。然而，在任何情况下，这是一个非常不好的做法。如果你不写很通用的，需要匹配到 DOM 末端的选择器， 你应该总是考虑直接子选择器。
4. **修饰选择器**。应当避免过分修饰选择器，例如如果你能写 .nav{} 就尽量不要写 ul.nav{}。过分修饰选择器将影响性能，影响 class 复用性，增加选择器私有度。这些都是你应当竭力避免的。
```css
.title .description {
  color: grey;
  font-size: 14px;
}
```
```css
.title > .description {
  color: grey;
  font-size: 14px;
}
```

## 属性独占一行
key和value之间的冒号后面，加一个空格。
```css
button {
  width:100px;height:50px;color:#fff;
}
```
```css
button {
  width: 100px;
  height: 50px;
  color: #fff;
}
```

## 建议保留0后面的单位
1.方便在浏览器中通过上下方向键进行调试。<br />2.通过代码就能知道上下文使用的单位，不同的端，可能使用的单位会不一样。比如vw, rem, px等等。
```css
div {
  padding: 0;
  margin: 0;
}
```
```css
div {
  padding: 0rem;
  margin: 0px;
}
```

## 避免过多层级嵌套
对于多次嵌套的样式写法，可以在合适的层级，将该层级提取出来。比如通过在命名的时候，加前缀来限制。
```css
.page .content .article .title {
  color: #333;
  font-size: 20px;
  font-weight: bold;
}
```
```css
.article-title {
  color: #333;
  font-size: 20px;
  font-weight: bold;
}
```

### less
```less
.main {
  .title {
    .name {
      color: #fff;
    }
  }
}
```
```less
.main-title {
   .name {
      color:#fff;
   }
}
```

### sass
```less
.header{
  .site-nav{
    li{
      a{}
    }
  }
}
```
独立的class尽量直接从嵌套层级中提取到外层，减少层级的嵌套。
```less
.header{}
.site-nav{
    li{}
    a{}
}
```