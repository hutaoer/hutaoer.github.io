---
sidebar: auto
category: 编码
date: 2024-05-29
tags:
  - Promise
---

# Promise 加锁

- demo 代码实现了在 3 秒钟后，执行某一段逻辑。也可以理解为，一定要在一个异步操作完成，再执行的动作，相当于一个锁。
- 必须在异步操作完成后，再执行其他的逻辑。

```js
let tmp;
export const afterLockPromise = new Promise((resolve, reject) => {
  tmp = resolve;
});
afterLockPromise.then((s) => {
  console.log("execute after lock promise", s);
});
const lockPromise = new Promise((resolve) => {
  setTimeout(() => {
    resolve(333);
  }, 3000);
});
// 关键代码，在p1的then代码执行后，p的then才会执行。p可以在其他文件中进行引入。
lockPromise.then(tmp);
```
