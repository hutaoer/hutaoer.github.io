(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{381:function(t,a,s){"use strict";s.r(a);var n=s(45),e=Object(n.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"命令行工具开发总结"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#命令行工具开发总结"}},[t._v("#")]),t._v(" 命令行工具开发总结")]),t._v(" "),s("ul",[s("li",[s("code",[t._v("cli")]),t._v("工具，一般用来帮助团队提升开发效率，将一些日常工作中的频繁操作通过命令行工具实现自动化，比如创建项目、组件、打包、发布等等。")]),t._v(" "),s("li",[t._v("比如"),s("code",[t._v("vue")]),t._v("有 "),s("code",[t._v("vue-cli")]),t._v(", "),s("code",[t._v("angular")]),t._v("有 "),s("code",[t._v("angular-cli")]),t._v(", "),s("code",[t._v("react")]),t._v("有 "),s("code",[t._v("create-react-app")]),t._v(".")]),t._v(" "),s("li",[t._v("对于一个团队来讲，开源工具提供的模板不一定是完全适用的，需要做一些个性化的定制，项目模板和组件模板需要自己定制，打包、发布命令也需要自己定制。")]),t._v(" "),s("li",[t._v("可以选择基于开源工具做二次封装，也可以完全重写。")])]),t._v(" "),s("h2",{attrs:{id:"常用插件"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#常用插件"}},[t._v("#")]),t._v(" 常用插件")]),t._v(" "),s("ul",[s("li",[t._v("命令行交互使用 npm社区插件 "),s("code",[t._v("commander")])]),t._v(" "),s("li",[t._v("提供用户选择插件使用 "),s("code",[t._v("inquirer")]),t._v("，与用户进行一些简单的交互以确定项目的一些细节配置。")]),t._v(" "),s("li",[t._v("从github下载模板使用插件 "),s("code",[t._v("download-git-repo")])]),t._v(" "),s("li",[t._v("模板文件流处理： "),s("code",[t._v("metalsmith")])]),t._v(" "),s("li",[t._v("模板引擎处理： "),s("code",[t._v("Handlebars")])]),t._v(" "),s("li",[t._v("可以执行shell命令的插件："),s("code",[t._v("shelljs")])])]),t._v(" "),s("h3",{attrs:{id:"commander"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#commander"}},[t._v("#")]),t._v(" "),s("code",[t._v("commander")])]),t._v(" "),s("ul",[s("li",[t._v("这个包大家都非常熟悉了，有一些坑需要注意。")])]),t._v(" "),s("h4",{attrs:{id:"命令-command"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#命令-command"}},[t._v("#")]),t._v(" 命令："),s("code",[t._v("command")])]),t._v(" "),s("ul",[s("li",[t._v("在执行命令的时候，有两种方式，一种可执行文件的方式，一种是在代码中直接编写。")]),t._v(" "),s("li",[t._v("当使用第一种方式的时候，"),s("code",[t._v(".command()")]),t._v("带有描述参数时，就意味着使用独立的可执行文件作为子命令。需要两个参数，和提供一个文件，比如你的命令行工具叫做"),s("code",[t._v("my-tool")]),t._v("，那么对应的文件名就是"),s("code",[t._v("my-tool-init")]),t._v("。当然，也可以通过配置选项"),s("code",[t._v("executableFile")]),t._v("可以自定义名字。如果该命令需要支持全局安装，请确保有对应的权限，例如"),s("code",[t._v("755")]),t._v("。")]),t._v(" "),s("li",[t._v("第二种方式，使用的参数不一样，需要提供一个函数回调，"),s("code",[t._v("program.action((source, destination) => {// do something})")])])]),t._v(" "),s("h4",{attrs:{id:"参数"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#参数"}},[t._v("#")]),t._v(" 参数")]),t._v(" "),s("ul",[s("li",[t._v("在传参的时候，可以使用必选"),s("code",[t._v("<params>")]),t._v("或者可选"),s("code",[t._v("[params]")])]),t._v(" "),s("li",[t._v("在参数后面加上"),s("code",[t._v("...")]),t._v("代表可变参数。")])]),t._v(" "),s("h4",{attrs:{id:"其他"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#其他"}},[t._v("#")]),t._v(" 其他")]),t._v(" "),s("ul",[s("li",[t._v("帮助信息是 "),s("code",[t._v("Commander")]),t._v(" 基于你的程序自动生成的，默认的帮助选项是"),s("code",[t._v("-h,--help")]),t._v("。")]),t._v(" "),s("li",[s("code",[t._v("program.parse")]),t._v("的第一个参数是要解析的字符串数组，也可以省略参数而使用"),s("code",[t._v("process.argv")]),t._v("。")]),t._v(" "),s("li",[t._v("最新版的"),s("code",[t._v("commander")]),t._v("，要求的 "),s("code",[t._v("Node")]),t._v(" 版本应不低于v12。")]),t._v(" "),s("li",[t._v("官方提供一些"),s("a",{attrs:{href:"https://github.com/tj/commander.js/blob/a9c9f17c7eff96b8da8c2b9d01751d41f1eb0ae3/docs/zh-CN/%E4%B8%8D%E5%86%8D%E6%8E%A8%E8%8D%90%E4%BD%BF%E7%94%A8%E7%9A%84%E5%8A%9F%E8%83%BD.md",target:"_blank",rel:"noopener noreferrer"}},[t._v("不再推荐使用的功能"),s("OutboundLink")],1)])]),t._v(" "),s("h3",{attrs:{id:"shelljs"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#shelljs"}},[t._v("#")]),t._v(" shelljs")]),t._v(" "),s("ul",[s("li",[t._v("Shelljs本质就是基于node的一层命令封装插件，常用的方法：")]),t._v(" "),s("li",[s("code",[t._v("exec(command [, options] [, callback])")]),t._v("，执行传入的命令，默认是同步执行。")]),t._v(" "),s("li",[s("code",[t._v("rm（[options，] file [，file ...]）")]),t._v(", 删除目录。")]),t._v(" "),s("li",[s("code",[t._v("cp([options,] source_array, dest)")]),t._v(", 复制文件到某个目录。")])]),t._v(" "),s("h2",{attrs:{id:"核心功能"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#核心功能"}},[t._v("#")]),t._v(" 核心功能")]),t._v(" "),s("ul",[s("li",[t._v("一个基本的脚手架工具的基础功能包括：创建项目、项目打包、项目发布等等。")]),t._v(" "),s("li",[t._v("其他丰富的功能，也是基于上面基础功能进行扩展的。")])]),t._v(" "),s("h3",{attrs:{id:"创建项目"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#创建项目"}},[t._v("#")]),t._v(" 创建项目")]),t._v(" "),s("ul",[s("li",[t._v("创建之前可以区分类型，比如组件，还是项目。项目的话，又可以根据不同的配置和业务形态进行拉取不同的模板。")]),t._v(" "),s("li",[t._v("拉取模板时会提问拉取模板类型、在当前目录创建的文件类型、项目名称、项目描述等")]),t._v(" "),s("li",[t._v("通过"),s("code",[t._v("inquirer")]),t._v("插件，来获取用户在终端的选项。")]),t._v(" "),s("li",[t._v("伪代码如下")])]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 预设配置项问题")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" questions "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\tname"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'templateType'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\tmessage"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'选择项目模板'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\tname"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'projectName'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\tmessage"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'请输入项目名称'")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 收集用户配置项")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" options "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("collectOptions")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 判断本地有无存在相同的项目名称")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),t._v("fs"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("existsSync")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("projectName"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 根据选项下载模板")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("download")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("templateType"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" projectName"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" \n\n\t"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 执行install")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("try")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" cmd "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token template-string"}},[s("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("cd ")]),s("span",{pre:!0,attrs:{class:"token interpolation"}},[s("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),t._v("projectName"),s("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v(" && npm install")]),s("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        shelljs"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("exec")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("cmd"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("catch")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 异常处理")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 提示已存在同名项目")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n")])])]),s("h3",{attrs:{id:"构建项目"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#构建项目"}},[t._v("#")]),t._v(" 构建项目")]),t._v(" "),s("ul",[s("li",[t._v("在构建项目之前，可以根据不同配置来拼接"),s("code",[t._v("build")]),t._v("命令，比如：\n"),s("ul",[s("li",[t._v("应用类型：单页应用、多页应用")]),t._v(" "),s("li",[t._v("使用的打包工具："),s("code",[t._v("webpack, vite, vue-cli")])])])]),t._v(" "),s("li",[t._v("如果嫌每次打包选择比较麻烦，可以将打包配置存储起来，比如放到"),s("code",[t._v("package.json")]),t._v("中，或者单独作为一个配置项放到模板文件中，在执行"),s("code",[t._v("build")]),t._v("之前直接读取配置即可。")]),t._v(" "),s("li",[t._v("以"),s("code",[t._v("vue cli3")]),t._v("为例，我们的"),s("code",[t._v("build")]),t._v("命令为"),s("code",[t._v("npx vue-cli-service build")])])]),t._v(" "),s("h2",{attrs:{id:"模板结构"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#模板结构"}},[t._v("#")]),t._v(" 模板结构")]),t._v(" "),s("h3",{attrs:{id:"vue-2-0-ts-模板"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#vue-2-0-ts-模板"}},[t._v("#")]),t._v(" Vue 2.0 ts 模板")]),t._v(" "),s("ul",[s("li",[t._v("待完善")])]),t._v(" "),s("h4",{attrs:{id:"获取多页应用配置"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#获取多页应用配置"}},[t._v("#")]),t._v(" 获取多页应用配置")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//获取多页应用配置")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("getPagesConfig")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//定义多页路由配置空对象")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" pages "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//定义基础路径")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" baseUrl "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"src/pages"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//pages路径")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" pagesPath "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("resolve")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("baseUrl"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//page下的文件夹列表")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" pagesDirList "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" fs"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("readdirSync")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("pagesPath"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//迭代page下的文件夹列表[比如 games ...] (文件夹数组)")]),t._v("\n    pagesDirList"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("forEach")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("pagesChildDir")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//pages的子路径")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" pagesChildPath "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("resolve")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token template-string"}},[s("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")]),s("span",{pre:!0,attrs:{class:"token interpolation"}},[s("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),t._v("baseUrl"),s("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("/")]),s("span",{pre:!0,attrs:{class:"token interpolation"}},[s("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),t._v("pagesChildDir"),s("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),s("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        pages"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("pagesChildDir"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            entry"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("resolve")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token template-string"}},[s("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")]),s("span",{pre:!0,attrs:{class:"token interpolation"}},[s("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),t._v("baseUrl"),s("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("/")]),s("span",{pre:!0,attrs:{class:"token interpolation"}},[s("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),t._v("pagesChildDir"),s("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("/main.ts")]),s("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n            template"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("resolve")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token template-string"}},[s("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")]),s("span",{pre:!0,attrs:{class:"token interpolation"}},[s("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),t._v("baseUrl"),s("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("/")]),s("span",{pre:!0,attrs:{class:"token interpolation"}},[s("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),t._v("pagesChildDir"),s("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("/index.html")]),s("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n            filename"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token template-string"}},[s("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")]),s("span",{pre:!0,attrs:{class:"token interpolation"}},[s("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),t._v("htmlBaseUrl"),s("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),s("span",{pre:!0,attrs:{class:"token interpolation"}},[s("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),t._v("pagesChildDir"),s("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v(".html")]),s("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n            chunks"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"chunk-vendors"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"chunk-common"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token template-string"}},[s("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")]),s("span",{pre:!0,attrs:{class:"token interpolation"}},[s("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),t._v("pagesChildDir"),s("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),s("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" pages"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("h3",{attrs:{id:"vue-3-0-模板"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#vue-3-0-模板"}},[t._v("#")]),t._v(" Vue 3.0 模板")]),t._v(" "),s("ul",[s("li",[t._v("待完善")])]),t._v(" "),s("h2",{attrs:{id:"参考"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#参考"}},[t._v("#")]),t._v(" 参考")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"https://zhuanlan.zhihu.com/p/32894283",target:"_blank",rel:"noopener noreferrer"}},[t._v("深度定制团队自己的 Vue template"),s("OutboundLink")],1)])])])}),[],!1,null,null,null);a.default=e.exports}}]);