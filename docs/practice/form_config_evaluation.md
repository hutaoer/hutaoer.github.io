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

### 属性列表
| **基本属性** |  |  |  |
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
| **type 类型** |  |  |  |
| 控件所属类别 classify |  |  | 说明 |
| choice | radio |  | 平铺单选 |
|  | checkbox |  | 平铺多选 |
|  | select |  | 下拉单选 |
|  | multipleSelect |  | 下拉多选 |
| fill | singleFill |  | 单项填空 |
|  | LWHFill |  | 长宽高填空 |
| personalInfo | mobilePhone |  | 手机号码 |
|  | fixPhone |  | 固话 |
|  | address |  | 地址 |
|  | date |  | 日期 |
|  | time |  | 时间 |
|  | IDCard |  | 身份证 |
|  | TNM |  | TNM情况 |
|  | chemoTime |  | 化疗时间 |
| other | componentGroup |  | 控件组 |
|  |  |  |  |
| **单选/多选控件个性化属性** |  |  |  |
| 选项数据源 | dataSource | label/custom | 标签/自定义 |
| 选项平铺行个数 | optionsNum | 整数 |  |
| 选项id | id | 文本 | option特有配置 |
| 选项code | code | 文本 |  |
| 选项名称 | label |  |  |
| 选项备注 | remark |  |  |
| 选项是否允许填空 | isAllowFill |  |  |
| 选项填空是否必填 | isFillRequired |  |  |
| 是否为默认选项 | isDefaultValue |  |  |
| 选项填空提示语 | allowFillPlaceholder |  |  |
| 选项填空内容 | fillRemark |  |  |
|  |  |  |  |
| **多选控件特有** |  |  |  |
| 选项排他 | exclusive | true/false | option特有配置 |
| 最小选择数 | leastOptional | 整数 | 值为-1时不限 |
| 最大选择数 | mostOptional | 整数 | 值为-1时不限 |
|  |  |  |  |
| **填空控件个性化属性** |  |  |  |
| 输入框样式属性 | inputUI | Object |  |
|  |  |  |  |
| **inputUI** |  |  |  |
| 输入框类型 | inputType | unlimited/noVerify/number | 不限/不验证/数字 |
| 输入框大小 | inputSize | small/medium/big | 小/中/大 |
|  |  |  |  |
| **长宽高特有** |  |  |  |
| 控件默认值 | value | { <br />length: '', <br />width: '',<br />height: '' <br />} |  |
|  |  |  |  |
| **地址特有** |  |  |  |
| 精确度 | accuracy | province/city/area/detail | 省份/城市/区县/详细地址 |
| 控件默认值 | value | {<br />province: '',<br />city: '',<br />area: '',<br />detail: ''<br />} |  |
|  |  |  |  |
| **日期特有** |  |  |  |
| 精确度 | accuracy | year/month/day | 年/月/日 |
|  |  |  |  |
| **时间特有** |  |  |  |
| 是否使用12小时制 | use12Hours | true/false |  |
|  |  |  |  |
| **TNM 特有** |  |  |  |
| 控件默认值 | value | { T: TCode, N: NCode, M: MCode} |  |
| 癌种 | cancerType |  |  |
| 阶段 | phase |  |  |
| T选项列表 | TOptions | [{ code: '', label: '' }, ...] |  |
| M选项列表 | MOptions | [{ code: '', label: '' }, ...] |  |
| N选项列表 | NOptions | [{ code: '', label: '' }, ...] |  |
|  |  |  |  |
| **化疗时间特有** |  |  |  |
| 周期 | cycle | 1/2/3/4 | 单周/双周/三周/四周 |
| 次数 | time | <br /> | <br /> |
|  |  |  |  |
| **jumpCondition，控件设置了跳题逻辑时特有** |  |  |  |
| 跳转方式 | jumpWay | straight/option/finishFill | 无条件跳题/按选项跳题/填写完成 |
| 无条件跳题时的目标控件id | unconditionalTargetId |  | jumpWay=straight/finishFill 时特有 |
| 按条件跳题的条件集合 | targetMap | Array | jumpWay=option特有 |
| 当前控件的类型 | type |  | targetMap 子集属性 |
| 跳题目标控件id | dependId |  |  |
| 跳题条件 | selectedValue | 选择题题型特有 |  |
| 按选项跳题中设置的最远题的id | maxTargetId |  | jumpWay=option特有 |
| 依赖控件id 的集合 | dependIds | Array |  |
|  |  |  |  |
| **relevanceCondition，控件设置了关联关系时特有** |  |  |  |
| 关联关系 | logic | 0/1 | 且/或 |
| 关联条件集合 | conditionList | Array |  |
| 关联控件的类型 | type |  | conditionList 子集属性 |
| 关联控件id | dependId |  |  |
| 关联控件选项值 | selectedValue | 选择题题型特有 |  |
| 依赖控件值集合关系 | relationship | 0-全部选中，1-任一 |  |
| 依赖控件id 的集合 | dependIds | Array |  |
|  |  |  |  |
| **控件组属性** |  |  |  |
| 控件组标题 | title | 文本 |  |
| 控件id | id | 文本 |  |
| 控件组展示 | groupShow | true/false | 控制控件组是否展示 |
| 组内控件列表 | components | [] |  |
|  |  |  |  |
| **check** |  |  |  |
| 是否数值限制 | valueLimit | true/false | <br /> |
| 是否字数限制 | wordLimit | true/false |  |
| 是否位数限制 | digitLimit | true/false |  |
| 是否显示默认值 | hasDefaultValue | true/false |  |
| 是否开启日期范围控制 | rangeDate | true/false |  |
| 最小值 | minValue | 文本 | type为singleFill、LWHFillphone特有配置,值为“unlimited”时不限 |
| 最大值 | maxValue | 文本 |  |
| 最小文本长度 | leastWords | Number | type=singleFill特有配置，值为-1时不限 |
| 最大文本长度 | mostWords | Number |  |
| 可选日期开始日期 | rangeStartDate |  | type=date特有配置 |
| 可选日期结束日期 | rangeEndDate |  |  |
| 小数点位数 | digitNumber |  |  |
| 正则表达式 | pattern |  | <br /> |
|  |  |  |  |


