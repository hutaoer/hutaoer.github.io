---
sidebar: auto
isShowComments: true    # 展示评论
category: 实践
date: 2022-07-15
tags:
  - 性能优化 
---

# 个案管理平台性能优化

## 背景
* 做性能优化有一个原则，非必要的时候，无需过多关注性能问题。
* 先阶段项目存在以下一些问题，优化化，是可以带来一些收益的。
  - 个案项目打包，使用的单文件输出方式，打出来的文件较大。
  - 本地开发，编译的时间较长。
  - 开发编译和代码本身都有可以优化的地方。

## 分析
* 单文件打包，不利于公共文件的提取，页面访问速度也较慢。打包也慢。
* 代码本身的问题，可以考虑打包为common-chunk，或者使用cdn方式引入。
  - 1.btn.js 多次依赖 80K * 7 = 560KB
  - 2.antd-mobile 引入，应该不需要。335KB
  - 3.antd 引入 使用 cdn。2.1MB
  - 4.添加tree-shaking
  - 5.删除无用依赖
  - 6.echarts 引入 1.08M
  - 7.lodash 531KB

## 优化方案

### 修改为按需加载引入后
* `webpack`版本`4.46.0`，但是页面组件引入方式，修改为按需引入。

#### 本地dev时间对比
* 虽然只统计了一次的编译时间，但是提升还是比较明显的。
* 优化前：69332ms
  - ![1](https://static.aistarfish.com/front-release/file/F2023090718003759100009983.2.png)
* 优化后：42242ms
  - ![2](https://static.aistarfish.com/front-release/file/F2023090718003751400004741.1.png)

#### 打包时间对比
* 打包时间，快了近一倍左右。
* 优化前：265123ms
  - ![3](https://static.aistarfish.com/front-release/file/F2023090718032344300002666.3.png)
* 优化后：137557ms
  - ![4](https://static.aistarfish.com/front-release/file/F2023090718032370500009792.4.png)

### 删除无用的依赖
* 使用：`depcheck`，输出没有用到的包
* 注意：这里输出的npm包，不一定真正没有用到，需要仔细对比后，再删除。
```shell
Unused dependencies * @aistarfish/im-js-sdk * @aistarfish/pro-table * @babel/runtime * @netless/white-video-plugin * draftjs-utils * faker * js-md5 * promise * raf * react-cool-onclickoutside * react-dev-utils * react-shadow * whatwg-fetch Unused devDependencies * @babel/plugin-proposal-decorators * @babel/plugin-proposal-optional-chaining * @babel/plugin-transform-runtime * @babel/preset-react * @commitlint/cli * @commitlint/config-conventional * babel-eslint * babel-plugin-import * babel-preset-react-app * commitizen * cssnano * cz-conventional-changelog * eslint-loader * jest * mini-css-extract-plugin * sass-resources-loader Missing dependencies * src: ./src/utils/fetch.js * @cm/util: ./src/utils/h5Fetch.js * dayjs: ./src/utils/index.js * @cm/hooks: ./src/entry/caseManager/util/medicineFn.js * @cm/assets: ./src/entry/caseManager/util/typing.js * @cm/pages: ./src/entry/caseManager/util/staticList/manageList.jsx * @cm/services: ./src/entry/caseManager/util/common/stageRequest/index.js * @cm/api: ./src/entry/caseManager/services/nutrition.js * @cm/components: ./src/entry/caseManager/pages/nutrition/index.jsx * @cm/stores: ./src/entry/caseManager/pages/dashBoard/index.jsx * @cm/constants: ./src/entry/caseManager/pages/TemplatePlan/components/tempEditModal/index.jsx * @cm/router: ./src/entry/caseManager/layout/main/index.js 
```

### 二方包优化
* 二方包的打包不是最优的，有的包含了较多的冗余代码，可以做优化。
* 针对不同的端，使用不同的antd组件库。并且仅放到开发依赖，不放入到生产依赖。
* 公司业务线，各个项目 antd-mobile 存在两天版本混用的情况，需要老项目做升级。

### 三方包优化
#### lodash、moment
* 方案一：具体到使用的某个方法，而不是整个引入。
  - `import {debounce} from 'lodash' `
  - 替换为 `import debounce from 'lodash/debounce' `
* 方案二：将lodash替换为lodash-es
* 方案三：使用webpack插件实现

#### bn.js/draft-js 优化
* 这些包在二方包和项目中都有重复使用。
* 因为 `webpack` 在递归查找依赖的时候会默认去第三方库的 `node_modules` 目录中查找并单独打包，所以每个库只要对 `bn.js` 有依赖就会单独打包一次。
告诉`webpack`，查找依赖时遇到`bn.js`就去 `nodejs`的命令执行目录的 `node_modules` 目录中查找依赖。
* `webpack` 配置:
```js
resolve: {
  alias: {
    '@cm': path.resolve(__dirname, '../caseManager'),
    'bn.js': path.resolve(process.cwd(), 'node_modules', 'bn.js'),
    'draft-js': path.resolve(process.cwd(), 'node_modules', 'draft-js'),
  }
},
```

### antd 优化
* 使用`cdn`代替`npm`，因为antd压缩后大小为`274KB`，而项目中按需加载后引入大小为`208KB`，通过`cdn`引入，`dev`和`build`可以减小`208KB`，收益更大些。
* `css`减少`67KB`左右。
* 优化前后对比如下：
* ![6](https://static.aistarfish.com/front-release/file/F2023090718144161600001439.6.png)

### echarts 优化
* 同`antd`的方案，使用`cdn`
* 优化前后对比如下：
* ![7](https://static.aistarfish.com/front-release/file/F2023090718144167200004522.7.png)

## 优化前后页面加载对比
* 首屏加载时间对比：
* ![8](https://static.aistarfish.com/front-release/file/F2023090718170772400006765.8.png)
