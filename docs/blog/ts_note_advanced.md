---
sidebar: auto
---

# TypeScript 学习笔记 —— 高级

## 泛型
* 我们可以使用泛型来创建可重用的组件，一个组件可以支持多种类型的数据。泛型是指在定义函数、接口或者类时，未指定其参数类型，只有在运行时传入才能确定。那么此时的参数类型就是一个变量，通常用大写字母 T 来表示。
* 语法：函数名、接口名或者类名添加后缀 `<T>`
* 定义多个泛型类型参数，通过逗号来分割，例如：`<T, U, K>。`
```js
function fn<T> {}
interface MyData<T> {
	name: T
}
class Person<T> {
	name: T
}
```

### 泛型参数设置默认类型
* 语法：`<T = 默认类型>`
```js
function fn<T = string>(arr: T[]): T {
	return T[0]
}
```

### 泛型类型与泛型接口

#### 泛型类型
```js
function fn<T>(arg: T): T {return arg}
let fn1: <T>(arg: T) => T = fn
let fn2: {<T>(arg: T): T} = fn
// <T>(arg: T) => T 即为泛型类型，
// 等同于带有调用签名的对象字面量书写方式：{ <T>(arg: T): T }:
```

#### 泛型接口
```js
interface Fn {
	<T>(arg: T): T
}

const myFn: Fn = function <T>(arg: T) : T {return arg}

// 泛型参数当作整个接口的一个参数，我们可以把泛型参数提前到接口名上。
// 使用的时候，需要指定泛型参数的类型
interface Fn1<T> {
	(arg: T): T 
}

const fn1: Fn1<string> = function(s:string):string {return s}
```

### 泛型类
* 声明 类 `MyClass` 的后面后加上了 `<T>`，这样就声明了泛型参数 T

### 泛型约束
* 如果很明确传入的泛型参数是什么类型，或者明确想要操作的某类型的值具有什么属性，那么就需要对泛型进行约束。
  - 让泛型继承一个接口，那么传入的泛型类型就必须包含接口中的成员，从而达到对泛型的约束。
  - 也可以让泛型继承几个类型。
```js
// 接口
interface Person {
	name: string
}
function fn<T extends Person>(user: T): string {}

// 类型
type Args = number | string 
class Demo<T extends Args> {}
const d = new Demo<number> // 只能传入 Args 的类型
```
* 通过 `<T extends Interface1 & Interface2>` 这种语法来实现多重类型的泛型约束


## 类型兼容性
* 指的是一个类型能否赋值给其他类型的规则。
* TypeScript 类型兼容性是基于结构类型的；结构类型只使用其成员来描述类型。

### 函数
* 如果函数 fn2 可以赋值给 fn1 的条件 `let fn1 = fn2`
  - fn2 的每个参数均能在 fn1 中找到对应类型的参数
  - 参数顺序保持一致，参数类型对应
  - 参数名称不需要相同
* 函数返回值
  - 类型系统强制源函数的返回值类型必须是目标函数返回值类型的子类型
  - 如果目标函数的返回值类型是 void，那么源函数返回值可以是任意类型：

### 枚举
* 枚举与数字类型互相兼容
* 不同枚举类型之间不兼容。

### 类
* 类分为实例部分和静态部分。比较两个类类型数据时，只有实例成员会被比较，静态成员和构造函数不会比较。
* 类的私有成员和受保护成员会影响兼容性。 

### 泛型
* 泛型的类型兼容性根据其是否被成员使用而不同。
* 如果泛型参数类型不同，但泛型类型还未使用，则可以相互赋值。如果有使用，则不能赋值。
* 没有指定泛型类型的泛型参数，会把所有泛型参数当成 any 类型比较，也可以赋值。


## 交叉类型
* 语法：`T & U`
* 交叉类型是将多个类型合并为一个类型。它包含了所需的所有类型的特性。
* 如果交叉类型中，有同名属性，且类型不一样，那么它最终的类型就是：never，且不能被赋值。

## 联合类型
* 如果一个值是联合类型，那么只能访问联合类型的共有属性或方法。

## 类型别名
* 使用`type`语法
* 与接口的区别
  - 接口可以实现 extends 和 implements，类型别名不行。
  - 类型别名并不会创建新类型，是对原有类型的引用，而接口会定义一个新类型。
  - 接口只能用于定义对象类型，而类型别名的声明方式除了对象之外还可以定义交叉、联合、原始类型等。
  - 相同的接口声明可以合并
* TypeScript 推荐我们尽可能的使用接口来规范我们的代码。
* 类型别名在定义交叉类型、联合类型。

## 索引
* 索引类型可以让 TypeScript 编译器覆盖检测到使用了动态属性名的代码。

### 查询操作符：keyof
* 对于任何类型 T，`keyof T` 的结果为 T 上已知的公共属性名的联合。

