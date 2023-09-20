---
sidebar: auto
category: 编码
date: 2020-01-02
tags:
  - leecode
---

# 求数组交集

## 题目描述
* 给定两个数组 nums1 和 nums2 ，返回 它们的交集 。输出结果中的每个元素一定是 唯一 的。我们可以 不考虑输出结果的顺序 。

## 思路
* 注意，这里要求返回值是唯一的。需要排除掉重复元素的场景。且无需考虑返回结果的顺序。
* 使用 `Set`来去重。
* 可以先对两个数组做一次预处理，过滤掉重复的元素。 

## 编码
```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function(nums1, nums2) {
  var result = []
  var set1 = new Set(nums1)
  var tmp2 = Array.from(new Set(nums2))
  for(var item of tmp2) {
    if(set1.has(item)) {
      result.push(item)
    }
  }
  return result
};

var intersectionV2 = function(nums1, nums2) {
  const set1 = new Set(nums1)
  return [...new Set(nums2)].filter(x => set1.has(x))
};
```