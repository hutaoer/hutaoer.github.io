---
sidebar: auto
category: 学习笔记
tags:
  - ES6
  - Reflect
---

# Reflect 学习

## 概念
* `Reflect` 是一个内置的对象，它提供拦截 `JavaScript` 操作的方法，它的所有属性和方法都是静态的。
* 看完 `MDN` 的文档，发现 `Reflect`的这些`API`，都能找到可替代的方法。但`Reflect`有个更好的特性，就是可以通过`API`调用的返回值知道是否成功，且不会因为报错而中断正常的代码逻辑。
* `Reflect` 的中文意思是`反射`，通俗的讲，反射机制指的是程序在运行时能够获取自身的信息。

## 方法介绍

### apply
* 通过指定的参数列表发起对目标(target)函数的调用。
* 类似`Function.prototype.apply`
* 例子：`Reflect.apply(Math.floor, undefined, [1.75])`

### construct
* `Reflect.construct(target, argumentsList[, newTarget])`
* 对构造函数执行`new`操作。
```js
function OneClass() {
    this.name = 'one';
}

function OtherClass() {
    this.name = 'other';
}

var obj1 = Reflect.construct(OneClass, args, OtherClass);
obj1.name // ‘one’
obj1 instanceof OtherClass // true
obj1 instanceof OneClass // false
```

### defineProperty
* 与`Object.defineProperty`类似。设置后，会返回布尔值。
```js
let o = {}
Reflect.defineProperty(o, 'name', {value:'hutaoer'})
o.name // 'hutaoer'
```

### deleteProperty
* 相当于执行`delete target[name]`，用来删除对象的某个熟悉。返回一个布尔值，表明是否删除成功。
* 删除一个不存在的属性，也是返回`true`
```js
const o = {n: 123};
Reflect.deleteProperty(o, 'n'); // return true
```

### get
* `Reflect.get(target, propertyName[, receiver])`
* 类似`target[name]`，获取对象上某个属性。
* 注意：如果`target`对象中指定了`getter`，`receiver`则为`getter`调用时的`this`值。

### getPrototypeOf
* `Reflect.getPrototypeOf(target)`
* 返回指定对象的原型属性的值。
* `Reflect.getPrototypeOf(Reflect.getPrototypeOf({})) // null`

### has
* `Reflect.has(target, propertyKey)`
* 判断某个对象上面是否存在某个属性。同`in`运算符。
* 如果指定的属性在指定的对象或其原型链中，则in 运算符返回true。
* 对于数组对象，需要使用`索引`而不是`元素`来判断。

### isExtensible
* `Reflect.isExtensible`判断一个对象是否可扩展。
* 如果一个对象被使用了`Reflect.preventExtension | Object.seal | Object.freeze` 等方法，那么它就是不可扩展的。 

### ownKeys
* `Reflect.ownKeys(target)`
* 返回一个包含所有自身属性（不包含继承属性）的数组。(类似于 `Object.keys()`, 但不会受enumerable影响).
* 不包括原型链上的属性。

### set
* `Reflect.set()`
* 给对象设置属性。
* 如果只提供一个参数，那么设置属性和值都是`undefined`

### setPropertyOf
* 给对象设置原型，可以改变对象的原型值。



## 使用

## 兼容性
* 兼容性还是不错的，除了IE，基本都支持。

## 参考
* [Reflect MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect)




