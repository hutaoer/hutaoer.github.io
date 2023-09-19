---
sidebar: auto
category: 实践
date: 2022-08-09
tags:
  - schema 
---

# schema动态路由建设

## 背景/目的
1.解决多个端 对于同一页面的实现类型不一样,比如日记详情页在患者app上是h5,在小程序上是原生.<br />2.解决多个端 对于同一页面 页面路径的不同,比如app天生没有页面路径的概念,小程序和app端的页面路径也不可能必须保持统一

## 方案介绍
以页面为维度,每一个页面对应这一个schema,将schema的解析规则沉淀下来,在swan上进行配置,然后各个端启动的时候，更新下载此配置.

### 解析规则介绍
* 配置表可视化操作界面
* ![image.png](https://cdn.jsdelivr.net/gh/hutaoer/images/1667826392191-94d2269b-c93c-4782-aa88-b0858073929a.png)
* 小程序/app获得的解析单条规则数据结构
* ![image.png](https://cdn.jsdelivr.net/gh/hutaoer/images/1667887499600-9abd02a7-2d86-4277-ab50-f26392dac5e8.png)
* 每个端对应一套规则配置表
* `schema` 为该条记录的主键,用来匹配`schema`的规则
* `schemeType`代表`schema`跳转类型,不同页面类型 对应的路径不一样,比如`h5`的是网址,`miniPage`对应的是小程序路径,`extMini`代表打开其他小程序,路径就代表其他小程序的路径
* 路径`(target)`代表`schema`对应页面的路径
* 额外参数放着是元数据给终端解析的逻辑关键字段<br />包含`schemeType`(代表跳转类型:原生页面 h5页面 打开其他小程序),<br />`appId`(`schemeType`为`extMini`时用),`Base_Api`存着是对应的域名(`schemeType`为h5时且是我们自己的h5然后路径填的是h5的相对路径,这样做的好处是能够读取客户端存的开发预发线上环境域名),<br />`needLogin:boolean`代表scheme跳转前是否需要登录,<br />`notFinalTarget:boolean`代表是否target为中转页,即跳转的时候直接将原本schema作为参数传递给这个页面就好(一般用在一个活动在海心健康露出,这个schema在小程序点击直接跳到活动页,在app里点击是打开海心健康的这个活动页).
* `rules`代表`key`值映射,例如`{"userId":"userid"}`,即把schema原来自带的`userIdkey`值 真正转化后key值 为`userid`

### 解析流程介绍
* ![image](https://cdn.jsdelivr.net/gh/hutaoer/images/20230912164043.png)

## 功能清单/关键词

1. 动态添加:新schema swan上动态添加,添加后小程序在每次进入前台时更新/app在每次进入首页时更新
2. 一个schema多端公用,且跳转方式多端可以多样
3. 可以允许页面跳转需登录的前置校验
4. 允许不同端实现的页面带的参数key不一致,允许参数在path上而不在query上

## 注意

1. 添加新schema的时候注意下是否有重复添加,即之前是否有加过
2. 若此schema没有多端复用即这个页面不会出现在多端上,就不用添加schema,使用`openMini?mini_path=xx&mini_id=xx,h5?url=xx` 或者直接`https://healthy.aistarfish.com/activity/a`也一样能达到跳转页面的效果,如在活动页 或者不是长期的业务页面 在自己页面内部跳转的时候(schema目前已经维护有太多).
3. 由于目前`schema`测试环境没用起来,只有线上环境,所以线上操作时需谨慎