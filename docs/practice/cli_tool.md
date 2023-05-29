---
sidebar: auto
---

# 命令行工具开发总结
* `cli`工具，一般用来帮助团队提升开发效率，将一些日常工作中的频繁操作通过命令行工具实现自动化，比如创建项目、组件、打包、发布等等。
* 比如`vue`有 `vue-cli`, `angular`有 `angular-cli`, `react`有 `create-react-app`.
* 对于一个团队来讲，开源工具提供的模板不一定是完全适用的，需要做一些个性化的定制，项目模板和组件模板需要自己定制，打包、发布命令也需要自己定制。
* 可以选择基于开源工具做二次封装，也可以完全重写。

## 常用插件
* 命令行交互使用 npm社区插件 `commander`
* 提供用户选择插件使用 `inquirer`，与用户进行一些简单的交互以确定项目的一些细节配置。
* 从github下载模板使用插件 `download-git-repo`
* 模板文件流处理： `metalsmith`
* 模板引擎处理： `Handlebars`
* 可以执行shell命令的插件：`shelljs`

### `commander`
* 这个包大家都非常熟悉了，有一些坑需要注意。

#### 命令：`command`
* 在执行命令的时候，有两种方式，一种可执行文件的方式，一种是在代码中直接编写。
* 当使用第一种方式的时候，`.command()`带有描述参数时，就意味着使用独立的可执行文件作为子命令。需要两个参数，和提供一个文件，比如你的命令行工具叫做`my-tool`，那么对应的文件名就是`my-tool-init`。当然，也可以通过配置选项`executableFile`可以自定义名字。如果该命令需要支持全局安装，请确保有对应的权限，例如`755`。
* 第二种方式，使用的参数不一样，需要提供一个函数回调，`program.action((source, destination) => {// do something})`

#### 参数
* 在传参的时候，可以使用必选`<params>`或者可选`[params]`
* 在参数后面加上`...`代表可变参数。

#### 其他
* 帮助信息是 `Commander` 基于你的程序自动生成的，默认的帮助选项是`-h,--help`。
* `program.parse`的第一个参数是要解析的字符串数组，也可以省略参数而使用`process.argv`。
* 最新版的`commander`，要求的 `Node` 版本应不低于v12。
* 官方提供一些[不再推荐使用的功能](https://github.com/tj/commander.js/blob/a9c9f17c7eff96b8da8c2b9d01751d41f1eb0ae3/docs/zh-CN/%E4%B8%8D%E5%86%8D%E6%8E%A8%E8%8D%90%E4%BD%BF%E7%94%A8%E7%9A%84%E5%8A%9F%E8%83%BD.md)

### shelljs
* Shelljs本质就是基于node的一层命令封装插件，常用的方法：
* `exec(command [, options] [, callback])`，执行传入的命令，默认是同步执行。
* `rm（[options，] file [，file ...]）`, 删除目录。
* `cp([options,] source_array, dest)`, 复制文件到某个目录。

## 核心功能
* 一个基本的脚手架工具的基础功能包括：创建项目、项目打包、项目发布等等。
* 其他丰富的功能，也是基于上面基础功能进行扩展的。

### 创建项目
* 创建之前可以区分类型，比如组件，还是项目。项目的话，又可以根据不同的配置和业务形态进行拉取不同的模板。
* 拉取模板时会提问拉取模板类型、在当前目录创建的文件类型、项目名称、项目描述等
* 通过`inquirer`插件，来获取用户在终端的选项。
* 伪代码如下
```js
// 预设配置项问题
const questions = [{
	name: 'templateType',
	message: '选择项目模板',
}, {
	name: 'projectName',
	message: '请输入项目名称'
}]

// 收集用户配置项
const options = collectOptions()

// 判断本地有无存在相同的项目名称
if(!fs.existsSync(projectName)) {
	// 根据选项下载模板
	download(templateType, projectName) 

	// 执行install
	try {
        const cmd = `cd ${projectName} && npm install`;
        shelljs.exec(cmd);
    } catch () {
        // 异常处理
    }
} else {
	// 提示已存在同名项目
}

```

### 构建项目
* 在构建项目之前，可以根据不同配置来拼接`build`命令，比如：
  - 应用类型：单页应用、多页应用
  - 使用的打包工具：`webpack, vite, vue-cli`
* 如果嫌每次打包选择比较麻烦，可以将打包配置存储起来，比如放到`package.json`中，或者单独作为一个配置项放到模板文件中，在执行`build`之前直接读取配置即可。
* 以`vue cli3`为例，我们的`build`命令为`npx vue-cli-service build`

## 模板结构

### Vue 2.0 ts 模板
* 待完善

#### 获取多页应用配置
```js
//获取多页应用配置
const getPagesConfig = () => {
    //定义多页路由配置空对象
    let pages = {};
    //定义基础路径
    let baseUrl = "src/pages";
    //pages路径
    let pagesPath = resolve(baseUrl);
    //page下的文件夹列表
    let pagesDirList = fs.readdirSync(pagesPath);
    //迭代page下的文件夹列表[比如 games ...] (文件夹数组)
    pagesDirList.forEach((pagesChildDir) => {
        //pages的子路径
        let pagesChildPath = resolve(`${baseUrl}/${pagesChildDir}`);
        pages[pagesChildDir] = {
            entry: resolve(`${baseUrl}/${pagesChildDir}/main.ts`),
            template: resolve(`${baseUrl}/${pagesChildDir}/index.html`),
            filename: `${htmlBaseUrl}${pagesChildDir}.html`,
            chunks: ["chunk-vendors", "chunk-common", `${pagesChildDir}`]
        }
    });
    return pages;
};
```

### Vue 3.0 模板
* 待完善


## 参考
* [深度定制团队自己的 Vue template](https://zhuanlan.zhihu.com/p/32894283)
