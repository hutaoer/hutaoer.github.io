---
sidebar: auto
category: 编码
tags:
  - leecode
---

## 思路
* 使用数组来模拟栈结构，使用 `pop`来出栈，`push`来入栈。
* 注意push的顺序。
* 注意返回结果类型是字符串。最后要对数据做join，才返回字符串。

## 实现

```js
var removeDuplicates = function(s) {
  let stack = []
  for(v of s) {
    let prev = stack.pop()
    if(prev !== v) {

      stack.push(prev)
      stack.push(v)
    }
  }
  return stack.join('')
}
```