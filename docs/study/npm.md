---
sidebar: auto
category: 学习笔记
tags:
  - npm
---

# npm 学习笔记

## 安装
* 安装`Node.js`的时候，会连带一起安装`npm`
* 安装最新版`npm`: `npm install npm@latest -g`


## npx
* npm 从5.2版开始，增加了 npx 命令。npx 想要解决的主要问题，就是调用项目内部安装的模块。
* 对于一些全局安装的工具包，比如`create-react-app`，执行`npx create-react-app my-react-app`，那么npx执行的逻辑是：将`create-react-app`下载到临时目录，使用以后再删除；若后面再次执行这个命令，会重新下载`create-react-app`


## 全局链接
* 查看所有全局链接：`npm ls --global --depth 0`
* 删除某个全局链接：`npm uninstall --global pkg`

## npm link
* 在一个npm的项目中执行`npm link`会创建一个全局的`npm`链接，指向当前执行命令的目录。
* 链接的名字对应的是`package.json`中的`name`，比如叫做：`pkgName`
* 记得给项目添加`main`属性，指定主入口。
* 如果要在其他的项目中使用这个全局链接，则在项目的根目录中执行,`npm link pkgName`。生成链接后，每次修改代码，都会同步。不需要再做二次链接。
* 如果测试完成后，务必记得删除`pkgName`，先在项目中删除模块，执行`npm unlink pkgName`
* 然后进入`pkgName`项目根目录，执行`npm unlink`

### 使用模块
* `npm link pkgName`
* 如果`pkgName`中指定了`"main":"index.js"`属性，那么在`require`的时候，就会去查找`pkgName/index.js`
* 如果`pkgName`的`package.json`中还使用了`bin`属性，那么会在本地的`{prefix}/bin/`下面再建立一个软连接，这样就可以直接在命令行中使用`bin`配置的属性。
* 如果`bin`下面有多个命令，则会在`{prefix}/bin`下面，生成多个全局的软连接。
* 如果执行`bin`下面对应命令提示没有权限的话，需要将`npm`的`{prefix}/bin`路径，添加到`$PATH`中。
* 例如，你可以在`.zshrc`中，添加代码：`export PATH={home}/.nvm/versions/node/v12.16.1/bin`。作者本人是使用的`nvm`管理`node`，所以`PATH`可能跟大家的不一样，仅供参考。

### 注意
* 在`pkgName`项目中删除的时候，直接`npm unlink`会删除不掉，错误信息为：`Must provide a package name to remove`。然后又执行`npm unlink pkgName`，还是删除不掉。后来使用了`npm unlink pkgName -g`才能删除成功。不知道是不是使用了`nvm`的关系。如果是使用原生的`node`安装包安装，可能会不一样。笔者在这里没有做进一步的测试。
* 测试的`npm`版本为 `7.22.0`，这时候，`{prefix}/lib/node_modules`和`{prefix}/bin/`下面的软连接都会一起删除掉。
* 也可以进入到目录下，手动删除：`rm linkName`

## npm ci
* `npm ci` 基于一个独立的库 `libcipm` 安装依赖，功能类似`npm install`。当它安装依赖时，默认是缓存优先的，从而加速装包。
* 使用限制：
  - 必须包含`package-lock.json`
  - npm 版本 `>=5.7`

## npm install
* 在项目中执行`npm install pkgName`, `pkgName`被安装到当前目录的`node_modules`子目录；其次，`node_modules/.bin`目录会生成一个符号链接`node_modules/.bin/pkgName`，指向`pkgName`模块的可执行脚本。
* 安装成功后，就可以在`package.json`的`script`属性里面，不带路径的引用`pkgName`这个脚本。

### peerDependency
* 可以用来避免核心依赖库被重复下载的问题。提示宿主环境去安装满足插件`peerDependencies`所指定依赖的包。
* 比如`antd`就指定了`peerDependencies`
```js
  "peerDependencies": {
    "react": ">=16.9.0",
    "react-dom": ">=16.9.0"
  }
```
* 我在自己的本地项目中显式的安装依赖`"react": "^17.0.2"`，然后再安装`antd`
* 最终在本地项目的`node_modules`下，安装了"react": "17.0.2"`和"react-dom": "17.0.2"`
* 删除`node_modules`和`package-lock.json`，先安装`react@16.0.0`，再安装`antd`，会提示`unable to resolve dependency tree`
* 另外，如果先安装antd，再安装低版本的react，也会提示相应的报错。


## 同yarn比较
### yarn
* 并行安装。二次安装，直接从缓存中读取。速度更快。
* 安装版本统一：生成`yarn.lock`文件
* yarn依赖结构是扁平化的。
* 命令：`add, remove`
* 日志输出更加简洁，仅展示必要的信息。

### npm
* 按照队列进行安装，类似串行安装。
* 5.0版本，默认新增了类似yarn.lock的 package-lock.json
* npm2之前是树形的，npm3以上是扁平化的。
* 命令：`install uninstall`，安装的时候打印安装依赖。









