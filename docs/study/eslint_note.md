---
sidebar: auto
category: 学习笔记
tags:
  - 工具
  - eslint
  - prettier
---

# eslint 学习笔记

## 项目安装
* `npm install eslint -D` or `npm install eslint --save-dev`
* 然后在项目内生成eslint的配置文件，`npx eslint --init` or `./node_modules/.bin/eslint --init`

## 配置文件
* 优先级顺序：`.eslintrc.js > .eslintrc.yaml > .eslintrc.yml > .eslintrc.json > .eslintrc > package.json`

### env
* 用于指定启用的环境，并设置它们为 true。
```js
{
	"env": {
		"browser": true,
		"node": true
	}
}
```

#### 常见的环境配置项
* browser - 浏览器环境中的全局变量。
* node - Node.js 全局变量和 Node.js 作用域。
* es6 - 启用除了 modules 以外的所有 ECMAScript 6 特性（该选项会自动设置 ecmaVersion 解析器选项为 6）。

### extends
* 用来扩展配置或开启一个规则。
* `extends` 属性值可以省略包名的前缀 `eslint-config-`，比如，`eslint-config-standard`。
* 使用配置如下：`"extends": "standard"`
* `"eslint":"all"`，启用当前安装的 ESLint 中所有的核心规则。
* `"eslint:recommended"` 的 extends 属性启用一系列核心规则，这些规则报告一些常见问题。

### parserOptions
* 解析器选项。
* `ecmaVersion` 指定想使用的 `ECMAScript` 版本，年份和数字都可以使用，比如 2015（年份）和6（版本）代表一个意思，都是指 ES6
* `sourceType`，代码是 ECMAScript 模块，则设置为`module`，默认为为`script`
* `ecmaFeatures`, 表示想使用额外的语言特性，例如`"jsx":true`，表示启用`JSX`

### plugins
* 支持第三方插件。
* 插件名称可以省略 eslint-plugin- 前缀。
* 当指定来自插件的规则时，确保删除 `eslint-plugin-` 前缀。ESLint 在内部只使用没有前缀的名称去定位规则。

#### 常见插件
* 如果你正在使用 React 并且想要 React 语义支持，我们建议你使用 `eslint-plugin-react`。

### rules
```js
"rules": {
    "semi": ["error", "always"],
    "quotes": ["error", "double"]
}
```
* `semi` 对应eslint的规则。

#### 错误级别
* "off" or 0 - 关闭规则
* "warn" or 1 - 将规则视为一个警告（不会影响退出码）
* "error" or 2 - 将规则视为一个错误 (退出码为1)

### globals
* 指定一些全局变量，否则当前源文件内有声明的变量时，`no-undef` 规则将发出警告。

## 配置查找
* 为了将 ESLint 限制到一个特定的项目，可以设置`root: true`，这样它就会停止在父级目录中寻找。
* 项目级配置：
  - 与要检测的文件在同一目录下的 `.eslintrc.*` 或 `package.json` 文件
  - 继续在父级目录寻找 `.eslintrc` 或 `package.json`文件，直到根目录（包括根目录）或直到发现一个有`"root": true`的配置。

## 注释

### 单个规则
* 在出现问题的代码上面，加入注释来规避代码检查，例如：
* `/* eslint no-unused-vars: "off" */`
* `/* eslint no-unused-vars: 0 */`
* `/* eslint no-unused-vars: ["warn"]*/`

### 针对代码块
```js
/* eslint-disable */

alert('foo');

/* eslint-enable */
```

### 针对整个文件
* 如果在整个文件范围内禁止规则出现警告，将` /* eslint-disable */` 块注释放在文件顶部

## 忽略检查
* 配置`.eslintignore`，来忽略特定的文件和目录。
* 除了 `.eslintignore` 文件中的模式，ESLint总是忽略 `/node_modules/*` 和 `/bower_components/*` 中的文件。

## 同 prettier 区别
* eslint（包括其他一些 lint 工具）的主要功能包含代码格式的校验，代码质量的校验。
* prettier 只是代码格式的校验（并格式化代码），不会对代码质量进行校验，能够统一你或者你的团队的代码风格。
* 它并不关心你的语法是否正确，只关心你的代码格式.
* 在 ESLint 推出 --fix 命令行参数之后，如果你觉得 ESLint 提供的格式化代码够用了，也可以不使用 Prettier。

### prettier 与 eslint 冲突