---
sidebar: auto
category: 学习笔记
tags:
  - JavsScript
---

# JavaScript 学习笔记

## 函数

### arguments
* `arguments` 对象是所有函数中都可用的局部变量，除头函数外。
* `arguments` 是类数组对象，除了length和索引外，没有其他的数组属性，也不能调用数组的方法。
* `arguments` 可以被遍历。
* `arguments` 转数组的方法：
```js
var args = Array.prototype.slice.call(arguments)
var args = [].slice.call(arguments)
const args = Array.from(arguments)
const args = [...arguments]
const args = Array.apply(null, arguments)
```

### Function.length
* 指的是形参的个数。
* 形参的数量不包括剩余参数个数，仅包括第一个具有默认值之前的参数个数。
* Function 构造器本身也是个Function。他的 length 属性值为 1 。

### 函数的 prototype
* 函数的原型对象包含了`constructor`属性和`__proto__`属性
* 通过构造函数创建的对象的`__proto__`指向其构造函数的原型对象

### 注意
* 箭头函数不存在 `arguments` 对象。
* `apply`调用的时候，参数上线是 65536 个。

## 语法

### 展开语法
* 调用函数、数组构造、字面量构造的时候，将数组表达式展开，将对象表达式按照 `key-value` 方式展开。
* 函数声明：`const params = [1,2]; myFn(a,b) {console.log(a,b)}; myFn(...params)`
* 构造数组：`const a = [1]; const b = [...a]`;
* 构造字面量：`const o = {n: 123}; const d = {...o}`

### 剩余语法
* 剩余参数用于解构数组和对象。从某种意义上说，剩余语法与展开语法是相反的：展开语法将数组展开为其中的各个元素，而剩余语法则是将多个元素收集起来并“凝聚”为单个元素。
* 与 `arguments` 对象区别：
  - 剩余参数只包含那些没有对应形参的实参，而 `arguments` 对象包含了传给函数的 **所有实参**
  - `arguments`对象不是一个真正的数组，而剩余参数是真正的 `Array`实例
  - `arguments`对象还有一些附加的属性 （如`callee`属性）。

## 数组

### 数组的存储
* 两种方式：一快一慢。
* `Fast`：快速的存储结构是 `FixedArray` ，并且数组长度 `<= elements.length()` ；快速的根据索
引来直接定位， push 和 pop 操作会对数组进行动态的扩容和缩容。快数组以空间换时间，申请了连续内存，提高效率，但是比较占内存。
* `Slow`：慢速的基于 `Hash` 表来实现。慢数组以时间换空间，不需要申请连续的空间，节省了内存，但是效率较低。

### splice
* `splice(index, count, insertElemnt, ...)`
* splice 方法接收的第一个参数，表示想要删除或插入的元素的索引值。第二个参数是删除元素的个数（不删除元素，则传入 0）。第三个参数往后，就是要
添加到数组里的值。

### toString / valueOf
* 将数组的元素，作为字符串返回。`[1,2].toString() // "1,2"`
* 注意：`valueOf` 返回的值，还是数组 `[1,2].valueOf() // [1,2]`

### reduce
* reduce 方法接收一个有如下四个参数的函数：`previousValue、currentValue、index 和 array`。因为 index 和 array 是可选的参数，所以如果用不到它们
的话，可以不传。
* reducer 函数接收4个参数:
  - `Accumulator (acc) (累计器)`
  - `Current Value (cur) (当前值)`
  - `Current Index (idx) (当前索引)`: 数组中正在处理的当前元素的索引。 如果提供了initialValue，则起始索引号为0，否则从索引1起始。
  - `Source Array (src) (源数组)`
* `reduce(reducer, initialValue)`
  - 如果提供了 `initialValue`，那么accumulator 初始值为 initialValue，currentValue取数组中的第一个值，idx 从 0 开始。
  - 如果没有提供 `initialValue`，那么accumulator取数组中的第一个值，currentValue取数组中的第二个值。idx 从 1 开始。

## {}, Object.create(null)

## textContent
* `textContent` 可以防止 XSS 攻击。
* `textContent` 相比较`innerHTML`通常具有更好的性能，因为文本不会被解析为HTML。

## 位运算
* 有符号整数使用 31 位表示整数的数值，用第 32 位表示整数的符号，0 表示正数，1 表示负数。数值范围从 -2147483648 到 2147483647。从第 1 位（位 0）开始。
* ECMAScript 并不以二进制补码的形式显示，而是用数字绝对值的标准二进制代码前面加负号的形式输出。
* 记住，在处理有符号整数时，开发者不能访问 31 位。

### 负数存储
* 负数也存储为二进制代码，不过采用的形式是二进制补码。
* 补码的计算步骤：
  - 确定该数字的非负版本的二进制表示（例如，要计算 -18的二进制补码，首先要确定 18 的二进制表示）
  - 求得二进制反码，即要把 0 替换为 1，把 1 替换为 0
  - 在二进制反码上加 1

## enumerable
* 可枚举性（enumerable）用来控制所描述的属性，是否将被包括在`for...in`循环之中。具体来说，如果一个属性的`enumerable`为`false`，下面三个操作不会取到该属性。
  - `for ... in`
  - `Object.keys`
  - `JSON.stringify`
* `for...in`循环和`Object.keys`方法的区别，在于前者包括对象继承自原型对象的属性，而后者只包括对象本身的属性。如果需要获取对象自身的所有属性，不管`enumerable`的值，可以使用`Object.getOwnPropertyNames`方法。

## 常用API

### 十进制、二进制转换
* 十进制转二进制：`num.toString(2)`
* 二进制转十进制：`parseInt(num, 2)`


