---
sidebar: auto
---

# 节流函数

## 概念
* 对于高频的操作，使其有规律的在固定时间执行一次。

## 编码
```js
function throttle(fn, delay) {
    let start = +Date.now()
    let timer = null
    return function(...args) {
        const now = +Date.now()
        if (now - start >= delay) {
            clearTimeout(timer)
            timer = null
            fn.apply(this, args)
            start = now
        } else if (!timer){
            timer = setTimeout(() => {
                fn.apply(this, args)
            }, delay)
        }
    }
}

```