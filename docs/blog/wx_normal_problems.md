---
sidebar: auto
---

# 微信小程序 & webview 常见问题# 博客

## 兼容性问题

### keyframe 动画

- 小程序里面，非永久性的帧动画执行一次后，通过 state 变动导致 view 更新后，动画不会触发。H5 会正常执行动画。
- 解决：添加 infinite 属性。或者使用其他实现方式。
-

## UI 稿

- App 内嵌页面、小程序页面、H5 页面尽可能出三种样式，因为头部的样式会不一样。

## 知识点

### openID 与 unionID: 

- OpenID 就是用户在某一公众平台下的标识。OpenID = 用户微信号 & 公众平台 APPID（两个数据加密得到的字符串）
  UnionID 机制的作用说明：如果开发者拥有多个移动应用、网站应用和公众帐号，可通过获取用户基本信息中的 unionid 来区分用户的唯一性，因为同一用户，对同一个微信开放平台下的不同应用（移动应用、网站应用和公众帐号），unionid 是相同的。UnionID = 用户微信号 & 开放平台 APPID（两个数据加密得到的字符串）

## h5 webview

### H5 不同环境授权登录

- 目前一共有 dev, fat, pro 三套环境，但是公众号的授权登录，只支持两个域名，所以目前仅支持 fat、pro 的授权登录

### H5 调用微信支付

- 需要支持 https
- 需要在不同的域名下，添加一个校验文件，比如`h5.domain.com/xxx.txt`

### 微信 H5 分享提示签名失败

- 如果后端计算签名没有问题，那就是传参的 url 的取值问题。参考：https://github.com/yongheng2016/blog/issues/78
- 必须是当前页面的 url，去掉 hash 值以后，再传给后端进行计算相应的签名。

## 小程序

### 登录

- 授权登录的时候，如果要保持 app, h5, 小程序三端账号统一，只能使用 unionID，需要后端解析，拿到 unionID
- unionID 机制说明：https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/union-id.html
- 获取不到 unionID: https://developers.weixin.qq.com/community/develop/doc/00002499ae8a3835071a282cb52000
- 通过解密方式获取 unionID: 
  https://blog.csdn.net/chiyan5284/article/details/100650055?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-5.nonecase&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-5.nonecase

### 打包

- 小程序环境，navigator 对应的属性跟浏览器环境不一样，引入的第三方加密包，有兼容问题
- 打包的时候，由于小程序环境不会用到该页面，不打包进去。
- 对包做修改，对部分对象兼容小程序。修改方法：
  https://developers.weixin.qq.com/community/develop/doc/000068b497cfc00619b7bcfdc51004
  https://juejin.im/post/5de086ade51d4532fc2d6407
- 网友开源的版本：https://github.com/zhangs3721/wx_jsencrypt
