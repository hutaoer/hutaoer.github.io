---
sidebar: auto
category: 跨端
tags:
  - Flutter
  - iOS
---

# 原生App和Flutter通信接口文档

## 原理
* 原生和`Flutter`之间通过`BasicMessageChannel`实现双向通讯，双向通讯的数据为字符串类型。
通讯的内容为`json`结构：
```json
{ "code":"接口名称",
  "data":"接口请求数据或返回数据"
}
```
原生和Flutter通过`code`来识别请求和返回的接口，通过`data`获取请求或返回的数据

注册的channel名称：`basicChannel`

## 原生提供给Flutter的接口
### 1、获取不同服务器当前环境的地址，开发机或者预发线上等
方法	: `getService` 
接口请求: `{"code":"getService","data":"oh"} `
接口返回：`{"code":"getService","data":"http://open.aistarfish.net"} `
作用	: 获取不同服务器当前环境的地址，开发机或者预发线上等

### 2、获取医生用户信息
方法	: `getDoctorUserInfo`
接口请求: `{"code":"getDoctorUserInfo"} `
接口返回：`{"code":"getDoctorUserInfo","data":{"doctorUserId":"D2017111721172325300003602","name":"吴贵锋","phone":"17348510813","gmtLogin":null,"expertId":null,"avatarUrl":"https://user-private-stable.aistarfish.net/doctor/avatar/D2017111721172325300003602/1b0c6d31a2d14ac2833570071aabbeab.jpeg?image&access_key_id=XPFSZGJKGAGBAPNQRSDY&expires=1676440019&signature=Ojfmw6YgkOxnkylXKxmENz85pLIBh4EBWRdW7MLLDR4%3D&action=resize%3Aw_100%2Ch_0%2Cm_0","hospital":"浙江大学医学院附属第一医院","department":"感染病科","title":"主任医师","certified":0,"certifiedDesc":null,"subCertified":0,"subCertifiedDesc":null,"area":null,"introduction":null,"research":null,"qrCode":null,"qrCreate":null,"qrUrl":null,"effectiveTime":null,"showWxBtn":"true","wechat":{"country":"","unionId":"okrkE1pZ00eAKJb4HkgF7uDUA5uA","headImgUrl":"https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJajicESZT3qZ9j8rdN8L27MXcLLxBKJzr9qibkHUAQFib0BIlYaLm46K44YHL8Tq8kIdysenoK7lG8A/132","province":"","city":"","nickName":"NEXT TO U","openId":"oDyH55kFGxAw8YNuMjtmiYFvA-Ho","sex":"0"},"alipay":null,"orgId":"O0001002","orgName":"海心医院","accountType":"admin","superAdmin":"true","patientDailyMng":"true","inviteClinic":"true","showTreatmentPlan":false,"joinCenterId":null,"authTag":"1","authTagDesc":"已认证","filingTag":1,"filingTagDesc":"已备案","qualificationType":1,"certTag":1,"certTagDesc":"已实名","switchFiling":true,"submitAuth":false}} `
作用	: 获取医生用户信息

### 3、获取当前app类型，海心医生或者全病程
方法	: `getAppType`
接口请求:`{"code":"getAppType"} `
接口返回：`{"code":"getAppType","data":"hxsy"} `
作用	: 获取当前app类型，海心医生或者全病程

### 4、进行scheme跳转
方法	: `schemeMethods`
接口请求:`{"code":"schemeMethods","data":"xxx?a=XXX"} `
接口返回：无
作用	: 进行scheme跳转

### 5、get请求
方法	: `httpGet`
接口请求:`{"code":"httpGet","data":{"service":"oh","url":"/api/test"}} `
接口返回：`{"code":"/api/test","data":{"id":"123"}} `
作用	: get请求

### 6、post请求
方法	: `httpPost`
接口请求:`{"code":"httpPost","data":{"service":"oh","url":"/api/test","params":{"id":"123"}}} `
接口返回：`{"code":"/api/test","data":{"id":"123"}} `
作用	: post请求

### 7、进行Toast弹窗
方法	: `showToast`
接口请求:`{"code":"showToast","data":"xxx"} `
接口返回：`{"code":"showToast"}`
作用	: 进行Toast弹窗

### 8、进行埋点（支持带参数埋点）
方法	: `trackEvent`
接口请求:`{"code":"trackEvent","data":{"eventId":"00130000xxxx","params":{}}} `
接口返回：`{"code":"trackEvent"} `
作用	: 进行埋点

### Flutter 专用scheme：
* `flutter?routeName=xxxx&titleName=xxx`
* `routeName表示跳转flutter页面的路由`
* `titleName`表示标题