---
sidebar: auto
---

# puppeteer 学习笔记

## 介绍
* Puppeteer 是一个 Node 库，它提供了一个高级 API 来通过 DevTools 协议控制 Chromium 或 Chrome。
* 它可以用来生成页面PDF，抓取 SPA（单页应用）并生成预渲染内容，自动提交表单，捕获网站的 timeline trace，用来帮助分析性能问题。

## 安装
* `npm i puppeteer`，它会自动下载最新版本的Chromium。
* 你也可以安装`puppeteer-core`，这个包默认不会下载 Chromium。
* `Puppeteer` 至少需要 `Node v6.4.0`，如果要使用 `async / await`则 `Node v7.6.0` 需要更高版本。


## 浏览器日志
* 在执行 page 实例方法的时候，其`console.log`都是在浏览器中打印出日志，在终端是看不到这些日志的。
* 如果需要查看这些日志，那么需要设置：`devTools: true`，并且关闭无头模式，即设置：`headless: false`

## 启动方式
* 两种启动方式：
  - `puppeteer.launch`, 每次都要重新启动一个 Chrome 进程
  - `puppeteer.connect`, 可以实现对于同一个 Chrome 实例的共用，减少启动关闭浏览器的时间消耗

