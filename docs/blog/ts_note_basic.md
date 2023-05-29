---
sidebar: auto
---

# TypeScript 学习笔记 —— 基础

## 什么是 TypeScript

- TypeScript 是一种结构类型。
- TypeScript 是对所具有的结构进行类型检查。 它有时被称做“鸭式辨型法”或“结构性子类型化”。

## 类型

### 数组
* 两种定义数组的方式：`Array<类型>` 和 `类型[]`
  - `let arr: number[] = [1,2,3]`
  - `let arr1: Array<number> = [4,5,6]`

### any

- 任何类型都可以归为 `any` 类型，它是 `TS` 中的顶级类型。
- 给一个变量声明为 any，相当于关闭了类型检查。any 类型的变量可以赋值给任意类型。不会校验出错。

### undefined 和 null

- 默认情况下 null 和 undefined 是所有类型的子类型。

### never

- never 类型是任何类型的子类型，也可以赋值给任何类型。没有类型是 never 的子类型或可以赋值给 never 类型
- never 类型表示那些永不存在的值的类型。
- 使用场景：
  - 抛出异常的函数表达式，返回值类型为`never`
  - 不能取得值的地方，比如 switch case 语句中的 default 分支。

### unknown

- unknown 类型作为 any 类型对应的安全类型使用起来更加安全，如果有 any 类型的使用需求，应尽量使用 unknown 类型来替代 any 类型。
- unknown 类型是 any 类型对应的安全类型。
- unknown 类型只能分配给 any 类型和 unknown 类型本身。
- unknown 类型在被确定为某个类型之前，不能被进行诸如函数执行、实例化等操作，一定程度上对类型进行了保护。

## is 类型谓词

- 用来判断一个变量属于某个接口或类型。

## 枚举

- 用于定义一组相同主题的常量数据
- 字符串枚举成员不会生成反向映射。

## 字面量类型

- 主要有字符串、数字、布尔值、对象等几种字面量类型。

## 接口

- 使用接口来定义契约，如类型命名、属性检查、函数类型定义等。
- 不能把 interface 定义的内容当做变量进行使用。
- 接口的首字母需要大写。只需要关注值的类型，不同于其他语言，定义接口是为了实现。
- 使用场景：在声明一个对象、函数或者类时，先定义接口，确保其数据结构的一致性。多人协作时候，尤其重要。
- readonly vs const 区别：
  - 做为 变量 使用的话用 const，若做为 属性 则使用 readonly。
  - `ReadonlyArray<T>` 设置数组为只读，那么它的所有写方法都会失效。
- 希望接口允许有任意的属性，语法是用 [] 将属性包裹起来，使用字符串索引
- 接口可以合并和继承。
- 接口在继承的时候，可以被覆盖，规则：只能是required覆盖optional，optional不能覆盖required。

```js
interface Obj {
  [propName: string]: any; // 使用 unknown 是否会更好些？
}
```

### 函数类型

- 使用调用签名来表示函数类型。包括：参数列表和返回类型。
- 类型检查的时候，函数的参数名不需要与接口中的参数名保持一致。
- 接口中的函数类型带有函数名，下面两种书写方式是等价的：

```js
interface Calculate {
  add(x: number, y: number): number
  multiply: (x: number, y: number) => number
}

```

### 可索引类型

- 索引类型签名包括两种：字符串类型和 number 类型。
- 可以同时使用两种类型的索引，但是数字索引的返回值必须是字符串索引返回值类型的子类型。
- 因为当使用 number 来索引时，JavaScript 会将它转换成 string 然后再去索引对象。

### 类类型

- 类接口需要通过 `implements` 来实现
- 也可以通过 `extends` 继承。这让我们能够从一个接口里复制成员到另一个接口里，可以更灵活地将接口分割到可重用的模块里。
- 一个接口可以继承多个接口。

### 混合类型

- 声明一个接口，如果只有`(start: number): string` 一个成员，那么这个接口就是函数接口，同时还具有其他两个成员，可以用来描述对象的属性和方法，这样就构成了一个混合接口。

### interface 与 type 区别
* 都可以描述一个对象或者函数

#### type
* `type` 可以声明基本类型别名，联合类型: `type AB = A | B`
* `type` 语句中还可以使用 `typeof` 获取实例的 类型进行赋值: `type B = typeof A`

#### interface
* 接口可以继承和实现
* 接口可以进行声明合并


## 类

