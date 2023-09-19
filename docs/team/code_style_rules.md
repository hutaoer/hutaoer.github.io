---
sidebar: auto
category: 团队
date: 2022-12-29
tags:
  - 编码风格
---

# 编码风格约定

## import 顺序
With the [groups](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md#groups-array) option set to ["builtin", "external", "internal", "parent", "sibling", "index", "object", "type"] the order is as shown in the following example:
```javascript
// 1. node "builtin" modules
import fs from 'fs';
import path from 'path';
// 2. "external" modules
import _ from 'lodash';
import chalk from 'chalk';
// 3. "internal" modules
// (if you have configured your path or webpack to handle your internal paths differently)
import foo from 'src/foo';
// 4. modules from a "parent" directory
import foo from '../foo';
import qux from '../../foo/qux';
// 5. "sibling" modules from the same or a sibling's directory
import bar from './bar';
import baz from './bar/baz';
// 6. "index" of the current directory
import main from './';
// 7. "object"-imports (only available in TypeScript)
import log = console.log;
// 8. "type" imports (only available in Flow and TypeScript)
import type { Foo } from 'foo';
```

## 约束

1. dom上操作的函数方法必须以 handle 为开头 （已开启）
2. 函数方法/字段命名尽可能的清晰表达其作用
3. dom上的参数，方法需按 “固定参数 - 动态参数- 方法 ” 的顺序写，如下 （暂无，后期补/开发相关lint插件）

## 缩进
【强制】使用 2 个空格缩进。eslint: [indent](https://eslint.org/docs/rules/indent.html)。统一使用 2 个空格缩进，不要使用 4 个空格或 tab 缩进。
```jsx
// bad
function fn() {
    const style = '四个空格'
}

// good
function fn() {
  const style = '两个空格'
}
```

## 分号
【强制】不使用分号。当 JavaScript 遇到没有分号结尾的一行，它会执行自动插入分号。如果 JavaScript 在你的断行里错误的插入了分号，就会出现一些古怪的行为。当新的功能加到 JavaScript 里后， 这些规则会变得更复杂难懂。显示的结束语句，并通过配置代码检查去捕获没有带分号的地方可以帮助你防止这种错误。<br />参考：Angular 和 React 源码中，都有加分号；Vue 没有加分号，eslint-config-standard 也没有使用分号。如果项目中有使用分号，会通过工具格式化掉。
```javascript
// good
(function () {
  const name = 'Skywalker'
  return name
})()
// bad
(function () {
  const name = 'Skywalker';
  return name;
}());
```


## 逗号
【强制】对于用逗号分割的多行代码，不使用行首逗号，并在最后一行的末尾，添加逗号。eslint:  [comma-style](https://eslint.org/docs/rules/comma-style.html) 。<br />这样可以使增删行更加容易，也会使 git diffs 更清晰（添加或删除一行的时候，diff 仅展示一行）。
```jsx
// bad
const levels = [
  'levelOne'
  ,'levelTwo'
  ,'levelThree'
]

// good
// bad
const levels = [
  'levelOne',
  'levelTwo',
  'levelThree',
]
```
```jsx
// bad
const planMap = {
  'follow': '随访'
  ,'nutrition': '营养计划'
}

// bad
const planMap = {
  'follow': '随访',
  'nutrition': '营养计划'
}

// good
const planMap = {
  'follow': '随访',
  'nutrition': '营养计划',
}
```

## 代码块
由大括号 {} 分隔的代码块状结构，由一对大括号界定。<br />【推荐】始终使用大括号包裹代码块。
```javascript
// bad
if (flag)
  firstStep();
  secondStep(); // 这一行并不在 if 语句里

// good
if (flag) {
  firstStep();
  secondStep();
}
```
代码块只有一条语句时，可省略大括号，跟控制语句写在同一行。但出于一致性和可读性考虑，不推荐：
```javascript
// bad
if (flag)
  return false;

// bad - 允许但不推荐
if (flag) return false;

// good
if (flag) {
  return false;
}
```
【强制】对于非空代码块，大括号的换行方式采用 [Egyptian Brackets](https://links.jianshu.com/go?to=https%3A%2F%2Fblog.codinghorror.com%2Fnew-programming-jargon%2F) 风格。eslint: [brace-style](https://eslint.org/docs/rules/brace-style.html)。<br />具体的规则如下：

- 左大括号 { 前面不换行，后面换行
- 右大括号 } 前面换行
- 右大括号 } 后面是否换行有两种情况：
   - 如果 } 终结了整个语句，如条件语句、函数或类的主体，则需要换行
   - 如果 } 后面存在 else、catch、while 等语句，或存在逗号、分号、右小括号（)），则不需要换行。
