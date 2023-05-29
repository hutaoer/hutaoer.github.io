---
sidebar: auto
---

# Taro 2.0 商城项目总结

## 技术选型
* 商城的主要业务场景包括商城APP，APP内嵌H5，微信小程序，和微信H5，大部分H5页面是三端（APP, 微信H5，小程序）统一的，所以跨端的框架是首选。
* 结合团队的情况，`React`技术栈为主，2020年的时候，Taro 3.0 还是beta 版，所以选用了 Taro 2.0 作为技术栈。
* 数据管理使用 `dva`
* 部署的话，是将打包后代码，直接部署在云主机上。

## 项目目录结构
* `config`: 配置相关的文件，包括基础配置、不同环境的自定义配置、路由信息配置。
* `dist`: 项目打包后的物料目录，根据`H5`和`小程序`，最终会生成两个不同的目录，`h5`和`weapp`。
* `mock`: 由于没有搭建mock服务，可以临时在本地启一个mock服务，用来调试代码。
* `src`: 核心代码目录，目录比较多，分别进行描述。
  - `src/assets`: 存放静态资源文件，主要以图片为主。
  - `src/components`: 通用业务组件目录，超过2个页面会使用的组件，具备通用能力的组件，都会被提取到这个目录。
  - `src/constants`: 存放常量。
  - `src/models`: 存放页面数据，安装不同的页面进行区分。
  - `src/service`: ajax请求封装。
  - `src/styles`: 基础样式目录。
  - `src/utils`: 工具函数封装。
  - `src/pages`: 主包业务代码目录。主包的概念来自小程序，最大不能超过20M。如果超过了20M，可以进行拆包或者打包优化。

### 页面目录结构
* 以首页为例
* `src/pages/home/index.js`: 入口文件
* `src/pages/home/components/`: 首页用到的组件目录
* `src/pages/home/index.scss`: 样式文件
* `src/pages/home/model.js`: 数据
* `src/pages/home/service.js`: 首页接口请求 

## ajax 封装
* `ajax`请求是基于`Taro.request`

### 常见请求状态码
* 文件目录：`src/constants/status.js`

#### HTTP 状态码
```js
export const HTTP_STATUS = {
  SUCCESS: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  CLIENT_ERROR: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  GONE: 410,
  UNPROCESSABLE_ENTITY: 422,
  SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
}
```

#### 业务状态码
* 这个跟后端同学一起约定好
```js
export const SERVER_STATUS = {
  SUCCEED_CODE: 0, // 成功
  SESSION_TIMEOUT: 1, // 会话超时，请重新登录
  NOT_REGISTER: 2, // 用户未注册
  REFRESH_TOKEN_EXPIRED: 3, // 主Token已失效
  INVALID_ACCESS_TOKEN: 4, // accessToken无法解析
  ...,
}
```

### 添加自定义拦截器
* 统一在`header`中添加埋点参数和`token`。
* 对不同环境，比如本地、`mock`、`development`、`production`的调用，适配不同的`baseUrl`。需要在启动服务的时候，传入不同的参数，例如`dev`环境，传入`TARO_APP_API=dev`
* 对请求返回值做统一的判断处理，对于返回异常的结果做统一处理。


## 问题

### 小程序中打开web页面
* 由于小程序的主包大小是有限的，一些页面仅H5就能满足需求，就没有同时开发小程序版，但是在跳转的时候，针对这些url需要使用`weburl`的方式打开。在配置跳转链接的时候，就需要非常小心，否则在小程序端将无法浏览。
* 还有一种情况，是一些页面是通过搭建工具生产出来的，在小程序端也只能使用`weburl`的方式打开。
* 以上两种情况，很容易跟`Taro`的路由混淆。这些链接的场景，可能是在运营后台配置的，可能是服务端拼接后返回的，也能是前端在代码中拼接的，需要非常小心。
* 最好是有一份`weburl`的文档维护，知晓相关产品、运营、开发同学，否则很容易造成事故。

### `ScrollView`的局限性
* 大促页面中，常见的模块组成是顶部`banner` + 导航 + 底部的商品楼层。当页面滚动一部分距离后，需要将导航固定在头部，方便用户切换楼层。
* 我们使用了`ScrollView`作为承载商品楼层的容器，如果容器中有`position:fixed`的元素，比如导航，会出现样式错位的bug。
* 解决方案，写两份导航，当需要`fixed`的时候，用外层的导航盖在`ScrollView`上面。

### 刘海屏适配
* 当应用需要全屏显示时才需要进行适配，常见场景：沉浸式体验，比如全屏直播。
* `<meta name="viewport" content="viewport-fit=cover">`，设置之后，视图端口被缩放以填充设备显示。换句话说就是网页会扩展到整个屏幕。
* `env()`，将用户代理定义的环境变量值插入你的 CSS 中。
```js
body {
  padding:
    constant(safe-area-inset-top)
    constant(safe-area-inset-right)
    constant(safe-area-inset-bottom)
    constant(safe-area-inset-left); /* 兼容 iOS < 11.2 */
  padding:
    env(safe-area-inset-top)
    env(safe-area-inset-right)
    env(safe-area-inset-bottom)
    env(safe-area-inset-left); /* 兼容 iOS >= 11.2 */
}
```
* 如果使用了原生导航栏，仅需要适配底部小黑条时，简单设置`safe-area-inset-bottom`就可以。
```css
body {
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
```

## 总结
* 如果业务需要同时支持H5和小程序端，需要提前规划好主包内容，必须是核心、基础的内容，然后要考虑首屏加载的组件，比如首页，瀑布流组件等
* Taro H5 路由支持简写，但小程序中的路径是需要写完整的路径的，推荐使用完整路径，不需要搞两套，维护起来比较麻烦。
* 对于H5 和 小程序 UI 相差较大的页面，建议用两个页面分别作为页面入口，不要在一个页面中写兼容的逻辑。
* 跟客户端的路径一定要统一，统一的好处是，如果在客户端扫码打开某个H5页面，可以直接映射到对应的客户端页面。另外，跳转的参数也需要统一。
* 对于UI展示有规律的模块，比如`个人中心`的各个模块入口，或者`首页`的入口，尽量设计为可数据配置，这样可以减少客户端的发版次数。
* 客户端的大版本号尽量保持一致发布。


## 参考
* [env](https://developer.mozilla.org/zh-CN/docs/Web/CSS/env())



