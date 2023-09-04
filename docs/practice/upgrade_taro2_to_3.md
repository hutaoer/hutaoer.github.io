---
sidebar: auto
---

# Taro 2.0 升级到 3.0 记录

## API变更
```javascript
// old
import Taro, { useDidShow, useDidHide, useState, useEffect } from '@tarojs/taro'

// new 
import React, { useState, useEffect } from 'react'
import Taro, { useDidShow, useDidHide } from '@tarojs/taro'

```

## containView引入去掉`{}`
```javascript
// old
import { ContainView } from '@/providers/basisProvider/components/ContainView'

// new
import ContainView from '@/providers/basisProvider/components/ContainView'

```


## 基础组件必须声明，如View、Image、Text...
```javascript
// 项目使用到的组件，必须引入
import { View, Image, Text, ScrollView } from "@tarojs/components";
```

## 组件、页面，return不能返回undefined 或者不写return
```javascript
// old 
return (
    isShowBall && (
      <View className="hx-signIn-ball" onClick={ toHaiXin }>
        ...
      </View>
    )
  )
  
// new  
return (
    isShowBall ? (
      <View className="hx-signIn-ball" onClick={ toHaiXin }>
        ...
      </View>
    ): <View />
  )  
```

## class组件、页面，必须声明state
```javascript
export default class Index extends Component {

  // 若有使用到this.state，则必须声明
  state = { }

  ...
}
```

## 组件引入必须以大写开头
```javascript
// old
import idCardCheckModal from '@/module-basis/components/idCardCheckModal'

// new
import IdCardCheckModal from '@/module-basis/components/idCardCheckModal'

```

## 数字0不是false
```javascript
const num = 0

// old
return num && <View></View>

// new
return num !== 0 && <View></View>

```

## Taro.createSelectorQuery使用
```javascript
// old
const query = Taro.createSelectorQuery().in(scope)

// new 
const query = Taro.createSelectorQuery()

```

## 页面获取传入参数
```javascript
// old
const params = this.$router.params

// new
const params = Taro.getCurrentInstance().router.params
```

## boolean值的返回
* 请确保 `&&` 两侧的值都是`boolean`值，否则会报一个错误信息：`Cannot read property '__wxElement' of null`

## 页面中使用`fragments`导致元素不可见
* 使用`Block`标签代替
```jsx
// old 
  <fragments> <View>xxx</View></fragments>
    
// new
  <Block> <View></View></Block>
```

## 页面跳转参数不会自动decode 
* 需要自己手动对全部参数`decode`或者按需对`encode`会发生变化的参数`decode`
* 为了方便，进行全局封装，使用`util`中的`decodeObject`方法

```javascript
 this.$instance.router.params  // 获取带过来的参数时 taro2原生页面跳转会自动decode 但是taro3不会
```


## 获取页面节点
* [https://taro-docs.jd.com/taro/blog/2020-09-01-taro-versions#%E5%A6%82%E4%BD%95%E8%8E%B7%E5%8F%96%E9%A1%B5%E9%9D%A2%E8%8A%82%E7%82%B9%E4%BF%A1%E6%81%AF](https://taro-docs.jd.com/taro/blog/2020-09-01-taro-versions#%E5%A6%82%E4%BD%95%E8%8E%B7%E5%8F%96%E9%A1%B5%E9%9D%A2%E8%8A%82%E7%82%B9%E4%BF%A1%E6%81%AF)
* [https://taro-docs.jd.com/taro/docs/react-page#%E5%AD%90%E7%BB%84%E4%BB%B6%E7%9A%84-onready](https://taro-docs.jd.com/taro/docs/react-page#%E5%AD%90%E7%BB%84%E4%BB%B6%E7%9A%84-onready)
* ![image1.png](https://static.aistarfish.com/front-release/file/F2023090415561415900003895.image.png)
* ![image2.png](https://static.aistarfish.com/front-release/file/F2023090415561418600005666.2.png)
* 如果发现获取不到组件 尝试用`nextTick`包裹
* `层级太深` 也会影响组件的获取。因为超过`16层级`变自定义组件的问题 这时需要用到后代选择器` >>> `父选择器拿非自定义组件

## Taro2样式隔离
* Taro3中没有自定义组件 所以样式不隔离了,得采用`BEM`写法或使用`CSS Module`

## id、className属性传递变化
* 因为taro3中没有自定义控件了(除非层级过深 或手动指定)，因此给组件设置的id、className不会展示在dom上，需要透传到内部的真实dom上
* ![image3.png](https://static.aistarfish.com/front-release/file/F2023090415590432100001621.image3.png)

## 获取路由参数
* 跳转成功后，在目标页面的**生命周期**方法中，可以通过 `Taro.getCurrentInstance().router.params` 获取路由参数
* ![image4.png](https://static.aistarfish.com/front-release/file/F2023090415590435400005441.image4.png)
* 按照官方文档，在页面开头去$instance =getCurrentInstance()，页面跳转的时候若会执行router.params,就会报错
* ![image5.png](https://static.aistarfish.com/front-release/file/F2023090415590440300000420.image5.png)
* 解决方案： 在页面一开始的时候，就去处router.params的值作为一个变量，`routerParams = getCurrentInstance().router.params`
* ![image7.png](https://static.aistarfish.com/front-release/file/F2023090416043108000000766.image7.png)
* ![image6.png](https://static.aistarfish.com/front-release/file/F2023090415590432600006696.image6.png)
* ![image8.png](https://static.aistarfish.com/front-release/file/F2023090416043107900006953.image8.png)

hooks组件中可以换成useRouter [https://taro-docs.jd.com/docs/hooks#userouter](https://taro-docs.jd.com/docs/hooks#userouter)


## 判空写法
* 在Taro3中，可以使用`?.`的形式语法糖，进行判空取值

## 在Taro3中，ScrollView横向滚动时，会出现滚动条且不会隐藏， 可通过设置css隐藏
```javascript
::-webkit-scrollbar {
  display: none; //设置隐藏
  width: 0 !important; //设置大小
  height: 0 !important; //设置大小
  -webkit-appearance: none;
  background: transparent;
}
```

## 在Taro3中频繁`setState`会造成页面卡顿可以尝试解决
* [https://taro-docs.jd.com/taro/docs/optimized#2-customwrapper-%E7%BB%84%E4%BB%B6](https://taro-docs.jd.com/taro/docs/optimized#2-customwrapper-%E7%BB%84%E4%BB%B6)  

## button onclick  this指向的问题
* `handleBack this`指向了`button`而不是页面，导致报错。所以这里取参数会报错，所以`handleBack`得用箭头函数
* ![image9.png](https://static.aistarfish.com/front-release/file/F2023090416085182700001175.image9.png)
* ![image10.png](https://static.aistarfish.com/front-release/file/F2023090416085186200001884.image10.png)

## Taro3 相对比taro2获取小程序启动参数少了`.params`
* Taro3:
* ![image11.png](https://static.aistarfish.com/front-release/file/F2023090416085182600009258.image11.png)
* Taro2:
* ![image12.png](https://static.aistarfish.com/front-release/file/F2023090416085175600001450.image12.png)

## 埋点sdk使用方式修改
* ![image13.png](https://static.aistarfish.com/front-release/file/F2023090416085182700001175.image9.png)
* 1.`scope`使用`Taro.getCurrentInstance().page`。
* 2.`element`中，若页面使用了`cssModule`，需要改成`cssModule`格式。
* 3.`root`使用的`id、className`，确定在`dom`中存在。因为Taro3中没有自定义控件了，因此给组件设置的`id、className`不会展示在`dom`上，需要透传到内部的`View`上