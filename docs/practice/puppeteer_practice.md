---
sidebar: auto
---

# puppeteer 实践

## 开发注意事项

### 区分系统
* windows 下面的，应用路径: `C:\\Users\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe`
* macOS 下面，比如：`/Applications/Google Chrome.app`，你以为是这个路径吗？其实不对哦，下面会讲到。

#### 提示错误
* 信息如下：`Failed to launch the browser process! spawn /Applications/Google Chrome.app EACCES`
* 需要把`Chrome`所在目录进行修改下，以`macOS`为例：
  - `/Applications/Google Chrome.app` 修改为 `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`
* 因为`/Applications/Google Chrome.app`是系统里面的应用目录，而通过`puppeteer`来启动的时候，需要指定的是`chrome`浏览器的可执行文件路径。
* 通过在`chrome`浏览器中输入`chrome://version/`，查看 **可执行文件路径** 后面的路径即可。


## 反爬虫设置
* 很多网页有反爬虫的机制，会针对无头浏览器做限制处理，我们就需要绕过这些限制。

### 干掉 `webdriver`
```js
await page.evaluateOnNewDocument(() => {
    const newProto = navigator.__proto__;
    delete newProto.webdriver;
    navigator.__proto__ = newProto;
  });

```

### chrome属性检测
* 在无头浏览器模式下,全局对象下的`chrome`对象是没有 `runtime`属性的，可以给补全下字段。
```js
await page.evaluateOnNewDocument(() => {
    window.chrome = {};
    window.chrome.app = {
        InstallState: 'hehe',
        RunningState: 'haha',
        getDetails: 'xixi',
        getIsInstalled: 'ohno',
    };
    window.chrome.csi = function () {};
    window.chrome.loadTimes = function () {};
    window.chrome.runtime = function () {};
});

```

### 覆盖 headless
* 由于无头浏览器中，`userAgent`在无头模式下有`headless`字样，需要做覆盖。
```js
// userAgent设置
await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, 'userAgent', {
        get: () =>
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36',
    });
});
```