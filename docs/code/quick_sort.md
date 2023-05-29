---
sidebar: auto
---

# 快速排序

## 思路分析
* 使用分治思想，先选出一个节点，将数组一分为二。声明两个数组，将中间的元素作为基准，小于中间元素的，插入数组`left`，大于等于的插入数组`right`。
* 有三个需要注意的点：
  - 结束条件：当数组长度`<= 1`的时候，直接返回数组本身。
  - 需要将中间这个元素从原来的数组中取出来，使用`splice`将其从原数组删除，同时修改数组。如果不从原数组删除的话，会有种特殊情况，比如一边的数组为两个相同的元素，比较的时候就会产生死循环。
  - 递归调用

## 编码实现

```js
function qSort(arr) {
  if (arr.length <= 1) return arr
  const index = Math.floor(arr.length / 2)
  const midVal = arr.splice(index, 1)[0]
  const left = [],
    right = []
  arr.forEach(item => {
    if (item < midVal) left.push(item)
    else right.push(item)
  })
  return [...qSort(left), midVal, ...qSort(right)]
}
```