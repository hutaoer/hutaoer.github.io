---
sidebar: auto
---

# 小程序录音功能实践

## 一、功能描述
- 在小程序的聊天对话页面实现类似微信发送语音消息的功能
![1.png](https://static.aistarfish.com/front-release/file/F2023090415210361000002418.2.png)

## 二、技术点与实现思路

#### 1、小程序并没有提供直接发送语音的API,但是提供了录音API [wx.getRecorderManager()](https://developers.weixin.qq.com/miniprogram/dev/api/media/recorder/wx.getRecorderManager.html),所以我们可以借助这个API实现语音消息功能

- 开始录音   [RecorderManager.start(Object object)](https://developers.weixin.qq.com/miniprogram/dev/api/media/recorder/RecorderManager.start.html)
- 监听录音开始的回调  [RecorderManager.onStart(function callback)](https://developers.weixin.qq.com/miniprogram/dev/api/media/recorder/RecorderManager.onStart.html)
- 结束录音  [recorderManager.stop()](https://developers.weixin.qq.com/miniprogram/dev/api/media/recorder/RecorderManager.stop.html)
- 监听录音结束的回调  [RecorderManager.onStop(function callback)](https://developers.weixin.qq.com/miniprogram/dev/api/media/recorder/RecorderManager.onStop.html)
- 录音出错的统一处理  [RecorderManager.onError(function callback)](https://developers.weixin.qq.com/miniprogram/dev/api/media/recorder/RecorderManager.onError.html)

#### 2、手势操作
[事件API合集](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/event.html#%E4%BA%8B%E4%BB%B6%E8%AF%A6%E8%A7%A3)

- 点击---->tap
   - 点击而非长按时，应该仅做权限判断
- 长按---->longpress、touchstart
   - 标识手指正在长按
   - 手指按下时，需要记录按下的时间，结合手指松开的时间，计算出长按时长
   - 录音权限判断
      - 有权限时，创建并开始录音
      - 没有权限时，引导用户开始录音权限
- 松开----->touchend
   - 标识手指结束长按
   - 记录手指松开时的时间，并判断若小于1s，提示录音时间太短
   - 由于微信录音开始的API是一个异步回调，所以在手指松开时，可能录音还未开启，所以这里需要判断是否已经开启了录音，只有当录音开启才应该在手指松开时，调用结束录音API
- 移动----->touchmove
   - 产品需求中要求，手指移动到特定区域，可取消发送，所以需要监听手指移动的位置，判断当前位置是发送区域还是取消区域

#### 3、本地录音文件上传

- [wx.uploadFile](https://developers.weixin.qq.com/miniprogram/dev/api/network/upload/wx.uploadFile.html)
- 在手指松开并且正常调用了结束录音API后，监听录音结束的回调
  - 在这个回调事件中，我们可以拿到路由文件的本地资源地址及录音时长信息
  - 调用微信提供的`uploadFile`方法，将本地文件上传到我们自己的服务器上，并调用发送语音接口
  - 将前面几步设置的各种status状态重置，结束整个流程

#### 4、麦克风权限验证与获取--->scope.record

- [wx.getSetting](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/setting/wx.getSetting.html)
- [wx.authorize](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/authorize/wx.authorize.html)


## 三、具体代码实现（Taro代码）

#### 1、使用自定义Hooks创建录音管理器，便于维护与复用
```javascript
/**
 * 微信录音
 */
import Taro, { showToast } from '@tarojs/taro'

const defOptions = {
  duration: 60000, // 录音的时长，单位 ms
  sampleRate: 44100, // 采样率
  numberOfChannels: 1, // 录音通道数
  encodeBitRate: 192000, // 编码码率
  format: 'mp3', // 音频格式
}

const useReCordManager = (options = defOptions) => {
  // 获取**全局唯一**的语音识别管理器**RecorderManager**
  const recorderManager = Taro.getRecorderManager()

  /** 开始录音 */
  const onManagerStart = () => new Promise((resolve) => {
    recorderManager.start(options)
    /** 开始录音回调 */
    recorderManager.onStart(() => {
      resolve(true)
    })
  })
  /** 结束录音 */
  const onManagerStop = () => new Promise((resolve) => {
    recorderManager.stop()
    /** 结束录音回调 */
    recorderManager.onStop((res) => {
      resolve(res)
    })
  })

  /** 录音出错 */
  recorderManager.onError(() => {
    showToast('出错啦~ 请重新发送')
  })

  return {
    onManagerStart,
    onManagerStop,
    recorderManager,
  }
}

export default useReCordManager
```

#### 2、录音组件开发
```javascript
// --------------省略部分非关键代码、utils函数、html元素---------------

const SoundsComp = (props) => {
  const { onManagerStart, onManagerStop, recorderManager } = useReCordManager() // 录音管理器
  const [incancel, setIncancel] = useState(false) // 是否处于取消区域
  const [recordStart, setRecordStart] = useState(false) // 是否开始录音
  const [showToast, setShowToast] = useState(false)
  let isTouching = false // 是否长按中
  let touchStartTime = 0
  let touchEndTime = 0

  /** 单击， 只检查是否有录音权限 */
  const _onClick = () => {
    Taro.getSetting({
      success: function(res) {
        if (!res.authSetting[ 'scope.record' ]) {
          authorizeFunc('scope.record')
        }
      },
    })
  }

  /** 长按 */
  const _onLongPress = () => {
    setIncancel(false)
    setRecordStart(false)
    isTouching = true // 标识手指正在长按
    Taro.getSetting({
      success: res => {
        if (!res.authSetting[ 'scope.record' ]) {
          authorizeFunc('scope.record')
        } else { // 开始录音
          onManagerStart().then(() => {
            if (!isTouching) { // 如果录音异步回调开始，手指已经离开长按，则取消录音
              onManagerStop()
            } else {
              setRecordStart(true)
            }
          })
        }
      },
    })
  }

  /** 手指按下 */
  const _onTouchStart = (e) => {
    touchStartTime = e.timeStamp
  }
  /** 手指松开 */
  const _onTouchEnd = (e) => {
    touchEndTime = e.timeStamp
    if ((touchEndTime - touchStartTime < 1000)) {
      isTouching = false
      setShowToast(true) // 录音时间小于1s提示
    } else if (recordStart) {
      setRecordStart(false)
      onManagerStop()
    } else { // 录音未开始，手指已离开
      isTouching = false
    }
  }

  /** 结束录音回调-发送语音 */
  recorderManager.onStop((res) => {
    setRecordStart(false)
    isTouching = false
    if (incancel) return false
    const { tempFilePath, duration } = res

    if (duration < 1000) {
      setShowToast(true)
    } else {
      // ---- 以下省略上传语音、发送语音、更新消息接口代码 ------
      // ....
    }
  })

  /** 手指移动 */
  const _onTouchMove = (e) => {
    const { windowHeight } = Taro.getSystemInfoSync()

    const touch = e.changedTouches[ 0 ] // 手指位置
    const pageyRatio = parseInt(touch.pageY / windowHeight * 100) // 手指所在屏幕百分比

    setIncancel(() => pageyRatio < 88) // 当前位置小于88/100， 代表手指处于取消区域
  }

  return (
    <View className="sounds-comp-container">
      <View
        className="sounds_text"
        onClick={ _onClick }
        onLongPress={ _onLongPress }
        onTouchStart={ _onTouchStart }
        onTouchEnd={ _onTouchEnd }
        onTouchMove={ _onTouchMove }
      >按住 说话</View>
			{/* --------- UI代码省略 -------------- */}
    </View>
  )
}

export default SoundsComp
```

## 四、问题及解决方案

#### 1、录音开始与结束的异步问题

- 由于微信录音API开始与结束事件，是异步通知的，所以在长按调用开始录音后，如果马上松开长按，录音可能还未开始，这时无法监听到录音结束，而页面交互上却是一旦开始录音会有正在录音的样式，但因为无法监听到录音结束，所以页面会卡在录音中无法退出
  - 解决方法：是将`start()`和`onStart()`两个方法使用Promise结合起来绑定为`onManagerStart`，只有`onStart()`成功后`resolve`，才算真正录音开始
- 结束录音同理

#### 2、录音达到60s最大时长的时候，自动触发了onStop()，而手指还没有松开导致的问题

- 由于设置了最大录音时长60s，达到60s时会自动触发录音结束回调，而我们的`onStop`是在手指松开时调用结束录音事件时注册监听的，所以未处理自动触发的结束回调，手指也未松开。当手指松开时，录音其实已经结束了，因为此时无法监听到录音结束，所以页面也会卡在录音中无法退出。
   - 解决方法：是使用全局`recorderManager.onStop`方法监听所有的结束回调，不在`onManagerStop`中监听结束录音，这样无论是主动的手指松开结束录音还是自动触发的结束录音，都能统一接收处理。

#### 3、苹果手机获取到的录音时长非整数问题

- 测试过程中发现在苹果手机中获取到的录音文件，时长是个非整数，例如2331.231323，前端将这个时长传给后端，但是后端接口只接收整数时长，导致接口报错
   - 解决方法：将时长取整，舍去小数部分

#### 4、部分安卓手机在达到最大时长自动结束录音时，回调的时长不足最大时长问题

- 测试过程中发现在**部分安卓手机**中，达到最大时长自动结束录音时，回调的时长不足最大时长，例如设置的最大时长`60000ms`，但是自动结束时回调的时长只有`59960ms`，导致后端接收到此值后向下取整为`59s`，不符合预期。
  - 解决方法有两种：
    - 前端做四舍五入：`const _duration = (parseInt(duration)/1000).toFixed(0)*1000`
    - 多设置`500ms`：由于后端是向下取整，所以只要多设置  `100ms < n < 1000ms`, 那么发送给后端的时长大约为`60500ms`左右，后端向下取整为60s， 符合预期

## 五、待优化

- 交互优化
- `useReCordManager`目前功能并不健壮
- 异步问题导致的开始录音略有延迟
- 异常情况的容错处理