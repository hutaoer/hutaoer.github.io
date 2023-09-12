---
sidebar: auto
category: 编码
tags:
  - 代码片段
---

# 常用代码片段

## 正则
### 匹配一个带name属性的a标签
```js
const regex = /<a\s+name="([^"]+)"\s*>(.*?)<\/a>/ig
```