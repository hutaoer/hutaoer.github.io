---
sidebar: auto
category: 实践
heroText: null  # 禁用标题
tagline: null   # 禁用副标题
tags:
  - 低代码
  - 表单配置化
---

# 表单配置化方案评估

## 表单控件类型
* 表单中的基本控件类型包含以下几种：

| 控件名称 | 说明 |
| --- | --- |
| 单选 | 支持单选的控件 |
| 多选 | 支持多选的控件 |
| 填空 | 支持多类型格式的填空控件：文本、整数、日期、手机号、固话、省份城市、省市区、身份证号码、地址、时间 |
| 表格填空 | 可支持定制化表格 |
| TNM分期 | 定制化分期控件 |
| 长宽高控件 | 定制化长宽高控件 |

## 表单控件属性
* 单个控件的属性包含：基础属性、`rules`、`jumpCondition` 和 `relevanceCondition`。基础属性为各个控件共通的描述，`rules`为控件校验信息，`jumpCondition` 为控件的跳题逻辑，relevanceCondition 为控件的关联逻辑。<br />其中，基础属性是每个控件必须包含的，其他属性若没有配置则不需要。

### 基本属性
| --- | --- | --- | --- |
| 属性名 | 类型type | 值 | 说明 |
| ID | id | 字符串 | 生成的 id 如 "6865885865546092544" |
| 控件code | code | 文本 |  |
| 控件类型 | type | 文本 | 具体的类型值见下方 |
| 控件归属类别 | classify | 文本 | choice-选择题，fill-填空题，personalInfo-个人信息，other-其他题型 |
| 标题 | title | 文本 |  |
| 是否有标题备注 | hasTitleRemark | Boolean |  |
| 组件标题备注 | titleRemark | 文本 |  |
| 是否必填 | required | true/false |  |
| 组件默认值，没有默认值为空 | value |  | 选择题value类型为数组，LWHFill、TNM、地址控件value 类型值是Object, 填空题类型为 string |
| 组件的展示与否 | show |  |  |
| 跳转 | jumpShow |  | 根据跳题逻辑执行的组件展示的结果，默认值都为 true |
| 关联显示 | relevanceShow |  | 根据关联逻辑执行的结果，当设置了关联逻辑时，值为 false |
| 跳转条件 | jumpCondition | json | <br /> |
| 关联条件 | relevanceCondition | json | <br /> |
| 控件校验规则 | check | Object |  |
|  |  |  |  |