### 索引访问操作符 - T[K]
* 一个对象的类型为泛型 T，这个对象的属性类型 K 只需要满足 K extends keyof T，即可得到这个属性值的类型为 `T[K]`。
```js
function getProperty<T, K extends keyof T>(o: T, name: K): T[K] {
	return o[name]
}
```

## 映射类型
* 属于工具类型。映射类型可以将已知类型的每个属性都变为可选的或者只读的。
* 关键字：`Portial`、`Readonly`
* 映射类型的语法: ` [K in Keys]`
```js
interface Person{
  name: string
  age: number
}

type PersonOptional = Partial<Person>
type PersonReadonly = Readonly<Person>

// 源码实现
type Readonly<T> = {
  readonly [K in keyof T]: T[K] // 映射类型的语法 [K in Keys]
}
type Partial<T> = {
  [K in keyof T]?: T[K]
}
```

## 条件类型
* 内置的工具类型。
```js
Exclude<T, U> // 从 T 中剔除可以赋值给 U 的类型。
Extract<T, U> // 提取 T 中可以赋值给 U 的类型。
NonNullable<T> // 从 T 中剔除 null 和 undefined。
ReturnType<T> // 获取函数返回值类型。
InstanceType<T> // 获取构造函数类型的实例类型。
```

## is 关键字
* 被称为类型谓词，用来判断一个变量属于某个接口或类型。
* `is` 关键字一般用于函数返回值类型中，判断参数是否属于某一类型，并根据结果返回对应的布尔类型。
* 场景：对`unknown`类型的数据进行判断。`is` 关键字经常用来封装"类型判断函数"，通过和函数返回值的比较，从而缩小参数的类型范围，所以类型谓词 `is`也是一种类型保护。
* 语法：`prop is type`
* 函数嵌套后， TypeScript 不能进行正确的类型判断。
* 常见类型判断函数
```js

const isNumber = (val: unknown): val is number => typeof val === 'number'
const isString = (val: unknown): val is string => typeof val === 'string'
const isSymbol = (val: unknown): val is symbol => typeof val === 'symbol'
const isFunction = (val: unknown): val is Function => typeof val === 'function'
const isObject = (val: unknown): val is Object => val !== null && typeof val === 'object'

function isPromise<T = any>(val: unknown): val is Promise<T> {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch)
}
```

## infer 关键字
* 声明一个不确定的类型变量。`infer R` 就是声明了一个类型变量 `R`
* 在条件类型表达式中，可以在 `extends` 条件语句中使用 `infer` 关键字来声明一个待推断的类型变量。
* `infer `的作用是让 TypeScript 自己推断，并将推断的结果存储到一个类型变量中，`infer` 只能用于 `extends` 语句中。
```js
type ReturnType<T extends (...args: any) => ang> = T extends (...args: any) => infer : U ? U : any

```
* 如果`T` 满足某个约束条件，那么就返回这个类型变量，并存储在`infer U` 后面的的 `U` 中。
* 借助条件类型的 infer 关键字来推断类型，可以实现一些比如联合类型转交叉类型、联合类型转元组的操作


## iterator
* 可迭代协议：允许 JavaScript 对象定义或定制它们的迭代行为。要成为可迭代对象， 一个对象必须实现 @@iterator 方法。可通过常量 Symbol.iterator 访问该属性。
* 迭代器协议:
  - 定义了产生一系列值（无论是有限个还是无限个）的标准方式。当值为有限个时，所有的值都被迭代完毕后，则会返回一个默认返回值。
  - 只有实现了一个拥有以下语义（semantic）的 next() 方法，一个对象才能成为迭代器。
  - next() 方法的返回值类型是 { value: any, done: boolean }。其中，value 是 any 类型，表示下一个将要返回的值；done 是布尔类型，当没有更多可返回数据时返回 true。迭代器还会保存一个内部指针，用来指向当前集合中值的位置。

### for...of
* `for...of` 会遍历可迭代的对象(包括 `Array，Map，Set，String，TypedArray，arguments` 对象等等)，调用对象上的 `Symbol.iterator` 方法。
* `for...of` 语句遍历可迭代对象定义要迭代的数据。
* `for...in` 语句以任意顺序迭代对象的可枚举属性。

## 生成器
* 生成器函数会返回一个对象，可以调用这个对象上的 next() 方法。
* 在调用 next() 的时候可以传递一个参数，在上次 yield 前接收到这个参数：
* 生成器最初没有产生任何结果，在第一次调用 next() 时传参是无意义的。

## 装饰器
* 装饰器是一种特殊类型的声明，它能够附加到类声明、方法、访问符、属性、类方法的参数上，以达到扩展类的行为。
* 常见的装饰器有：类装饰器、属性装饰器、方法装饰器、参数装饰器。
* 装饰器的写法：普通装饰器（无法传参）、 装饰器工厂（可传参）。
* 执行顺序：先执行装饰器函数，再执行被装饰的函数。
* 类装饰器函数表达式将构造函数作为唯一的参数，主要用于扩展类的属性和方法。








































