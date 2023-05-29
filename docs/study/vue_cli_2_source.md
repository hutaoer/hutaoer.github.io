---
sidebar: auto
category: 学习笔记
tags:
  - Vue
  - Vue CLI
---


# Vue CLI 2.0 源码阅读笔记

## 整体流程
* 执行命令：`vue init webpack my-app`，在当前目录下面创建`my-app`这个项目
* 判断后，决定拉取本地或者远程模板
* 读取配置项
* 选择初始配置，并生成配置信息
* 根据配置信息渲染文件，并在本地创建项目。
* 删除临时目录。
* 结束。

## 具体实现步骤

### 拉取模板代码到本地
* 本地项目路径：`/Users/hutaoer/.vue-templates/webpack`.
* 拉取成功后，执行`generate`方法，创建项目。
* 在创建成功后的回调中，移除拉取的临时模板项目。

### 读取options
* 执行`getOptions`
* 配置项目录：`/Users/hutaoer/.vue-templates/meta.js`
* 读取模板中的`meta.json`或`meta.js`文件，转为对象。如果没有，赋值为空对象。

### metalsmith 流程处理
* 跟`gulp`类似，可以用来串行的执行一些任务。
* 一个极其简单，易于使用的可以插入 static 站点发生器，所有的逻辑都是由插件来处理的。
* `metalsmith.metadata()` 全局插件流的一块元数据。
```js
const data = Object.assign(metalsmith.metadata(), {
    destDirName: name,
    inPlace: dest === process.cwd(),
    noEscape: true
  })
```
* 通过`use`将流水线任务串联起来。不断的把每个选项的结果都存储到`data`对象中。
```js
metalsmith.use(askQuestions(opts.prompts))
    .use(filterFiles(opts.filters))
    .use(renderTemplateFiles(opts.skipInterpolation))

  if (typeof opts.metalsmith === 'function') {
    opts.metalsmith(metalsmith, opts, helpers)
  } else if (opts.metalsmith && typeof opts.metalsmith.after === 'function') {
    opts.metalsmith.after(metalsmith, opts, helpers)
  }

```

#### askQuestions
* `askQuestions(opts.prompts)`，模板选项配置。
* 需要配置的选型有如下一些值：
```js
const prompts = {
    name: {
      when: 'isNotTest',
      type: 'string',
      required: true,
      message: 'Project name',
      default: 'bbb',
      validate: [Function]
    },
    description: {
      when: 'isNotTest',
      type: 'string',
      required: false,
      message: 'Project description',
      default: 'A Vue.js project'
    },
    author: {
      when: 'isNotTest',
      type: 'string',
      message: 'Author',
      default: 'heizi <hutao06051@126.com>'
    },
    build: {
      when: 'isNotTest',
      type: 'list',
      message: 'Vue build',
      choices: [Array]
    },
    router: {
      when: 'isNotTest',
      type: 'confirm',
      message: 'Install vue-router?'
    },
    lint: {
      when: 'isNotTest',
      type: 'confirm',
      message: 'Use ESLint to lint your code?'
    },
    lintConfig: {
      when: 'isNotTest && lint',
      type: 'list',
      message: 'Pick an ESLint preset',
      choices: [Array]
    },
    unit: {
      when: 'isNotTest',
      type: 'confirm',
      message: 'Set up unit tests'
    },
    runner: {
      when: 'isNotTest && unit',
      type: 'list',
      message: 'Pick a test runner',
      choices: [Array]
    },
    e2e: {
      when: 'isNotTest',
      type: 'confirm',
      message: 'Setup e2e tests with Nightwatch?'
    },
    autoInstall: {
      when: 'isNotTest',
      type: 'list',
      message: 'Should we run `npm install` for you after the project has been created? (recommended)',
      choices: [Array]
    }
  },
```
* 通过在命令行中进行选择，并将结果进行缓存。


#### filterFiles
* 再过滤模板中需要的文件，模板中的`filters`列表如下：
```js
const filters = {
    '.eslintrc.js': 'lint',
    '.eslintignore': 'lint',
    'config/test.env.js': 'unit || e2e',
    'build/webpack.test.conf.js': "unit && runner === 'karma'",
    'test/unit/**/*': 'unit',
    'test/unit/index.js': "unit && runner === 'karma'",
    'test/unit/jest.conf.js': "unit && runner === 'jest'",
    'test/unit/karma.conf.js': "unit && runner === 'karma'",
    'test/unit/specs/index.js': "unit && runner === 'karma'",
    'test/unit/setup.js': "unit && runner === 'jest'",
    'test/e2e/**/*': 'e2e',
    'src/router/**/*': 'router',
  },
```
* 通过问答生成的配置数据如下：
```js
{
  destDirName: 'aaa',
  inPlace: false,
  noEscape: true,
  isNotTest: true,
  name: 'aaa',
  description: 'A Vue.js project',
  author: 'heizi <hutao06051@126.com>',
  build: 'standalone',
  router: true,
  lint: true,
  lintConfig: 'airbnb',
  unit: true,
  runner: 'jest',
  e2e: true,
  autoInstall: 'npm'
}
```
* 遍历模板中的所有文件，并按照自定义的配置条件，过滤掉不需要的文件。执行的函数如下：
```js
module.exports = function evalualte (exp, data) {
  var fn = new Function('data', 'with (data) { return ' + exp + '}')
  try {
    return fn(data)
  } catch (e) {
    console.error(chalk.red('Error when evaluating filter condition: ' + exp))
  }
}
```
* 接收一个表达式和一个数据对象，并在`data`的作用域内，执行该表达式，并返回表达式的结果。
* 比如传入`evaluate("lint && isRight", {lint: true, isRight: true})`，那么得到的值就是`true`
* 比如`lint`值为`true`，则会保留`.eslintrc.js`和`.eslintignore`两个文件。
* 比如`router`值为`true`，则保留`src/router/`下面的文件。


### 模板渲染
* 将过滤后的文件，进行模板变量替换。调用`renderTemplateFiles`来渲染模板文件。
* 正则匹配，如过不存在模板语法，则跳过，不处理。
```js
/!{{[^{}+]}}/g.test()
```
* 自定义了两个表达式的处理逻辑：
```js
Handlebars.registerHelper('if_eq', function (a, b, opts) {
  return a === b ? opts.fn(this) : opts.inverse(this);
});

Handlebars.registerHelper('unless_eq', function (a, b, opts) {
  return a === b ? opts.inverse(this) : opts.fn(this);
});
```
* 最后将替换后的内容写入到目标目录下。
* 这样一个项目目录就创建成功了，如果在创建的时候选择了`autoInstall`，那么目录创建完成后，会自动进行依赖的安装。
* 最后还会删除掉模板下载的临时目录。

## 总结
* 比较核心的方法就是对初始化配置项的读取和文件的生成。
* 通过`metalsmith`将几个主要任务串联起来，类似管道符或者`gulp`的思想。
* 拉取模板中的文件，如果需要进行配置的，都是带`handleBar`语法的文件，方便根据用户的选择进行替换渲染。这个处理方式，在日常中还是比较有用的。可以对脚手架工具做一些自定义的配置。这样做会更加的灵活。比如以前我写脚手架的时候，一般会定义几个常用的模板，都是直接硬编码，每次修改的话，就需要手动改模板文件或者对应的仓库。而动态配置的方式，就更加好维护。
* 通过`var fn = new Function('data', 'with (data) { return ' + exp + '}')`方法，来过滤目标文件，设计很巧妙。
* 将一些异步操作进行同步化。
* 通过`minimatch`来匹配文件。


