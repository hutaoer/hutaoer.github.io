---
sidebar: auto
---

# TypeScript 学习笔记 —— 实战

## declare module
* 直接导入 .scss 文件或者 .png文件，TS 的静态检查会出错：
```js
import S from "./index.scss"; // TS Error: 找不到模块“./index.scss”或其相应的类型声明
import imgLogo from "./logo.png"; // // TS Error: 找不到模块“./logo.png”或其相应的类型声明
```
* 默认情况下`import style from 'style.scss'`在ts的ide校验器里会报错，那就用`index.d.ts`假定定义所有scss结尾的文件是module。
```js
declare module '*.png';
declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}
```
* 当引入`@types/*`中不存在的自定义包：`unknown_module`时，ide会报错，可以通过 `declare module 'unknown_module'` 来解决报错。


## Promise泛型函数
* 定义Promise泛型
```js

interface Promise<T> {
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
}
```

## Partial,Required,Readonly,Pick 泛型工具类型的实现
```js
type Partial<T> = {
	[P in keyof T]? : T[P]
}

type Required<T> = {
    [P in keyof T]?- : T[P]; 
}

type Readonly<T> = {
    readonly [P in keyof T] : T[P];
}

type Pick<T, K extends keyof T> = {
    [P in K]: T[P]
}
```

## enum
* 如果使用enum，可以很舒服地 由key查value，由value查key。

## infer
* infer 可以在 extends 条件类型的字句中，在真实分支中引用此推断类型变量，推断待推断的类型。
```js
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

type fn = () => number
type fnReturnType = ReturnType<fn> // number

```
* `T extends U ? X : Y` 的形式为条件类型。
* infer R 代表待推断的返回值类型，如果 T 是一个函数`(...args: any[]) => infer R`，则返回函数的返回值 R，否则返回any