```javascript
// bad - else 应与 if 的 } 放在同一行
if (flag) {
  thing1();
}
else
  thing2();
}

// good
if (flag) {
  thing1();
} else {
  thing2();
}
```
【推荐】对于空代码块，且不在类似 if..else.. 或 try..catch..finally.. 的多块结构中时，可以直接闭合。示例：
```javascript
// good
function emptyFn () {}
```
【强制】不要让代码中出现空代码块，这会使阅读者感到困惑。如果必须使用空块，需在块内写明注释。eslint: [no-empty](https://eslint.org/docs/rules/no-empty.html)。示例：
```javascript
// bad
if (condition) {
  fn1();
} else {
}

// good
if (condition) {
  fn1();
} else {
  // TODO I haven’t determined what to do.
}
```

## 空格
【强制】块的左大括号 { 前有一个空格。eslint: [space-before-blocks](https://eslint.org/docs/rules/space-before-blocks.html)
```javascript
// bad
function test(){
  console.log('test');
}

// good
function test() {
  console.log('test');
}

// bad
dog.set('attr',{
  age: '1 year',
  breed: 'Bernese Mountain Dog',
});

// good
dog.set('attr', {
  age: '1 year',
  breed: 'Bernese Mountain Dog',
});
```
【强制】控制语句（if、while 等）的左小括号 ( 前有一个空格。声明函数时，函数名和参数列表之间无空格。eslint: [keyword-spacing](https://eslint.org/docs/rules/keyword-spacing.html)。
```javascript
// bad
if(flag) {
  fight ();
}

// good
if (flag) {
  fight();
}

// bad
function fight () {
  console.log ('Swooosh!');
}

// good
function fight() {
  console.log('Swooosh!');
}
```
【强制】方括号、圆括号内部两侧无空格。eslint: [array-bracket-spacing](https://eslint.org/docs/rules/array-bracket-spacing.html)，[space-in-parens](https://eslint.org/docs/rules/space-in-parens.html)
```javascript
// bad
function bar( foo ) {
  return foo;
}

// good
function bar(foo) {
  return foo;
}

// bad
if ( foo ) {
  console.log( foo );
}

// good
if (foo) {
  console.log(foo);
}

// bad
const foo = [ 1, 2, 3 ];
console.log(foo[ 0 ]);

// good
const foo = [1, 2, 3];
console.log(foo[0]);
```
【强制】大括号内部两侧有空格。eslint: [object-curly-spacing](https://eslint.org/docs/rules/object-curly-spacing.html)<br />这里，有同学提出了不同的意见，认为是不需要添加空格的。我看了下 React 的源码，是没有在这种场景下添加空格的。例如：[https://github.com/facebook/react/blob/main/packages/react-fetch/src/ReactFetchNode.js#L38](https://github.com/facebook/react/blob/main/packages/react-fetch/src/ReactFetchNode.js#L38)<br />再看了下Vue的源码，是有添加空格的，例如：[https://github.com/vuejs/vue/blob/main/src/core/vdom/create-component.ts#L29](https://github.com/vuejs/vue/blob/main/src/core/vdom/create-component.ts#L29)<br />webpack，是有加空格的，例如：[https://github.com/webpack/webpack/blob/main/lib/javascript/JavascriptGenerator.js#L9](https://github.com/webpack/webpack/blob/main/lib/javascript/JavascriptGenerator.js#L9)<br />国内开源比较成功的antd，也有加空格，例如：[https://github.com/ant-design/ant-design/blob/master/scripts/check-site.js#L8](https://github.com/ant-design/ant-design/blob/master/scripts/check-site.js#L8)<br />所以，这里还是强制加空格。
```javascript
// bad
const foo = {clark: 'kent'};

// good
const foo = { clark: 'kent' };
```
【强制】运算符两侧有空格，除了一元运算符。eslint: [space-infix-ops](https://eslint.org/docs/rules/space-infix-ops.html)。
```javascript
// bad
const x=y+5;

// good
const x = y + 5;

// bad
const isRight = result === 0? false: true;

// good
const isRight = result === 0 ? false : true;

// bad - 一元运算符与操作对象间不应有空格
const x = ! y;

// good
const x = !y;
```
【强制】定义对象字面量时，不允许所谓的「水平对齐」，即 key、value 之间应该有且只有一个空格。eslint: [key-spacing](https://eslint.org/docs/rules/key-spacing.html)
```javascript
// bad
{
  a:        'short',
  longname: 'long',
}

// good
{
  a: 'short',
  longname: 'long',
}
```
【强制】在使用多个（大于两个）方法链式调用时进行换行缩进，把点 . 放在前面以强调这是方法调用而不是新语句。eslint: [newline-per-chained-call](https://eslint.org/docs/rules/newline-per-chained-call.html)   ，[no-whitespace-before-property](https://eslint.org/docs/rules/no-whitespace-before-property.html)
```javascript
// bad
$('#items').find('.selected').highlight().end().find('.open').updateCount();

// bad
$('#items').
  find('.selected').
    highlight().
    end().
  find('.open').
    updateCount();

// good
$('#items')
  .find('.selected')
    .highlight()
    .end()
  .find('.open')
    .updateCount();

// bad
const leds = stage.selectAll('.led').data(data).enter().append('svg:svg').classed('led', true)
    .attr('width', (radius + margin) * 2).append('svg:g')
    .attr('transform', `translate(${radius + margin},${radius + margin})`)
    .call(tron.led);

// good
const leds = stage.selectAll('.led')
    .data(data)
  .enter().append('svg:svg')
    .classed('led', true)
    .attr('width', (radius + margin) * 2)
  .append('svg:g')
    .attr('transform', `translate(${radius + margin},${radius + margin})`)
    .call(tron.led);

// good - 大于 2 个方法的链式调用才需要进行换行
const leds = stage.selectAll('.led').data(data);
```

## 空行
【强制】块的开始和结束不能是空行。eslint: [padded-blocks](https://eslint.org/docs/rules/padded-blocks.html)。
```javascript
// bad
function bar() {

  console.log(foo);

}

// good
function bar() {
  console.log(foo);
}

// bad
if (baz) {

  console.log(qux);
} else {
  console.log(foo);

}

// good
if (baz) {
  console.log(qux);
} else {
  console.log(foo);
}
```
【推荐】在文件末尾保留一行空行。eslint: [eol-last](https://eslint.org/docs/rules/eol-last.html) 。统一在文件末尾保留一行空行，即用一个换行符结束文件：
```javascript
// bad - 文件末尾未保留换行符
import { foo } from './Foo';
// ...
export default foo;
```
```javascript
// good
import { foo } from './Foo';
// ...
export default foo;↵
```
【参考】在块末和新语句间插入一个空行。
```javascript
// bad
if (foo) {
  return bar;
}
return baz;

// good
if (foo) {
  return bar;
}

return baz;

// bad
const obj = {
  foo() {
  },
  bar() {
  },
};
return obj;

// good
const obj = {
  foo() {
  },

  bar() {
  },
};

return obj;
```

## 单行最大字符数
【推荐】单行最大字符数：**100**。eslint: [max-len](https://eslint.org/docs/rules/max-len.html) 。过长的单行代码不易阅读和维护，需要进行合理换行。<br />单行代码最多不能超过 100 个字符，除了以下两种情况：1.字符串和模板字符串; 2.正则表达式
```javascript
// bad
const foo = jsonData && jsonData.foo && jsonData.foo.bar && jsonData.foo.bar.baz && jsonData.foo.bar.baz.quux && jsonData.foo.bar.baz.quux.xyzzy;

// good
const foo = jsonData
  && jsonData.foo
  && jsonData.foo.bar
  && jsonData.foo.bar.baz
  && jsonData.foo.bar.baz.quux
  && jsonData.foo.bar.baz.quux.xyzzy;

// bad
$.ajax({ method: 'POST', url: 'https://foo.com/', data: { name: 'John' } }).done(() => console.log('Congratulations!')).fail(() => console.log('You have failed this city.'));

// good
$.ajax({
  method: 'POST',
  url: 'https://foo.com/',
  data: { name: 'John' },
})
  .done(() => console.log('Congratulations!'))
  .fail(() => console.log('You have failed this city.'));
```

## 最大行数

### 函数最大行数
【推荐】函数最大行数：**80。**eslint: [max-lines-per-function](https://eslint.org/docs/rules/max-lines-per-function.html)。过长的函数不易阅读和维护，最好对其进行拆分。

### 文件最大行数
【推荐】文件最大行数：**1000**。eslint: [max-lines](https://links.jianshu.com/go?to=https%3A%2F%2Feslint.org%2Fdocs%2Frules%2Fmax-lines.html)。过长的文件不易阅读和维护，最好对其进行拆分。