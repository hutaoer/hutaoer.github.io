---
sidebar: auto
---

# App & Hybrid 常见问题

## 路由统一

- 客户端、H5 需要维护一个统一的路由表，每个路由都是唯一的，不能重复。命名上，最好要清晰，不要让人容易混淆。
- 长链和短链的问题，多端框架里面，H5 能支持长链和短链，那么路由请务必使用长链。
- 一旦路由约定后，尽量不要修改，否则会引发各种问题。

### 路由修改的问题

- 一般来讲，native 会硬编码一份路由表，如果路由需要修改，那么会给 native 带来版本兼容问题。
- 路由修改后，还可能涉及到的服务端还要修改，某些场景下，链接是由服务端返回的。
- 如果要修改三端路由，那么对应业务的的 native，H5，服务端都需要做回归，并考虑兼容性问题。

### 路由有几种场景：

#### native 特有页面

- 仅 native 实现，H5 端未实现。
- H5 通过桥接方式可跳转

#### H5 特有页面

- 仅 H5 实现，客户端未实现。
- 可能是内嵌在 App 内，也可能仅 H5 端使用。

#### native 和 H5 都有的页面

- 比如在浏览器中打开某个 H5 页面的时候，可以通过唤起 App，打开 App 内的同一个页面。原生的体验一般比 H5 要好，可以给用户带来更好的体验。
- 某些场景，native 和 H5 的跳转链接都是通过服务端返回的，native 和 H5 都需要通过这个个 Url 来跳转，那么这个 Url 需要是 native 和 H5 都实现的页面，且是同一个路由，这样 native 和 H5 跳转都没有问题。

### 第三方链接

- 维护一份域名白名单，仅支持白名单内的 Url 可以跳转。
- 注意第三方链接的安全问题。

### 不存在的路由

- native，H5 端最好做统一的处理，比如跳转到一个 404 页面

## 实现逻辑一致性

- native，H5 的业务实现逻辑保持一致，比如：文案、颜色、交互、小数点位数、判断规则等。
- 比如一个动态热区，是否有边距，是否有 padding，图片是宽度自适应，还是高度自适应，2X 图 还是 3 倍图，需要提前约定好。这样，在运营配置的时候，仅需要配置一张图就可以了。
- 比较复杂的逻辑，最好是在评审的时候写进文档中，比如下单时候，优惠券的选择，弹窗数据是否需要缓存，还是每次重新请求。

## 发版回归

- 重要链路，每次发版都需要做回归。
- 【native | H5】拿电商项目为例，包括：登录、首页、搜索、直播、商品详情、分享功能、下单、付款、个人页。
- 【native】验证 VersionCode，VersionName，Build，三方依赖包检查是否更新
- 【iOS】官网的 json 文件依赖，不能随意改动，可能导致分享失败（某次官网改版后，误删了 json 配置文件，导致 iOS 功能异常）。

## 常见兼容性问题

### 1px


### ios 下初始化日期对象
* `new Date('1999-01-01')`这种格式不支持，需要替换为`new Date('1999/01/01')`


### 点击穿透

### 300ms延迟
* 判断用户是双击还是单击，就设置了一个时间段300ms，用户单击后300ms后做事件处理，如果在300ms内连续点击，就判断为双击，做双击处理事件。
所以现在用click绑定事件呢，就会有300ms延迟的问题。
* 