## 各类题型的数据结构

* 以下是各种题型的数据结构示例

### 选择题（单选）
```js
[
  {
    id: 'co1', // 组件的唯一标识,将使用雪花算法生成，长度19位，如"6865885865546092544"
    code: 'co1', // 组件code, 一个表单内 code 不可重复
    type: 'select', // 组件类型
    title: '组件标题', // 组件标题
    titleRemark: '标题备注', // 标题备注
    value: '', // 组件值
    required: true, // 组件是否必填
    rule: [], // 校验规则
    show: true, // 组件最终展示
    jumpShow: true, // 跳题逻辑结果
    relevanceShow: true, // 关联逻辑结果
    jumpCondition: { // 跳题逻辑
      jumpWay: 'straight', // 是否无条件跳
      unconditionalTargetId: 'co3', // 跳转目标组件的id，跳到问卷末尾id值为 'end'
      targetMap: [
        { // 当选择选项1时, 跳转到co3
          type: 'select',
          dependId: 'co3', // 依赖组件的id
          selectedValue: '0',
        },
         { // 当选择选项2时, 跳转到co4
          type: 'select',
          dependId: 'co4', // 依赖组件的id
          selectedValue: '1',
        },
         { // 当选择选项3时, 跳转到co2
          type: 'select',
          dependId: 'co2', // 依赖组件的id
          selectedValue: '2',
        }
      ],
      dependIds: ['co2', 'co3', 'co4'],
      maxTargetId: 'co4', // 条件跳题设置的最远题的id
      tempOfJump: "let value=this.getValueById('co1');if (this.isEqual(value, 0)) { this.setJumpShow('co1','co3', 'co4'); } else if (this.isEqual(value, '1')){ this.setJumpShow('co1', 'co4', 'co4') }else if (this.isEqual(value, 2)){ this.setJumpShow('co1', 'co2', 'co4') }", // 根据设置跳题逻辑生成的执行语句，通过 getJsonToScript() 生成
    },
    optionsNum: 5, // 选项平铺展示时，每行个数
    options: [
      {
        code: 0, // 选项code
        label: '选项1', // 选项 label
        remark: '选项说明', // 选项备注
        isAllowFill: true, // 是否允许填写文本
        isFillRequired: true, // 文本填写是否必填
        isDefaultValue: true, // 是否默认选中
        img: '//xxx.png', // 选项图片
      },
      {
        code: 1, // 选项code
        label: '选项2', // 选项 label
        remark: '选项说明', // 选项备注
        isAllowFill: true, // 是否允许填写文本
        isFillRequired: true, // 文本填写是否必填
        isDefaultValue: true, // 是否默认选中
        img: '//xxx.png', // 选项图片
      },
      {
        code: 2, // 选项code
        label: '选项3', // 选项 label
        remark: '选项说明', // 选项备注
        isAllowFill: true, // 是否允许填写文本
        isFillRequired: true, // 文本填写是否必填
        isDefaultValue: true, // 是否默认选中
        img: '//xxx.png', // 选项图片
      },
    ],
  },
  {
    id: 'co2', // 组件的唯一标识
    type: 'input', // 组件类型
    title: '组件标题', // 组件标题
    titleRemark: '组件副标题', // 标题备注
    value: '',
    required: true, // 组件是否必填
    show: true, // 组件最终展示
    jumpShow: true, // 跳题逻辑结果
    relevanceShow: true, // 关联逻辑结果
    rule: [], // 校验规则
    // 输入框填写类型, 小数、日期、手机、固化、手机或固化、省份城市、省市区、身份证号、汉字、英文、中文姓名、英文数字
    inputType: ' integer' // integer-整数、decimal-小数、date-日期...
  },
  {
    id: 'co4', // 组件的唯一标识
    type: 'input', // 组件类型
    title: '组件4', // 组件标题
    titleRemark: '组件副标题', // 标题备注
    value: '',
    required: true, // 组件是否必填
    rules: [],
    show: false,
    jumpShow: true,
    relevanceShow: true,
    relevanceCondition: {
      currentId: 'co4',
      logic: 0, // 关联关系，0为且，1为或
      conditionList: [ // 组件4只有组件1选择选项1,且组件3选择了选项1和选项2的时候才展示
        {
          type: 'select',
          dependId: 'co1', // 依赖组件的id
          selectedValue: 'xuanxiang1',
        },
        {
          type: 'checkbox',
          dependId: 'co3', // 依赖组件的id
          selectedValue: ['xuanxiang1', 'xuanxiang2'],
        },
        {
          type: 'componentGroup',
          dependId: 'co2',
        }
      ],
      dependIds: ['co1', 'co3', 'co2'],
      tempOfRelevance: "if(!this.isAllShow(['co1', 'co3'])){this.setRelevanceShow('co4', false);} else { if(this.isEqual(this.getValueById('co1'), 'xuanxiang1') && (this.isEqual(this.getValueById('co3'), ['xuanxiang1', 'xuanxiang2']))) { this.setRelevanceShow('co4', true) } else { this.setRelevanceShow('co4', false) }}",
    },
  },
]
```

