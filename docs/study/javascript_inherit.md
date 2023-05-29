---
sidebar: auto
category: 学习笔记
tags:
  - JavsScript
  - 继承
---

# JavaScript 中的继承实现
* js 中，实现继承，主要是通过原型链来实现的。
* ES6 中可以通过 `extends` 关键字来实现，但本质上，也是封装了基于原型链继承方式的语法糖。

## 原型
* 构造函数、原型链、实例三者之间的关系如下：每个构造函数都有一个原型对象（`prototype`），原型有一个属性指向构造函数，实例有一个内部指针(`__proto__`)指向原型。
* 虽然可以通过实例读取原型对象上的值，但 **不可能通过实例重写** 这些值。如果在实例上添加了一个与原型对象中同名的属性，那就会在实例上创建这个属性，这个属性会遮住原型对象上的属性。
* `hasOwnProperty()`方法用于确定某个属性是在实例上还是在原型对象上。属性存在于调用它的对象实例上时返回 true。

```js
function Person() {} // 构造函数
const p = new Person // 实例对象 p
Person.prototype.constructor === Person // true 构造函数的原型的 constructor 属性指向构造函数
p.__proto__.constructor === Person // true 实例的 __proto__ 对象的 constructor 属性也指向构造函数
Person.prototype === p.__proto__ // 都指向原型
```

## 原型链

### 实现
```js
function Student() {}
Student.prototype = new Person() // 改写子类的 prototype
const s = new Student() 
```

### 结果
* `Student.prototype` 的`constructor` 属性也会重新指向 `Person`
* `s.__proto__ === Student.prototype` 输出`true`
* `s.__proto__.constructor === Person` 输出`true`
* `s instanceof Person` 输出`true`
* `s instanceof Student` 输出`true`
* 如果一个实例的原型链中出现过相应的构造函数，那么调用 `instanceof` 的时候，会返回`true`
* `isPrototypeOf()` 方法检查一个对象是否存在于另一个对象的原型链上。

### 注意
* 已字面量方式创建原型方法会破坏之前的原型链，相当于重新原型链。

## 借用构造函数继承
* 即在子类中调用父类的构造函数。
* 问题：
  - 丢失了原型链，不能访问父类原型上定义的方法。
  - 只能在父类构造函数中定义方法，复用性较差。

### 实现
```js
function Father(name) {
	this.name = name
	this.getName = function() {
		return this.name
	}
}

function Son(name) {
	Father.call(this, name)
}

const s = new Son('hutaoer')
```


## 组合继承
* 综合原型链和构造函数来实现。
* 使用原型链继承原型上的属性和方法，通过借用构造函数继承实例的属性。
* 而且组合继承也保留了 `instanceof` 操作符和 `isPrototypeOf()`方法识别合成对象的能力。

### 实现
```js
function SuperClass(name) {
	this.name = name
}

function SubClass(name, age) {
	SuperClass.call(this, name)
	this.age = age 
}

SubClass.prototype = new SuperClass()

// 共享方法
SubClass.prototype.sayName = function() {
	console.log(this.name)
}

```

## 原型式继承
* `ECMAScript 5` 通过增加 `Object.create()` 方法将原型式继承的概念规范化。
* `create`这个方法接收两个参数：作为新对象原型的对象，以及给新对象定义额外属性的对象（第二个可选）。在只有一个参数时，`Object.create()`与下面的 `myCreate()`方法效果相同：
* `Object.create()`的第二个参数与` Object.defineProperties()`的第二个参数一样：每个新增属性都通过各自的描述符来描述。

### 实现
```js
function myCreate(o) {
	function F() {}
	F.prototype = o
	return new F()
}


```

## 寄生式继承
* 类似寄生构造函数和工厂模式。创建一个实现继承的函数，以某种方式增强对象，然后返回这个对象。

### 实现
```js
function createAnthor(original) {
	let clone = Object.create(original);
	clone.fn = function() {
		console.log('hi')
	}
	return clone
}
```

## 寄生式组合继承
* 组合继承的两个问题，调用了两次父类的构造函数：一次在是创建子类原型时调用，另一次是在子类构造函数中调用。
* 它不通过调用父类构造函数给子类原型赋值，而是获取父类原型的一个副本，并将其赋值给子类的原型，然后改写原型的`constructor`，解决`constructor`丢失的问题。

### 实现
```js
function myCreate(o) {
	function F() {}
	F.prototype = o
	return new F()
}
function inheritPrototype(subType, superType) {
	let prototype = Object.create(superType.prototype)
	// 或者使用 
	let prototype = myCreate(subType.prototype)
	prototype.constructor = subType;
	subType.prototype = prototype
}
```

## 类继承
* 这个就比较简单了。注意，如果要调用父类的构造函数的时候，需要调用`super`
```js
class Person {
	constructor(name) {
		this.name = name
	}
}
class Student extends Person {
	constructor(name, age) {
		super(name)
		this.age = age
	}
}

```


























