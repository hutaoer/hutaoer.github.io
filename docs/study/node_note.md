---
sidebar: auto
---

# Node.js 学习笔记

## 处理`ES6模块`
* `require()`是同步加载，后面的代码必须等待这个命令执行完，才会执行。`import`命令则是异步加载，或者更准确地说，ES6 模块有一个独立的静态解析阶段，依赖关系的分析是在那个阶段完成的，最底层的模块第一个执行。
* 只要脚本文件里面使用`import`或者`export`命令，那么就必须采用`.mjs`后缀名。`Node.js`遇到`.mjs`文件，就认为它是 `ES6` 模块，默认启用严格模式。
* 如果不希望将后缀名改成`.mjs`，可以在项目的`package.json`文件中，指定`type`字段为`module`。
* `.mjs`文件总是以 `ES6` 模块加载，`.cjs`文件总是以 `CommonJS `模块加载，`.js`文件的加载取决于`package.json`里面`type`字段的设置。


### 注意
* `Node.js` 版本`13.2.0`正式支持`ES Modules`特性，之前的版本要使用该特性的话，需要增加`--experimental-modules` 作为启动参数。比如`node --experimental-modules es6.mjs`
* `import`的时候，如果是本地的`js`文件，请带上`.js`这个后缀。否则会提示：`Error [ERR_MODULE_NOT_FOUND]: Cannot find module '/Users/localPath/xxx'`
* 在`cjs`中导入`ejs`模块，只能使用异步方式。
```js
(async () => {
  const { add } = await import('./tool.mjs');
  console.log(add);
})();
```
* `require`命令不能加载`.mjs`文件，因此`ES6`模块和`CJS`模块尽量不要混用。



## 路径
* `process.cwd()`, 执行命令的目录。比如：`project/bin/index.js`
  - 在`project`下，执行`node bin/index.js`，`process.cwd()`的值为`project`
  - 在`project/bin`下，执行`node ndex.js`，`process.cwd()`的值为`project/bin`



## 参考
* [Node.js 如何处理 ES6 模块](https://www.ruanyifeng.com/blog/2020/08/how-nodejs-use-es6-module.html)
