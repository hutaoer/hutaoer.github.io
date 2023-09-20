---
sidebar: auto
category: 编码
date: 2020-01-01
tags:
  - leecode
---

# 判断是否存在重复元素

## 题目描述
* 给你一个整数数组 nums 。如果任一值在数组中出现 至少两次 ，返回 true ；如果数组中每个元素互不相同，返回 false 。

## 思路
* 使用`Set`或`Map`，或其他对象来存储变量。
* 循环数组元素，如果判断不包含该元素，则把元素加入。否则，返回true

## 编码
```js
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function(nums) {
  var set = new Set()
  for(var item of nums) {
    if(set.has(item)) return true
    set.add(item)
  }
  return false
};
```