### 选择题（多选）
* 和单选题控件的数据结构相比，多选项的数据结构主要有以下几点不同：
  - 增加最少可选 `leastOptional` 属性，值为`-1`时为不限；
  - 增加最多可选 `mostOptional` 属性，值为`-1`时为不限；
  - `value` 类型由字符串转变为数组类型；
  - `jumpCondition` 中 `targetMap` 的 `selectedValue `由字符串转变为数组类型；
  - 选项增加排他属性 `exclusive`, 值为`true`是表示勾选了排他。
```js
{
    id: 'co1', // 组件的唯一标识,将使用雪花算法生成，长度19位，如"6865885865546092544"
    type: 'checkbox', // 组件类型
    title: '组件标题', // 组件标题
    titleRemark: '标题备注', // 标题备注
    value: [0, 1], // 组件默认值
    required: true, // 组件是否必填
    leastOptional: 1, // 最少选择1项
    mostOptional: 3, // 最多选择3项
    rule: [], // 校验规则
    show: true, // 组件最终展示
    jumpShow: true, // 跳题逻辑结果
    relevanceShow: true, // 关联逻辑结果
    jumpCondition: { // 跳题逻辑
      currentId: 'co1',
      jumpWay: 'straight', // 是否无条件跳
      noConditionJumpTargetId: 'co3', // 跳转目标组件的id，跳到问卷末尾id值为 'end'
      targetMap: [
        { // 当选择选项1、2时, 跳转到co3
          type: 'select',
          targetId: 'co3', // 目标组件的id
          selectedValue: ['0', '1'],
        },
         { // 当选择选项2、3时, 跳转到co4
          type: 'select',
          targetId: 'co4', // 目标组件的id
          selectedValue: ['1', '2'],
        },
         { // 当选择选项1、3时, 跳转到co2
          type: 'select',
          targetId: 'co2', // 目标组件的id
          selectedValue: ['0','1'],
        }
      ],
      maxTargetId: 'co4', // 条件跳题设置的最远题的id
      tempOfJump: "let value=this.getValueById('co1');if (this.isEqual(value, 0)) { this.setJumpShow('co1','co3', 'co4'); } else if (this.isEqual(value, '1')){ this.setJumpShow('co1', 'co4', 'co4') }else if (this.isEqual(value, 2)){ this.setJumpShow('co1', 'co2', 'co4') }", // 根据设置跳题逻辑生成的执行语句，通过 getJsonToScript() 生成
    },
    optionsNum: 5, // 选项平铺展示时，每行个数
    options: [
      {
        id: 0,
        code: 0, // 选项code
        label: '选项1', // 选项 label
        remark: '选项说明', // 选项备注
        isAllowFill: true, // 是否允许填写文本
        isFillRequired: true, // 文本填写是否必填
        isDefaultValue: true, // 是否默认选中
        img: '//xxx.png', // 选项图片
        exclusive: true, // 排他
      },
      {
        id: 1,
        code: 1, // 选项code
        label: '选项2', // 选项 label
        remark: '选项说明', // 选项备注
        isAllowFill: true, // 是否允许填写文本
        isFillRequired: true, // 文本填写是否必填
        isDefaultValue: true, // 是否默认选中
        img: '//xxx.png', // 选项图片
        exclusive: false, // 排他
      },
      {
        id: 2,
        code: 2, // 选项code
        label: '选项3', // 选项 label
        remark: '选项说明', // 选项备注
        isAllowFill: true, // 是否允许填写文本
        isFillRequired: true, // 文本填写是否必填
        isDefaultValue: true, // 是否默认选中
        img: '//xxx.png', // 选项图片
        exclusive: true, // 排他
      },
    ],
  },
```

