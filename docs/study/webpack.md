---
sidebar: auto
category: 学习笔记
tags:
  - Webpack
---

# Webpack 学习笔记

## entry
* 代码打包的入口配置，可以是字符串、数组和对象三种形式。


## output
* 代码打包输出配置，必须是对象类型。


## mode
* 配置打包方式：有三个选型：`none`,`development`,`production`，默认为`production`。
* `none`:不使用任何默认优化选项。
* `development`: 开发环境。
* `production`：生产环境，会开启代码压缩和性能优化。


## module
* 常用的loader有：
  - `css-loader`: 处理css文件
  - `style-loader`: 把css中的代码以内联的形式插入的页面中
  - `postcss-loader`: 添加统一的前缀
  - `sass-loader`: 文件预处理、
  - `url-loader`: 处理静态资源，比如图片、字体文件等等。`url-loader`选项有个`limit`属性，可以设置一个文件大小阈值，超过这个值的时候，`url-loader`就不会转成`base64`，而是直接打包成文件。
  - `file-loader`: 同样用于处理静态资源文件，但它默认就是导出文件，不会导出`base64`。
  - `babel-loader`: 对js代码进行兼容性、转换处理。

### Webpack5 资源模块
* 它允许使用资源文件（字体，图标等）而无需配置额外 `loader`
* 对图片资源处理，简单配置如下，使用`type`属性，值为`asset/resource`
```js
{
  test: /\.(png|jpe?g|gif)$/i,
  type: "asset/resource",
}
```

### babel-loader
* 使用`babel-loader`需要一些插件进行配合使用，否则`babel`不知道怎么对`js`代码进行处理。
* 常用插件：`@babel/preset-env @babel/core core-js`

#### 预设
* `@babel/preset-env`会根据你的环境配置，把 `ES6+` 代码翻译成环境能支持的 `ES5` 代码。
* 如果不配置`useBuiltIns`，那么`babel`仅做语法层的处理，比如`const`转成`var`，但`api`不会做处理。
* `useBuiltIns`配置用来处理`api`.
* `useBuiltIns` 值不为 `false `时需要指明` corejs` 版本。
  - `false` 默认值，babel 不自动导入 `polyfill` ，你需要手动在项目全局环境中导入
  - `entry` 需要你在入口文件 `import @babel/polyfill`，它会依据环境设置，仅导入环境不支持的 `polyfill`，
  - `usage` 按需加载，当每个文件里用到需要 `polyfill` 的特性时，在文件中添加对应的 `polyfill` 
```js
{
  test: /\.js$/,
  loader: 'babel-loader',
  include: [
    path.resolve(__dirname, '../src')
  ],
  options: {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            chrome: '51',
            ie: '9'
          },
          modules: false,
          useBuiltIns: 'entry',
          corejs: 2
        }
      ]
    ]
  }
}
```

#### 开启缓存
```js
{
  test: /\.js$/,
  loader: 'babel-loader',
  include: [
    path.resolve(__dirname, '../src')
  ],
  options: {
    cacheDirectory: true
  }
}

```

## plugin
* 常用的插件：
  - `html-webpack-plugin`,
  - `clean-webpack-plugin`,
  - `mini-css-extract-plugin`,
  - `webpack-parallel-uglify-plugin`
  - `webpack-bundle-analyzer`


### html-webpack-plugin
* 将打包出来的`bundle`自动引入到`html`文件中，并将该`html`文件复制到`dist`目录。


### clean-webpack-plugin
* 用来清空打包目录

### mini-css-extract-plugin
* 用来单独提取代码中的css文件，需要修改`webpack`的两处配置：
* `loader`配置，需要在css的loader中，使用`miniCssExtractPlugin.loader`。
* `plugin`配置：
```js
const miniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    ...
    ,
    plugins: [
        new miniCssExtractPlugin({
           filename: "[name].css"  // 设置导出css名称，[name]对应chunkName
        })
    ]
};

```
* 如果需要指定打包后，在`dist`下的目录，比如`dist/assets/`，需要在`output`和`miniCssExtractPlugin`两个地方分别修改下配置
* 配置`output`
```js
{
	...
	,
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'assets/[name]_[hash:8].js'  // 添加assets目录
	},

}
```
* 配置css
```js
const miniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
	...
	,
	plugins: [
		new miniCssExtractPlugin({
           filename: "assets/[name].css"  // 添加目录前缀
        })
	]

}

```

### webpack-parallel-uglify-plugin
* 使用`webpack-parallel-uglify-plugin`来覆盖原生代码压缩插件，它可以并行执行。

## 三种哈希值的意义

### hash
* 如果修改项目文件的话，所有的js、css打包文件的文件名都会发生变化，变化的是同一个`hash`值。
* 如果修改静态文件的话，该静态文件的打包文件文件名会发生变化，并且所有的js、css打包文件的文件名也都会发生变化。静态资源的hash值跟项目的hash值是不同的。

### chunkhash
* 以`chunk`为单位的，如果一个`chunk`相关的某个文件发生变化，那么相关的文件的打包文件文件名才会发生变化。
* 比如`js`中`import`了其他的`js`或者`css`文件，都会导致这个chunk相关的文件`hash`值变化.
* 可以把一些公共库，单独打包构建，然后采用`chunkhash`方式生成`hash`值，只要不改动公共库的代码，就可以保证其`hash`值不受影响，能起到缓存作用。

### contenthash
* contenthash是跟每个生成的文件相关，每个文件拥有唯一的hash值。








