---
sidebar: auto
category: 团队
date: 2022-01-05
tags:
  - 命名规范 
---

# 业务域名命名规范

## 背景
越来越多的应用需要迁移到新前端的部署方式，新前端的部署要求每个业务在接入的时候需要配置一个业务域名。关于域名和业务url之前还没有统一的规范。此文档的目的，就是方便大家，尤其是前端同学在接入新前端的时候，有规范可依。欢迎大家提意见和建议， 共同完善。


## 业务域名(host)
* 一个或多个单词、小写、不需要加分隔符，举例：
  - `newone.company.com`
  - `new.company.com`
* 当然尽量选用一个单词或首字母缩写，方便记忆

## 路径(path)
* URL中的path，小写，多个单词间**使用中划线连接**。而页面URL的最后一级，有两种形式，我们内部达成一致，不使用文件后缀（比如.html），命名也推荐使用**中划线**。
* ![image](https://cdn.jsdelivr.net/gh/hutaoer/images/1641975177099-b61d350e-9c62-4449-9386-5edd323af502.png)
* 以内部的应用为例，在创建【入口】的子应用的时候，需要配置相对路径，这里就是对应了URL中的path，在路径的最后，注意不要添加**斜杠(/)**。  
  - 1.不是用文件后缀，`/index`（**强制约束**）
  - ~~2.使用文件后缀，~~`~~/index.html~~`（内部不推荐）
* 常见的举例：
  - hash路由：`/digital/case-management/index.html#/follow-up-list?query=123`
  - 静态资源：`static/front-release/case-management/index.js`
  - history路由：`/digital/case-management/follow-up-list?query=123`（**推荐**）
  - history路由：`/digital/case-management/follow_up_list?query=123`（不推荐）
  - history路由：`/digital/case-management/followUpList.html?query=123`（不推荐）
* 如果有版本号，举例：
  - 中间的path: `/digital/case-management-v2/`
  - 最后一级: `/digital/case-management-v2/follow-up-v2`

## 参数(search)

### 页面参数
使用一个或多个单词，小写，用**下划线**('_')或**小驼峰**来拼接单词，这个暂时根据个人习惯而定，不做强制要求。
举例：
`?selected_tab=first&doctor_id=12312321`（**推荐**）
`?productType=123`

### API传参
使用小驼峰，务必要求对应的后端开发同学遵守。（**强制约束**）

## 常见命名方式
一般来讲，多个单词间的拼接有以下三种方式，推荐使用中划线，尽量不要带数字，尽量使用一个单词。如果有版本的区别，那么可以通过`v1`,`v2`来区分。<br />小驼峰：firstSecond、firstSecondV2<br />中划线：first-second、first-second-v2<br />下划线：first_second、first_second_v2

### 推荐方式
一般的url的形式为：
```javascript
{protocol(协议头)}{host(域名)}{pathname(路径)?{search(传参)}}
```
页面url中的path不推荐使用大写字母，推荐使用中划线。<br />pathname中最后的一级命名：`name.html`，name 推荐使用小驼峰或下划线，**公司已内部达成一致，不使用`.html`文件后缀**。<br />传参一般使用小驼峰或下划线，推荐下划线。

## 业务URL命名

### 业务域名
现在新前端中，业务域名是可以自定义的，业务线自定义的部分包括二级域名和后面的path，主域名为公司统一的：**company.com ，**数字疗法的业务域名就是 `**dtx.company.com**`。业务域名命名，推荐使用**一个单词、拼音、连写**(helloworld，loveyou，websearch)或简写，**好记、简单易拼写**。<br />域名的形式为：
```javascript
{业务二级域名}.company.com
```

### 业务url
对于业务url来讲，一般命名方式为：
* `协议头://业务域名/项目名/页面名`
比如对于数字疗法的个案管理平台，那么它对应的新前端的url就是：
* `https://dtx.company.com/case-management/index.html`

## 内部URL命名调研
后台项目迁新前端后统一用boss.company.com域名,path的第一层就用每个业务线的标识即
https://boss.company.com/dtx/....
[https://boss.company.com/healthy/....](https://boss.company.com/dtx/....)

### swan后台
下划线： [https://swan.company.com/index#/application_data](https://swan.company.com/index#/application_data)

### lion后台
中划线：[http://newdamo.company.net/lion/index#/clinic-apply-list](http://newdamo.company.net/lion/index#/clinic-apply-list)

### 个案管理平台
中划线：[https://open.company.net/org/patient/digital/index.html#/patient-manage-list?current=1&keyword=&secondTab=joined&tab=todo](https://open.company.net/org/patient/digital/index.html#/patient-manage-list?current=1&keyword=&secondTab=joined&tab=todo)<br />中划线：[https://static.company.com/front-release/file/F2020031207583336400008102.agora-rtm-sdk-1.2.2.js](https://static.company.com/front-release/file/F2020031207583336400008102.agora-rtm-sdk-1.2.2.js"></script>)<br />下划线：

## 业内URL命名调研

### 国外

#### youtube
中划线：[https://music.youtube.com/coming-soon/](https://music.youtube.com/coming-soon/)<br />中划线：[https://studio.youtube.com/channel/UCaPWAQn0XZe0pASl8Soyi2g/analytics/tab-overview/period-default](https://studio.youtube.com/channel/UCaPWAQn0XZe0pASl8Soyi2g/analytics/tab-overview/period-default)<br />业务域名连写：[https://servicesdirectory.withyoutube.com/](https://servicesdirectory.withyoutube.com/)

#### twitter
下划线：[https://twitter.com/i/flow/single_sign_on](https://twitter.com/i/flow/single_sign_on)

#### github
中划线：[https://github.com/settings/security-log](https://github.com/settings/security-log)<br />下划线：[https://github.com/settings/security_analysis](https://github.com/settings/security_analysis)<br />不带分隔符：[https://github.com/marketplace](https://github.com/marketplace)<br />中划线：[https://docs.github.com/cn/account-and-profile](https://docs.github.com/cn/account-and-profile)

#### stackoverflow
中划线：[https://stackoverflow.com/questions/6286571/are-git-forks-actually-git-clones](https://stackoverflow.com/questions/6286571/are-git-forks-actually-git-clones)<br />中划线：[https://stackoverflow.com/jobs/directory/developer-jobs](https://stackoverflow.com/jobs/directory/developer-jobs)<br />传参使用下划线：[https://stackoverflow.com/jobs?so_medium=StackOverflow&so_source=SiteNav](https://stackoverflow.com/jobs?so_medium=StackOverflow&so_source=SiteNav)

### google
中划线：[https://www.google.com/doodles/30th-anniversary-of-pac-man](https://www.google.com/doodles/30th-anniversary-of-pac-man)<br />中划线：[https://ads.google.com/intl/zh-CN_zz/home/?subid=ww-ww-et-g-a](https://ads.google.com/intl/zh-CN_zz/home/?subid=ww-ww-et-g-a)<br />参数使用下划线：[https://about.google/?utm_source=google-ZZ&utm_medium=referral&utm_campaign=hp-footer&fg=1](https://about.google/?utm_source=google-ZZ&utm_medium=referral&utm_campaign=hp-footer&fg=1)<br />未使用分隔符，如**websearch**: [https://support.google.com/websearch/?visit_id=637774843202076860-3307265549&hl=zh-Hans&rd=2#topic=3378866](https://support.google.com/websearch/?visit_id=637774843202076860-3307265549&hl=zh-Hans&rd=2#topic=3378866)<br />未使用分隔符：[https://smallbusiness.withgoogle.com/digital-essentials-guide/?utm_source=google&utm_medium=ep&utm_campaign=bar_coronavirus&utm_content=adshome&subid=ww-ww-et-g-awa-a-g_hpafoot1_1!o2#!/](https://smallbusiness.withgoogle.com/digital-essentials-guide/?utm_source=google&utm_medium=ep&utm_campaign=bar_coronavirus&utm_content=adshome&subid=ww-ww-et-g-awa-a-g_hpafoot1_1!o2#!/)

### 国内

#### 阿里云
中划线：[https://developer.aliyun.com/plan/grow-up?spm=5176.1972025](https://developer.aliyun.com/plan/grow-up?spm=5176.19720258.J_8058803260.82.410d2c4amoInin)<br />下划线：[https://partner.aliyun.com/neibu/agency_partner?spm=5176.19720258.J_8058803260.3](https://partner.aliyun.com/neibu/agency_partner?spm=5176.19720258.J_8058803260.32.410d2c4amoInin)<br />小驼峰：[https://tianchi.aliyun.com/competition/gameList/algorithmList](https://tianchi.aliyun.com/competition/gameList/algorithmList)

#### 淘宝
下划线：[https://buyertrade.taobao.com/trade/itemlist/list_bought_items.htm?spm=a21](https://buyertrade.taobao.com/trade/itemlist/list_bought_items.htm?spm=a21)<br />中划线：[https://market.m.taobao.com/app/tb-source-app/aiguangjiepc/content/index.html?spm=a21bo.jia](https://market.m.taobao.com/app/tb-source-app/aiguangjiepc/content/index.html?spm=a21bo.jia)<br />中划线：[https://market.m.taobao.com/app/qn/toutiao-new/index-pc.html?spm=a21bo.jianhua.201865.6.5af911d9YMGwQm#/service/fm_307?_k=fen8k3](https://market.m.taobao.com/app/qn/toutiao-new/index-pc.html?spm=a21bo.jianhua.201865.6.5af911d9YMGwQm#/service/fm_307?_k=fen8k3)

#### 百度
下划线：[https://haokan.baidu.com/tab/projection_hall](https://haokan.baidu.com/tab/projection_hall)