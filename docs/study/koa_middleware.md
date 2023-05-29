---
sidebar: auto
category: 学习笔记
tags:
  - middleware
  - 中间件
---

# koa 中间件学习笔记

## 概念
* 中间件英语：Middleware），又译中间件、中介层，是一类提供系统软件和应用软件之间连接、便于软件各部件之间的沟通的软件，应用软件可以借助中间件在不同的技术架构之间共享信息与资源。中间件位于客户机服务器的操作系统之上，管理着计算资源和网络通信。（摘自维基百科）
* 它是非业务的技术类组件。
* `koa`和`express`中，`HTTP`请求都是在中间件内部完成。
*  `Express` 中间件链是基于回调的，而 `Koa` 是基于 `Promise` 的。


## koa vs express

### express demo
```js
const express = require('express')
const app = express()
app.use((req, res, next) => {
	res.status(200)
	// 调用下一个中间件
	next()
})

app.use((req, res) => {
	res.send('middleware 2')
})

app.listen(3001)

```

### koa demo
```js

const koa = require("koa");
const app = new koa();

// 定义三个中间件

// middleware1
app.use(async (ctx, next) => {
	console.log('middleware1 start')
	await next()
	console.log('middleware1 end')
})

// middleware2
app.use(async (ctx, next) => {
	ctx.status = 201
	console.log('middleware2 start')
	await next()
	console.log('middleware2 end')
})

// middleware3
app.use(async (ctx) => {
	console.log('middleware3 start')
	ctx.body = 'hello koa'
	console.log('middleware3 end')
})

app.listen(8888, () => {console.log('koa start')});

```

## koa 中间件原理
* `koa` 把多个 `async` 函数组成一个处理链，每个 `async` 函数可以实现特定的功能，然后用 `await next()` 来调用下一个 `async` 函数。我们把每个 `async` 函数称为 `middleware`，也就是中间件。
* 中间件之间通过 `next` 函数联系，当一个中间件调用 `next()` 后，会将控制权交给下一个中间件，直到下一个中间件不再执行 `next()` 时沿原路返回，依次将控制权交给上一个中间件。
* 中间件函数支持两个参数，参数 `ctx` 是由 koa 传入的封装了 `request` 和 `response` 变量，`next` 是 `koa` 传入的将要处理的下一个异步函数。 
* `koa`通过中间件的方式，实现了对`request`和`response`的管道式处理。

## koa 中间件源码理解
* 通过`use`将中间件按照顺序`push`到数组中，返回`this`，便于链式调用。
* 通过`listen`，创建`server`实例，并监听端口号。
* 创建`server`的时候，传入`this.callback()`
```js

use(fn) {
  // 省略部分代码...
  this.middleware.push(fn);
  return this;
}

listen(...args) {
  const server = http.createServer(this.callback());
  return server.listen(...args);
}

callback() {
  // compose 为中间件运行的核心
  const fn = compose(this.middleware);

  // handleRequest 就是 callback 函数返回的函数
  const handleRequest = (req, res) => {
    const ctx = this.createContext(req, res);
    return this.handleRequest(ctx, fn);
  };
  return handleRequest;
}

```

### compose
* `callback`里面，`const fn = compose(this.middleware)`，`compose` 这个方法，代码量不多，但设计的很精妙。
* [koa-compose 源码地址](https://github.com/koajs/compose/blob/master/index.js)
* `compose`首先对`middleware`做了校验。
* 执行`compose`方法后，第一次`i = 0`，会立即执行`dispatch[i]`，取出对应的中间件`fn = middleware[i]`，返回一个`Promise`，这个`Promise`会把中间件函数`fn`进行包裹，并传入`context` 和后面的`middleware[i + 1]`。
* 
```js

function compose (middleware) {
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
  }

  return function (context, next) {
    // last called middleware #
    let index = -1
    return dispatch(0)
    function dispatch (i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      let fn = middleware[i]
      if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve()
      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)))
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}
```

### handleRequest
* 客户端每次请求时，都会调用 `RequestListener` 请求侦听器函数，并创建请求响应上下文对象后传递 `ctx`  和 `fn`  到 `handleRequest` 函数处理。
```js
handleRequest(ctx, fn) {
  // 省略无关代码...
  const onerror = err => ctx.onerror(err);
  const handleResponse = () => respond(ctx);
  // 省略无关代码...
  return fn(ctx).then(handleResponse).catch(onerror);
}
```
* 这里的`fn`相当于如下代码：
```js
const fn = function (context, next) {
    // last called middleware #
    let index = -1
    return dispatch(0)
    function dispatch (i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      let fn = middleware[i]
      if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve()
      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)))
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
```

### 中间件执行过程
* 执行第一个中间件函数: `dispatch(0)`，将 `ctx`和 `dispatch.bind(null, i+1)`作为参数传递给中间件函数。
* 以最开始的`demo`为例。
* 首先执行 `console.log('middleware1 start')` 然后执行 `await next()` 将当前中间件函数的执行权转交给 `next`（即： `dispatch(1)` ）执行。
* 则继续取出第二个中间件函数执行，`console.log('middleware2 start')`，然后执行`await next()`, 如此类推。
* 直到所有中间件都执行完毕。
* 如果某个中间件执行过程中，出现错误，则会抛出异常，执行`Promise.reject(err)`，然后由外部的`onerror`进行错误处理，如果一切正常，最终会调用`handleResponse`处理。

## 常用中间件
* `koa-bodyparser`: 对于POST请求的处理，该中间件可以把`koa`上下文的`formData`数据解析后，放到`ctx.request.body`中，如果没有数据，则为`{}`
* `koa-static`: 加载静态资源
* `koa-convert`: 将使用`generate`的中间件转成基于`Promise`的中间件。
* `koa-session`: 保持会话状态。
* `koa-views`: 支持ejs, nunjucks等众多模板引擎。
* `koa-mount`: 将中间件或者应用挂载到某个特定的路径。
* `koa-send`: 方便直接访问静态文件，和下载文件。 
* `koa2-cors`: 配置跨域功能。

### koa-router
* `koa-router`: 处理路由
* 使用中间件：` app.use(router.routes()).use(router.allowedMethods())`

#### 处理 get
```js
router.get('/',async (ctx)=>{
    ctx.body="首页";
})
```

#### 处理 post
```js
router.post('/postRoute', async (ctx, next) => {
  const rb = ctx.request.body
  console.log(rb);
  ctx.response.body = 'success'
})
```

#### 动态路由
```js
//请求方式 http://域名/user/123
router.get('/user/:uid',async (ctx)=>{
    console.log(ctx.params); //{ uid: '123' } //获取动态路由的数据
    ctx.body='这是用户详情页';
});

```

## 总结
* 中间件函数中的`next`是调用内部的`dispatch(i)`函数。
* 中间件的执行顺序，跟`use`的顺序保持一致。











