---
sidebar: auto
category: 低代码
tags:
  - 低代码
---

# 拖拽式表单生成方案

## 一、背景
* 在项目中，需要受试者填写表单，但是每个受试者的表单并不相同，无法统一定制。所以我们需要一个可以现场快速生成报告表单的一个解决方案。
* 参考其他系统，拖拉式表单生成是一个比较成熟的解决方案，因此针对这个技术方案进行讨论。
* 如下：
* ![image.png](https://static.aistarfish.com/front-release/file/F2023090518095708100001681.1.png)

## 二、复杂度或核心问题分析
### 1. 数据结构
配置好的表单需要生成JSON数据并预览页面，良好的数据结构有利于页面的生成和后端存储，以及表单的数据收集分析。
### 2. 表单联动
* 普通场景下的表单联动，可以对依赖的组件做一个事件监听，来判断被依赖组件的展示与否。 此处的表单是动态生成的，且通过配置可以形成深层次的联动关系(比如A依赖于B，B依赖于C，....)，甚至是循环依赖(A->B->C->B)，甚至条件都是动态设置的，导致表单联动变得更为复杂。
* <div align="center"> <img src="https://static.aistarfish.com/front-release/file/F2023090518121670800000403.2.png" height = 500 />  <img src="https://static.aistarfish.com/front-release/file/F2023090518121670300003378.3.png" height = 500 /> </div>

* 所以，表单联动是该模块较复杂的一点。

### 3. 组件自我校验
* 暂不考虑，使用antd的组件动态校验。

### 4. 已生成模块表单的数据提交
* 表单模板已生成，应该提交服务端的数据如何定义？需要确认。

## 三、技术分析
* 只针对“二”中的几个点展开讨论，其他具体方案在做详细设计的时候再设计。

### 1. 数据结构
#### 1.1.1 基础数据结构
* 单个组件的属性分为：基础属性、props 、 rules。基础属性为各个组件共通的描述，rules 为描述校验信息，props 为描述组件的展示。

**基础属性**

- key：标识组件的唯一的 key。
- type：描述组件的类型，用于判断使用什么组件来进行渲染，可选值有 input, textarea, select, radio 等。
- show：组件的展示与否，值为 true 时展示，false 则隐藏当前组件。
- title: 表单的标题信息，作为 label 展示。
- required: 用于判断是否必填。
- showCondition：组件的显示条件。

以上属性是每个组件都必须有的属性，其余属性则根据不同的组件类型有所不同。如当 type 值为 select 时，则基础属性还需要包含 options 属性，具体的不同类型的额外属性可参考 antd 文档。<br />**props**

- prop 是描述组件的展示，支持 antd 组件库支持的展示，所以具体属性查询 antd 文档。

**rules**

- 对输入的类型需要做检验时，可以在rules 中描述详细的校验信息。具体属性配置参考 antd 文档。

一个简单的包含各种属性的样例如下：
```javascript
[
     {
        "key": "name",
        "type": "Input",
       	"title": "姓名",
       	"required": true,
        "showCondition": "if (getValue(type,key) === 'male') {currentTarget.show=true;currentTarget.value='';} else { currentTarget.show=false;}",
        "rules": [
            {
                "pattern": "^[A-Za-z0-9]+$",
                "message": "只允许填写英文字母和数字",
            }
        ],
        props: {
          prefix: 'https://',
          suffix: '.com'
        }
    },
   	{
        "key": "gender",
        "type": "select",
        "value": "male",
      	"title": "性别",
       	"required": false,
        "options": [
            { "name": "男", "value": "male" },
            { "name": "女", "value": "female" }
        ],
        rules: [],
        props: {}
    }
]
```
<a name="UROlu"></a>
#### 1.1.2 组件数据通过异步接口获取
当组件类型是 radio、select、checkbox 时，且组件的可选项需要通过异步接口获取时，需要配置一些不同于基础属性的 options 的信息，一个简单的类型值为 select 组件属性如下，可作为其他类型组件的参考。

- value ：如果不为空，则为组件默认值
```javascript
[
  {
        "key": "gender",
        "type": "select",
        "value": "",
        "options": [
            "action": "//api.test.com/getList?name=${name.value}",
            "nameProperty": "label",
            "valueProperty": "value",
            "data": "data.list"
        ]
    },
]
```
### 2. 表单联动
表单功能的关键点有二：

- 监听组件变化
- 如果依赖组件发生变化，判断当前组件是否显示

如：A组件依赖B组件，B组件变化，A组件跟随B组件变化而变化。
#### 2.1 备案一：proxy监听
监听数据的变化（通过proxy实现），当依赖的组件的值修改时， 执行对应的脚本实现联动功能。

- show：控制组件的展示和隐藏属性。
- showCondition：组件的显示条件（js语句）。
- value：组件值。

       ![image.png](https://cdn.nlark.com/yuque/0/2021/png/168170/1635692601109-e67b9c85-3d43-478c-a1c3-7d06ea9ef3e4.png#clientId=uc991afdc-25ab-4&from=paste&height=368&id=j8aGa&originHeight=578&originWidth=1124&originalType=binary&ratio=1&size=88886&status=done&style=stroke&taskId=u32261b79-46a1-4bc4-9315-8d254da0cab&width=716)<br />show 控制UI组件的展示，showCondition 记录了组件的显示条件，当依赖组件发生变化时，执行 showCondition 的脚本，通过脚本的执行结果设置 show 或者 value 的值。
```javascript
[
    {
        "key": "gender",
        "type": "select",
        "value": "",
      	"show": true,
        "options": [
            { "name": "男", "value": "male" },
            { "name": "女", "value": "female" }
        ],
    },
     {
        "key": "name",
        "type": "Input",
       	"value": "",
        "show": false,
        "showCondition": "if (getValue(select,gender) === 'male') {currentTarget.show=true;currentTarget.value='';} else { currentTarget.show=false;}",
    },
]
```
上述条件当性别值为男的时候显示输入框。
#### 2.2 备案二： 组件监听
监听数据的变化（通过组件监听事件实现），当依赖的组件的值修改时， 执行对应的脚本实现联动功能。<br />和备案一不同的是：

1. 使用组件监听如onChange()
2. 将执行语句拆成三段，分别是：判断语句、符合条件执行语句、不符合条件执行语句 （结构更容易理解，但是执行的时候多了语句拼接）

![image.png](https://cdn.nlark.com/yuque/0/2021/png/168170/1635692967348-8bfe06ac-3c47-4df0-99b7-0e85b0098dba.png#clientId=uc991afdc-25ab-4&from=paste&height=297&id=nDKaN&originHeight=551&originWidth=1381&originalType=binary&ratio=1&size=96857&status=done&style=stroke&taskId=u27c967fe-8766-49ee-8ce0-2662a5df6c0&width=744.5)
```javascript
[
    {
        "key": "name",
        "type": "Input",
      	"value": "",
       	"show": true,
    },
    {
        "key": "gender",
        "type": "Radio",
        "value": "male",
        "show": false,
        "options": [
            { "name": "男", "value": "male" },
            { "name": "女", "value": "female" }
        ],
      	"listener": {
        				"condition": "getValue(select,gender) === 'male'",
          			"set": "currentTarget.show=true;currentTarget.value='';getValue(select,gender) === 'male'",
          			"elseSet": "currentTarget.show=false;"
         }
    }
]
```
<a name="JzeSE"></a>
#### 2.3 备案三： 使用FormRender 组件
市面上上已有一些较成熟的Form 表单解决方案，给定规定的数据格式便能生成表单，如FormRender。<br />                           ![image.png](https://cdn.nlark.com/yuque/0/2021/png/168170/1635772644077-82b37f53-4e43-407c-9e39-6c0c56d208e7.png#clientId=u686e53f7-d2c0-4&from=paste&height=494&id=ua9035520&originHeight=723&originWidth=707&originalType=binary&ratio=1&size=69810&status=done&style=stroke&taskId=u9fe5b2b5-b0c3-4538-9ea0-f98c9da150f&width=483.5)<br />FormRender文档：[https://x-render.gitee.io/](https://x-render.gitee.io/)<br />拖拽组件时生成 FormRender 要求的数据格式，页面的渲染、组件联动关系交给 FormRender  组件去做。

- 这种方式是采用 **JSON Schema **规范的数据格式，在拖拽组件时生成这个格式的数据，以下是一个简单的 Schema  规范示例：
```javascript
{
  "type": "object",
  "properties": {
    "string": {
      "title": "字符串",
      "type": "string",
      "required": true
    },
    "select": {
      "title": "单选",
      "type": "string",
      "enum": [
        "a",
        "b",
        "c"
      ],
      "enumNames": [
        "选项1",
        "选项2",
        "选项3"
      ],
      "widget": "radio"
    }
  }
}
```
![image.png](https://cdn.nlark.com/yuque/0/2021/png/168170/1635770914420-be588e66-16ec-4faa-8452-c6b5117a7747.png#clientId=u686e53f7-d2c0-4&from=paste&height=422&id=u21e3908d&originHeight=844&originWidth=1788&originalType=binary&ratio=1&size=102926&status=done&style=stroke&taskId=u9a47c924-aa3c-4c06-ac3f-df6ba5dd409&width=894)
<a name="WXL3r"></a>
#### 2.4 备案分析
**对于方案一和方案二**：

- 对于监听

proxy方案更通用；组件监听方式，需要根据组件类型在多处设置事件监听，不利于维护。

- 显示条件判断和设置

方案一将执行语句写在一起，执行的代码更加简便，但是解析更复杂，更不容易读懂。<br />方案二将执行语句拆成：判断语句、符合条件执行语句、不符合条件执行语句，从结构上更容易理解和维护，但是执行的时候多了一个拼接语句的过程。<br />**对于方案三：**

- 这种方式将复杂的联动关系交给组件底层去做，我们只需按要求生成 Schema 规范的数据即可。
- x-render 提供了自定义组件用法，可以根据自己的需求扩展组件，这种能力使得后续需跨终端的需求变得不再困难，只需在数据层上做一层包装即可。
### 3. 组件自我校验
略
### 4. 已生成模块表单的数据提交
#### 4.1 快照方式
```javascript
[
    {
        "key": "name",
        "type": "Input",
      	"value": "我是一个值",
       	"show": true,
    },
    {
        "key": "gender",
        "type": "Radio",
        "value": "male",
        "show": false,
        "options": [
            { "name": "男", "value": "male" },
            { "name": "女", "value": "female" }
        ],
      	"listener": {
        				"condition": "getValue(select,gender) === 'male'",
          			"set": "currentTarget.show=true;currentTarget.value='';getValue(select,gender) === 'male'",
          			"elseSet": "currentTarget.show=false;"
         }
    }
]
```

#### 4.2 仅提交关键数据
最终显示需要结合表单模板，组合成1方式的数据结构（优点，冗余少）
```javascript
[
    {
        "key": "name",
      	"value": "我是一个值",
    },
    {
        "key": "gender",
        "value": "male",
    }
]
```