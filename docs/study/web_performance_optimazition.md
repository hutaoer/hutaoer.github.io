---
sidebar: auto
---

# web性能优化

## prefetch / preload

### prefetch
* 提示浏览器提前加载链接的资源，因为它未来可能会被用户请求。浏览器就会在闲时去加载对应的资源。
* 当资源真正被使用的时候立即执行，就无需等待网络的消耗。
* IE11以下版本不支持，Safari 也不支持，支持覆盖率：80.21%，参见：https://caniuse.com/?search=prefetch

### preload
* 一种预加载的方式，向浏览器声明一个需要提交加载的资源，当资源真正被使用的时候立即执行，就无需等待网络的消耗。
* 除IE外，大部分浏览器都支持。覆盖率：93.37%。参见：https://caniuse.com/?search=preload
* preload 的支持度更好些。

### 注意
* preload / prefetch 的资源被获取后，被放在内存缓存中。如果资源位存在有效的缓存极致（如 cache-control 或 max-age），它将被存储在 HTTP 缓存中可以被不同页面所使用。
* 正常情况下，不会儿进行二次下载。对于 preload 来说，一旦页面关闭了，它就会立即停止 preload 获取资源，而对于 prefetch 资源，即使页面关闭，prefetch 发起的请求仍会进行不会中断。
* 对一个资源同时使用了 preload 和 prefetch ，会造成二次下载。
* preload 字体不带 crossorigin 也将会二次获取！ 确保你对 preload 的字体添加 crossorigin 属性。

### 使用场景
* preload 是告诉浏览器页面必定需要的资源，浏览器一定会加载这些资源，而 prefetch 是告诉浏览器页面可能需要的资源，浏览器不一定会加载这些资源。所以建议：对于当前页面很有必要的资源使用 preload，对于可能在将来的页面中使用的资源使用 prefetch。
* 使用 preload，提前加载字体文件，避免页面闪动。
* 页面加载完成后，分析页面上可能的二级跳转，并使用 prefetch 预加载。

## defer / async
* 在浏览器加载HTML过程中，HTML 解析器运行于主线程之中，并且在遇到 `</script>` 标签后会被阻塞，直到脚本从网络中被获取和执行。也就是说`<script>`标签中的脚本会阻塞浏览器的渲染，这样也被称为“渲染阻塞”。
* 内联脚本的解析和求值（Execute）也是HTML解析过程的一部分.
* 使用 async/defer 属性在加载脚本的时候不阻塞 HTML 的解析，defer 加载脚本执行会在所有元素解析完成，DOMContentLoaded 事件触发之前完成执行。它的用途其实跟 preload 十分相似。你可以使用 defer 加载脚本在 head 末尾，这比将脚本放在 body 底部效果来的更好。
* defer 只能用于脚本资源，而且会执行。

### async
* `async`属性告诉浏览器先把文件下载下来，在适当的时候再执行。异步脚本一定会在页面的`load`事件前执行，但可能会在`DOMContentLoaded`事件触发之前或之后执行。
* `async`的脚本并不保证按照指定他们的先后顺序执行。

### defer
* 该脚本将在文档完成解析后，触发 `DOMContentLoaded` 事件前执行。
* 仅对外联的脚本起作用。

### 总结
* `async`是在外部JS加载完成后，浏览器空闲时，`Load`事件触发前执行；而Defer是在JS加载完成后，整个文档解析完成后执行。
* Defer更像是将`<script>`标签放在`</body>`之后的效果，它是异步加载JS文件，所以可以节省时间。




