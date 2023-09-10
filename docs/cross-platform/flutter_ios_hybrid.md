---
sidebar: auto
category: 跨端
tags:
  - Flutter
  - iOS
---

# iOS 接入 Flutter 碰到的问题和解决方案

## iOS 打 release 包出错

### 报错信息
* Build service could not create build operation: unknown error while handling message: MsgHandlingError(message: "unable to initiate PIF transfer session (operation in progress?)")

### 解决
* 这个报错信息很少见，多发生在xcode配置出错或xcode更新导致的环境变化。所谓环境变化就是xcode更新如果是覆盖式更新则好一些，如果是完全卸载式更新，也就是xcode所有的编译缓存都删除了，全部再次安装编译生成一遍新的编译缓存，但是按照这种方式实验之后没有任何效果。
* 最后通过查询资料，发现问题。Xcode 14.3版本移除了ARC相关的库，从而导致一些默认部署目标是iOS 8版本的第三方库出现报错。只要最低部署目标不低于iOS 9版本，运行项目时就不会去链接ARC相关的库，也就不会出现找不到库的报错。
* ![img](https://raw.githubusercontent.com/hutaoer/images/main/blog/cross-platform/img1.png)