- 访问修饰符：四种访问修饰符 public、protected、private 和 readonly。
- 静态方法调用同一个类中的其他静态方法，可使用 this 关键字。
- 静态方法中的 this 指向类本身，而静态方法也存在于类本身，所以可以在静态方法中用 this 访问在同一类中的其他静态方法。
- 非静态方法中，不能直接使用 this 关键字来访问静态方法。而要用类本身或者构造函数的属性来调用该方法：
- 类指向其构造函数本身，在非静态方法中，this.constructor === StaticMethodCall 为 true， 也就是说这两种写法等价。
- 类指向其构造函数本身。
- 静态方法存在于类本身上面而不是类的实例上。
- 抽象类中的抽象方法不包含具体实现并且必须在派生类中实现。
- 子类继承父类时，在其构造函数 constructor() 中不要忘了 super() 方法。

## 函数

- 等号左侧的类型定义由两部分组成：参数类型和返回值类型，通过 => 符号来连接。
- 这里要注意：函数类型的 => 和 箭头函数的 => 是不同的含义。
- 注意 rest 参数 只能是最后一个参数。
- 在函数执行时， this 关键字并不会指向正在运行的函数本身，而是 指向调用函数的对象。
- 字面量类型:字符串字面量类型还可以用于区分函数重载：

## 类型断言

- 两种方式：
  - 通过 as 关键字进行类型断言
  - 类型断言还可以通过标签 <> 来实现
- 当使用 JSX 语法时，会跟标签 <> 形式的类型断言混淆，推荐统一使用 `as type` 语法。
- 非空断言：`!`
- 双重断言：使用 as 关键字进行两次断言，使用场景很少。
- 赋值的时候，使用`as const`可以将变量改成 `readonly`类型。
```js
let z = { text: "hello" } as const;
z.text = '1123' // error: Cannot assign to 'text' because it is a read-only property.
const z1 = {text: 'hi'}
z1.text = 'hello' // ok
```
- 注意：类型断言是不够严谨的，如果某个类型的变量缺少一些接口中定义的属性，也不会报错。


## 类型保护

- 类型保护是指缩小类型的范围，在一定的块级作用域内由编译器推导其类型，提示并规避不合法的操作。
- 可以通过四种方式将代码类型范围缩小：`typeof， instanceof， in， 字面量类型`
  - typeof 判断基础类型
  - instanceof 判断是否为对象的实例
  - in 操作符用于确定属性是否存在于某个对象上
- 字面量类型

```js
type Success = {
  success: true,
};
type Fail = {
  success: false,
};
function check(res: Success | Fail) {
  if (res.success) {
    // do something successful
  } else {
    // do something failed
  }
}
```

## 声明文件
* 当使用第三方库时，我们需要引用它的声明文件，才能获得对应的代码补全、接口提示等功能。
* 声明文件必需以` .d.ts `为后缀。推荐使用 `@types` 统一管理第三方库的声明文件。`@types` 的使用方式很简单，直接用 npm 安装对应的声明模块即可。
* 如果第三方库没有提供声明文件，则需要手动书写声明文件。
* 一般来说，ts 会解析项目中所有的 `*.ts` 文件，当然也包含以 `.d.ts `结尾的文件。

### 语法
```js
declare var 声明全局变量
declare function 声明全局方法
declare class 声明全局类
declare enum 声明全局枚举类型
declare namespace 声明（含有子属性的）全局对象
interface 和 type 声明全局类型
export 导出变量
export namespace 导出（含有子属性的）对象
export default ES6 默认导出
export = commonjs 导出模块
export as namespace UMD 库声明全局变量
declare global 扩展全局变量
declare module 扩展模块
/// <reference /> 三斜线指令
```

### declare namespace
* namespace 是 ts 早期时为了解决模块化而创造的关键字。
* 早期还没有 ES6 的时候，ts 提供了一种模块化方案，使用 module 关键字表示内部模块。但由于后来 ES6 也使用了 module 关键字，ts 为了兼容 ES6，使用 namespace 替代了自己的 module，更名为命名空间。

### interface 和 type
* 暴露全局的接口和类型，其他文件可以直接使用。
* 暴露在最外层的 interface 或 type 会作为全局类型作用于整个项目中，我们应该尽可能的减少全局变量或全局类型的数量。推荐它们放到 namespace 下。
* interface 前是不需要 declare 。

### 发布声明文件
* 1.将声明文件和源码放在一起，2.将声明文件发布到 @types 下

### 注意
* 声明语句中只能定义类型，不能定义具体的实现。
* 在函数类型的声明语句中，支持函数重载。
* `declare class` 语句也只能用来定义类型，不能用来定义具体的实现。

## 参考
* [TypeScript慕课教程](http://www.imooc.com/wiki/typescriptlesson)
* [TypeScript入门教程](https://ts.xcatliu.com/)

