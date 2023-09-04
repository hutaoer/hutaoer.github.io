---
sidebar: auto
---

# 乐高搭建系统实践

## 背景
* 在很多促销页面中，很多模块是可复用的，比如banner、商品list、推荐模块等，直接由运营同学通过搭建系统生成页面，可以大幅的节省开发效率和人工成本。
* 还有一些静态数据，是经常变动的，直接在搭建系统实现可配置，不需要走业务发布流程，直接通过搭建系统发布即可。
* 有设计师出统一的模块规范和模块UI，最大可能的提升模块复用率。
* 在 2020 年的双十一大促中，一共生产页面 70+，开发模块 20+

## 搭建系统产品框架
* ![img](http://yzt-fe-cdn.oss-cn-hangzhou.aliyuncs.com/image/lego1.png)

## 系统架构图
* ![img](http://yzt-fe-cdn.oss-cn-hangzhou.aliyuncs.com/image/jiagou2.jpg)

## 搭建后台

### 模块
* 公共模块：底部导航、分享、悬浮导航、吸顶导航、图片热区
* 业务模块：店铺、店铺卡片、卡券、楼层标题、秒杀、品牌、商品卡片、商品列表、直播

#### 商品卡片配置参数
```js
bg              - 背景        - 支持色值或图片                                      - String
moduleBg        - 卡片背景    - 支持色值或图片                                      - String
headerBg        - 头图        - 支持色值或图片，色值默认高度为80px，图片高度自适应    - String
headerBgHeight  - 头图高度    - 当头图为色值时高度生效  - 可选参数，可配可不配        - Number
title           - 标题        - 支持字体所有参数                                    - String | Object
benefit         - 利益点      - 支持字体所有参数                                    - String | Object
corner          - 商品Logo    - 仅支持图片                                          - String
tips            - 营销标      - 支持文案或图片                                      - String
tipsSize        - 营销标大小                                                        - Number
tipsColor       - 营销标背景色  - 营销标为文案时生效                                 - String
items           - 商品列表      - 参数和商品模块保持一致                             - Array[Object
```

#### 店铺卡片配置参数
```js
bg              - 背景        - 支持色值或图片                                      - String
moduleBg        - 卡片背景    - 支持色值或图片                                      - String
headerBg        - 头图        - 支持色值或图片，色值默认高度为80px，图片高度自适应    - String
headerBgHeight  - 头图高度    - 当头图为色值时高度生效  - 可选参数，可配可不配        - Number
title           - 标题        - 支持字体所有参数                                    - String | Object
benefit         - 利益点      - 支持字体所有参数                                    - String | Object
items           - 店铺列表    - 参数和店铺模块保持一致                               - Array[Object]
```

### 模块协议
* 每个模块都是可以通过`json schema`进行描述。

#### 基础配置
* `commonConfig`
```js
export default {
  recommendId: {
    title: '资源位Id',
    disableInEdit: true,
    hiddenInNull: true,
    type: [Number, String],
    default: null,
  },
  dynamicChildList: {
    type: Array,
    hiddenInEdit: true,
    default() {
      return []
    },
  },
  childList: {
    type: Array,
    hiddenInEdit: true,
    default() {
      return []
    },
  },
}
```

#### 商品列表配置
```js
import commonConfig from '@/modules/config/common';
export default Object.assign({}, commonConfig, {
  styleType: {
    title: '布局',
    type: Number,
    default: 2,
    options: [
      {
        title: '一排一',
        value: 1,
      },
      {
        title: '一排二',
        value: 2,
      },
    ],
  },
  type: {
    title: '卡片类型',
    type: Number,
    default: 1,
    options: [
      {
        title: '一口价',
        value: 1,
      },
      {
        title: '拍卖',
        value: 2,
      },
    ],
  },
  count: {
    title: '展示数量',
    type: [Number, String],
    placeholder: '默认展示全部',
    default: '',
  },
})
```

## server 端

### 目录结构
```js
├── server.js # 入口文件
├── package.json 
├── logger.js # 日志输出 
├── db  # 数据库操作
│   ├── config.js # 不同环境的数据库连接配置信息
│   ├── connect.js # 连接数据库
│   ├── queryData   # 数据库查询方法封装
│   └─── sql.js    # sql 语句
├── proxy/index.js # 代理配置
├── routers  # 路由配置
│   ├── api.js # 服务端api
│   ├── checkToken.js # token验证
│   ├── errorHandler.js # 错误处理
│   ├── index.js    # 入口文件
│   ├── noAuth.js # 
│   └── session.js    # session 处理
├── utils/index.js # 工具函数
├── oss/index.js # oss上传方法
├── ssr  # 服务端打包逻辑
│   ├── build # 打包配置
│   │   ├── webpack.base.config.js    # 基础配置
│	│   ├── webpack.client.config.js  # 客户端配置
│	│   ├── webpack.server.config.js  # 服务端配置
│   ├── src   # 被打包源码目录
│	│   ├── app.js            # 入口
│	│   ├── App.vue           # 根组件
│	│   ├── entry-client.js   # 客户端入口
│	│   ├── entry-server.js   # 服务端入口
│	│   ├── template.html   # 模板文件
│   ├── index.js    # 入口
└── webHook/index.js # webhook 自动部署
```

### 核心方法
* 下面的代码均做了简化处理，逻辑更加清晰些，去掉了繁琐的一些数据处理和非关键步骤。

#### 发起部署请求
* 用户在后台编辑完页面后，点击部署，发送请求: `/api/post`
* 服务端处理
```js
import ssr from './ssr/'
router.post('/api/deploy', async(ctx, next) => {
	// 收集页面合成需要的数据
	const pageData = {
		env: '', // 部署环境
		pageId: '', // 页面id
		pageInfo: {}, // 页面配置信息
		ctx,   // 上下文
		...,
	}

	await ssr.deploy(pageData)
})
```

#### 服务端打包
```js
const { createBundleRenderer } = require('vue-server-renderer')
const clientConfig = require('./build/webpack.client.config')
const serverConfig = require('./build/webpack.server.config')

function deploy(pageData) {
	return new Promise((resolve, reject) => {
		// 防止重复部署判断
		const currentUser = ctx.session.username
		if (deployUserMap[pageId]) {
	        if (deployUserMap[pageId] === currentUser) {
	          reject(`你正在部署该页面，请勿重复操作`)
	        }
	        reject(`${deployUserMap[pageId]}正在部署该页面，请勿重复操作`)
	      }
	    deployUserMap[pageId] = ctx.session.username;

	    // 执行打包
	    webpack(clientConfig)

	    // 服务端打包
	    webpack(serverConfig)

	    // 根据数据和模板渲染html
	    renderHtml(pageData, template)

	    // 根据 manifest.json 和 serverBundle，创建 render 对象
	    const renderer = createBundleRenderer(serverBundlePath, {
	      runInNewContext: false,
	      template,
	      clientManifest: require(clientManifestPath),
	    })

	    // 生成文件内容
	    renderer.renderToString(context, (err, html) => {
	    	// 将打包好的内容写入文件
	    	var outPath = path.resolve(outDir, `./index.html`)
	        // 将文件上传至 oss
	        fs.writeFile(outPath, html, function (err) {
	          if (err) {
	            reject(err)
	          } else {
	            resolve(outDir)
	          }
	        })
	    })

	    // 上传至oss
	    oss.upload('index.html')
	})
}

```

## 问题
* 并发操作，需要加锁来控制。 

## 线上示例
* 活动页：https://cdn.yizhitongapp.com/activity/1610516111116/index.html