### 填空题
```js
[
    // 单项填空
    {
        id: 'co1', // 组件的唯一标识,将使用雪花算法生成，长度19位，如"6865885865546092544"
        type: 'singleFill', // 组件类型
        title: '组件标题', // 组件标题
        classify: 'fill',
        titleRemark: '标题备注', // 标题备注
        value: '', // 组件默认文本
        required: true, // 组件是否必填
        show: true, // 组件最终展示
        jumpShow: true, // 跳题逻辑结果
        relevanceShow: true, // 关联逻辑结果
      	inputUI: {
      		inputType: 'number', // 输入框类型：unlimited-不限，noVerify-不验证, number-数字
        	inputSize: 'small', // 输入框大小：small-小，medium-中，big-大
        },
      	check: {
          valueLimit: false, // 是否数值限制
          wordLimit: true, // 是否字数限制
          digitLimit: true, // 是否位数限制
          hasDefaultValue: false, // 是否显示默认文本
          leastWords: -1, // 最少填写字数，值为-1时为不限
          mostWords: 10, // 最多填写字数，值为-1时为不限
          minValue: 0, // 最小值，unlimited 时不限
          maxValue: 'unlimited', // 最大值，unlimited 时不限
        	digitNumber: 0, // 小数点位数限制
        }
        jumpCondition: {
            targetMap: [
                {
                    type: 'singleFill',
                    dependId: 'co4',
                }
            ],
            dependIds: ['co4'],
        },
        relevanceCondition: {
            conditionList: [
                {
                    type: 'singleFill',
                    dependId: 'co2',
                }
            ],
            dependIds: ['co2'],
        }
    },
    // 长宽高填空
    {
        type: 'LWHFill', // 长宽高填空
        value: {
            length: '10',
            width: '20',
            height: '30',
        },
        check: {
      			minValue: 0, // 最小值
        		maxValue: 0, // 最大值
        }
    },
    // 手机号码
    {
        type: 'mobilePhone',
        check: {
          pattern: /^1[3-9][0-9]{9}$/
        }
    },
    // 固话
    {
        type: 'fixPhone',
        check: [
          {
        		 pattern: /([0-9]{3,4}-)?[0-9]{7,8}/,
          },
          
        ]
    },
    // 地址
    {
        type: 'address',
        accuracy: 'detail', // 精确度：province-省份，city-城市，area-区县，detail-详细地址
        value: {
            province: '',
            city: '',
            area: '',
            detail: '',
        },
        check: {
          hasDefaultValue: false,
        }
    },
    // 日期
    {
        type: 'date',
        accuracy: 'date', // 精确度：year-年，month-月，date-日
        value: '',
        check: {
          rangeDate: false,
          rangeStartDate: '',
        	rangeEndDate: '',
        }
    },
    // 时间
    {
        type: 'time',
        value: '',
        use12Hours: false, // 是否使用12小时制
        check: {
          hasDefaultValue: false,
        }
    },
    // 身份证
    {
        type: 'IDCard',
        value: '',
        classify: 'personalInfo', // 个人信息
        check: {
        	pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
        },
    },
    // TMN 填空
    {
        type: 'TMN',
        cancerType: '', // 癌种
        phase: '', // 阶段
        value: {t:'', n: '', m: ''},
      	TOptions: [
          {
            name: 't1',
            code: 't1'
          },
          {
            name: 't2',
            code: 't2'
          }
       ],
       MOptions: [
         {
            name: 'm1',
            code: 'm1'
          },
          {
            name: 'm2',
            code: 'm3'
          }
       ],
       NOptions: [
         {
            name: 'n1',
            code: 'n1'
          },
          {
            name: 'n2',
            code: 'n3'
          }
       ]
    }
]
```
### 控件组
```js
[
  {
    id: '6865885865546092544', // 控件组Id
    type: 'componentGroup', // 控件组类型
    title: '化疗史', // 控件组标题
    jumpCondition: { // 跳题逻辑
      jumpWay: 'finishFill', // 填写完成时
      unconditionalTargetId: 'co3', // 跳转目标组件的id，跳到问卷末尾id值为 'end'
      dependIds: ['co3'],
      maxTargetId: 'co3', // 条件跳题设置的最远题的id
      tempOfJump: "let value=this.getValueById('co1');if (this.isEqual(value, 0)) { this.setJumpShow('co1','co3', 'co4'); } else if (this.isEqual(value, '1')){ this.setJumpShow('co1', 'co4', 'co4') }else if (this.isEqual(value, 2)){ this.setJumpShow('co1', 'co2', 'co4') }", // 根据设置跳题逻辑生成的执行语句，通过 getJsonToScript() 生成
    },
    components: [
      {
        id: 'co1',
        label: '有无化疗史',
        type: 'radio',
        groupId: '6865885865546092544',
        show: true,
        jumpShow: true,
        relevanceShow: true,
        jumpCondition: [
          {
            currentId: 'co1',
            targetMap: {
              0: 'co2',
              1: 'end',
            },
            maxTargetId: 'co2',
          }
        ]
      },
      {...}, // 其他控件
      {
        id: 'co2',
        type: 'table',
        groupId: '6865885865546092544',
        minLength: 1,
        maxLength: 20,
        components: [
          {
            id: '',
            label: '化疗性质',
            type: 'radio',
            show: true,
          },
          {
            id: '',
            label: '化疗方案',
            type: 'input',
            show: true,
          },
          {...} // 其他控件
        ]
      }
    ]
  }
]
```

### 定制化组件

* 化疗时间
* ![1](https://static.aistarfish.com/front-release/file/F2023091111073852800002499.1.png)
```js
[
  {
    id: 'co1', // 组件的唯一标识,将使用雪花算法生成，长度19位，如"6865885865546092544"
    code: 'co1', // 组件code, 一个表单内 code 不可重复
    type: 'chemoTime', // 组件类型
    title: '组件标题', // 组件标题
    titleRemark: '标题备注', // 标题备注
    value: '', // 组件值
    required: true, // 组件是否必填
    show: true, // 组件最终展示
    jumpShow: true, // 跳题逻辑结果
    relevanceShow: true, // 关联逻辑结果
    jumpCondition: { // 跳题逻辑
      jumpWay: 'straight', // 是否无条件跳
      unconditionalTargetId: 'co3', // 跳转目标组件的id，跳到问卷末尾id值为 'end'
      targetMap: [
        { // 当选择选项1时, 跳转到co3
          type: 'select',
          dependId: 'co3', // 依赖组件的id
          selectedValue: '0',
        },
         { // 当选择选项2时, 跳转到co4
          type: 'select',
          dependId: 'co4', // 依赖组件的id
          selectedValue: '1',
        },
         { // 当选择选项3时, 跳转到co2
          type: 'select',
          dependId: 'co2', // 依赖组件的id
          selectedValue: '2',
        }
      ],
      dependIds: ['co2', 'co3', 'co4'],
      maxTargetId: 'co4', // 条件跳题设置的最远题的id
      tempOfJump: "let value=this.getValueById('co1');if (this.isEqual(value, 0)) { this.setJumpShow('co1','co3', 'co4'); } else if (this.isEqual(value, '1')){ this.setJumpShow('co1', 'co4', 'co4') }else if (this.isEqual(value, 2)){ this.setJumpShow('co1', 'co2', 'co4') }", // 根据设置跳题逻辑生成的执行语句，通过 getJsonToScript() 生成
    },
    optionsNum: 5, // 选项平铺展示时，每行个数
    frequency: 3, // 次数
  }
]
```

x

## 表单业务流程

### 迭代示例
* ![9](//static.aistarfish.com/front-release/file/F2023091111313969000003017.9.png)
### 表单状态机
* ![8](https://static.aistarfish.com/front-release/file/F2023091111295672200008670.8.png)
* 草稿态：从表单创建到正式发布之前，表单都处于该种状态
* 上线态：草稿态表单正式发布后或者已下线的表单重新上线后处于的状态
* 下线态：上线态表单下线后处于的状态

### 表单处理流程

### 创建
* 新建表单的时候，会生成一个表单锁。
* ![3](https://static.aistarfish.com/front-release/file/F2023091111283097600004909.3.svg)

### 编辑
#### 编辑正在草稿态的表单
* 用户可以直接编辑草稿态表单，不支持并发编辑，编辑每个表单都会需要拿到唯一的编辑表单锁，才能进行编辑。
* ![2](https://static.aistarfish.com/front-release/file/F2023091111232661200003983.2.svg)

#### 重新编辑发布上线的表单
* 用户可以基于某个已经上线的表单版本进行再编辑
* ![](https://static.aistarfish.com/front-release/file/F2023091111283097100001388.4.svg)

### 保存表单/完成编辑
* 保存表单，表单状态不变，会对表单的全量内容做先删后加的操作，最后会释放对该表单的锁定。
* ![](https://static.aistarfish.com/front-release/file/F2023091111283097400001373.5.svg)

### 发布表单
* 发布表单，表单会从草稿态变成上线态，且不可逆转。发布表单前，也会首先获取到表单锁，防止表单还存在正在被人编辑的情况。
* ![](https://static.aistarfish.com/front-release/file/F2023091111283097700004533.6.svg)

### 获取表单锁
* 每个表单都会存在唯一一个表单锁。当检查锁时：如果锁有效且所属人为当前用户，则获取成功。当遇到争抢当前锁的情况，会利用数据库的主键冲突和定义锁版本（乐观锁）保证锁的唯一性和有效性。
* ![](https://static.aistarfish.com/front-release/file/F2023091111283099300000520.7.svg)

## 特殊逻辑处理
* 从交互逻辑上是不允许设置双向关联关系的，前端的代码逻辑没有做双向绑定的判断，因而没有对这种情况做特殊处理。所以当返回的数据存在双向绑定关系时，预览页面会因为进入死循环而崩溃。
* 处理方法：
  - 后端保存时对数据依赖关系做校验；
  - 出现双向绑定时，前端对此做特殊处理。当控件间存在异常的关联关系时(跳题逻辑直接关联此题之后的题目，关联只能关联此题前面的题，违反了此条件视为异常)，清除异常的关联关系。

### 后端实现方案
* 由前端传过来的控件存在依赖关系，为了防止存在双向依赖，需要通过校验，防止出现依赖闭环出现。其实是在一堆有向节点中，将有向节点路径找出闭环来。
* 具体步骤：
  - 1.记录所有的依赖节点和依赖关系
  - 2.构建依赖模型，初始化有向树（或者构建一个矩阵）
  - 3.循环递归遍历每个节点的所有依赖（深度优先）

### 前端实现方案
* 可以跟进依赖关系，构建一个链表的数据，然后判断有无环。
```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
    let p1 = head
    let p2 = head
    while(p1 && p2 && p2.next) {
        p1 = p1.next
        p2 = p2.next.next
        if(p1 === p2) {
            return true
        }
    }
    return false
};
```
* 参考`leecode`:https://leetcode.cn/classic/problems/linked-list-cycle/description

## 三方库使用
* 拖拽库: `react-beautiful-dnd`