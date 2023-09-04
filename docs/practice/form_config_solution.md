---
sidebar: auto
---

# 表单配置可视化实践

<a name="p7rlX"></a>
## 1. 项目背景
**真实世界受试者录入**<br />真实世界研究包含了：真实世界研究、真实世界证据和真实世界数据三大模块。其中的真实世界数据，是非常重要的一环。真实世界数据可以来源患者的病历，也可以来源一些随访问卷等。其中的问卷、病历或者是随访，其实都是一个个可视化表单，表单意味着信息的初始来源，是第一手数据的载体。

**现有CRF表单的痛点**<br />现阶段，我们系统内的OCR处理、病历打标、不良反应问卷和量表，都是通过写死一套套不同场景的表单来实现，复杂度高，工作量繁琐并且大量都是重复性操作。

**公司现有表单场景部分截图**<br />![决策展示](https://cdn.nlark.com/yuque/0/2022/png/168170/1657173669722-a83965fe-71df-4808-8cf2-ea0e1acd2918.png#clientId=uf980f38c-c55c-4&from=paste&height=720&id=u5d976f99&originHeight=1440&originWidth=2560&originalType=binary&ratio=1&rotation=0&showTitle=true&size=14770974&status=done&style=stroke&taskId=u57c994a4-7cc4-45ae-a96f-a9d1281d63a&title=%E5%86%B3%E7%AD%96%E5%B1%95%E7%A4%BA&width=1280 "决策展示")<br />![病历打标](https://cdn.nlark.com/yuque/0/2022/png/168170/1657174429875-15c6cfe5-c7ca-408f-b4ed-09c33b5a9f2e.png#clientId=uf980f38c-c55c-4&from=paste&height=579&id=uf15db770&originHeight=1158&originWidth=2560&originalType=binary&ratio=1&rotation=0&showTitle=true&size=11878331&status=done&style=stroke&taskId=u3a29d813-602d-48c2-92a7-8316daf40e0&title=%E7%97%85%E5%8E%86%E6%89%93%E6%A0%87&width=1280 "病历打标")<br />![不良反应问卷-填写](https://cdn.nlark.com/yuque/0/2022/png/168170/1657174388536-136044bf-059e-4f9d-aef8-762b830eac3e.png#clientId=uf980f38c-c55c-4&from=paste&height=754&id=ue6b2a537&originHeight=2560&originWidth=1189&originalType=binary&ratio=1&rotation=0&showTitle=true&size=12197691&status=done&style=stroke&taskId=u8dbe23e4-fd68-41bd-8a8d-32d15a0c696&title=%E4%B8%8D%E8%89%AF%E5%8F%8D%E5%BA%94%E9%97%AE%E5%8D%B7-%E5%A1%AB%E5%86%99&width=350 "不良反应问卷-填写")![不良反应问卷-详情](https://cdn.nlark.com/yuque/0/2022/png/168170/1657174410048-bf54a593-7967-40e6-b494-4a97a03ab5ca.png#clientId=uf980f38c-c55c-4&from=paste&height=757&id=uda4d909b&originHeight=2560&originWidth=1183&originalType=binary&ratio=1&rotation=0&showTitle=true&size=9102777&status=done&style=stroke&taskId=u1e39f521-01a2-413a-b605-ec7670f085d&title=%E4%B8%8D%E8%89%AF%E5%8F%8D%E5%BA%94%E9%97%AE%E5%8D%B7-%E8%AF%A6%E6%83%85&width=350 "不良反应问卷-详情")
<a name="kToeq"></a>
## 2. 目标功能

1. 实现一个可自定义配置的表单配置平台。
2. 能支持内部系统应用场景如病历打标的表单配置，承载各个业务线的简单表单和问卷需求。
3. 支持真实世界研究自定义复杂表单配置。
<a name="qFs8N"></a>
## 3. 成果展示
lego 线下：[https://lego.aistarfish.net/#/](https://lego.aistarfish.net/#/)<br />lego 线上：[https://lego.aistarfish.com/#/](https://lego.aistarfish.com/#/)<br />决策展示系统：[https://sfportal.aistarfish.net/bcresearch/show/#/csco/list/13?phone=13588154556](https://sfportal.aistarfish.net/bcresearch/show/#/csco/list/13?phone=13588154556)<br />不良反应问卷应用：[https://dtx.aistarfish.com/admin/patient-education/#/](https://dtx.aistarfish.com/admin/patient-education/#/)<br />表单渲染工具库：[https://aistarfish.yuque.com/engpvq/ts9qw5/iy8aym](https://aistarfish.yuque.com/engpvq/ts9qw5/iy8aym)<br />lego 接入文档：[https://aistarfish.yuque.com/engpvq/ts9qw5/vi8cr6](https://aistarfish.yuque.com/engpvq/ts9qw5/vi8cr6)
<a name="VLJY5"></a>
## 3. 技术难点分析
<a name="m2PeC"></a>
### 3.1 表单联动

- 表单联动监听
   - 组件同时被多个组件所关联
   - 组件同时设置了关联逻辑，由关联了其他其他的跳转逻辑
   - 组件不同选项设置了不同逻辑的跳转逻辑，选项切换时该如何恢复
- 组件展示执行
<a name="A5rb9"></a>
### 3.2 数据结构定义

- 参考 json-scheme 数据结构定义方式
<a name="ifFsN"></a>
## 4. 关键技术选型和思考
<a name="VDEFu"></a>
### 方案分析
<a name="fKNje"></a>
####  [https://aistarfish.yuque.com/engpvq/ts9qw5/sx77wb](https://aistarfish.yuque.com/engpvq/ts9qw5/sx77wb)
<a name="L9XOl"></a>
### 最终方案
![image.png](https://cdn.nlark.com/yuque/0/2022/png/168170/1647162923827-ce4a9327-8476-43fd-b3e9-f7a0a1f4d32f.png#clientId=u0d6c1478-08d0-4&from=paste&height=289&id=MJOmy&originHeight=578&originWidth=1124&originalType=binary&ratio=1&rotation=0&showTitle=false&size=71382&status=done&style=stroke&taskId=ud9f5b65e-e2d4-453a-be84-30efbd702bf&title=&width=562)<br />通过 proxy 监听数据的变化，当依赖的组件的值修改时， 使用 eval 函数执行对应的语句实现联动功能。

- show：控制组件的展示和隐藏属性。
- showCondition：组件的显示条件（js语句）。
- value：组件值。

show 控制UI组件的展示，showCondition 记录了组件的显示条件，当依赖组件发生变化时，执行 showCondition 的脚本，通过脚本的执行结果设置 show 或者 value 的值。
<a name="VRueX"></a>
## 5. 关键技术点
<a name="Bl7ql"></a>
### 5.1 proxy
<a name="T3gYk"></a>
#### 概述
![image.png](https://cdn.nlark.com/yuque/0/2022/png/168170/1657181316428-48a44a17-b7e2-4c2c-9b39-8ee6b4e67fd9.png#clientId=uf980f38c-c55c-4&from=paste&height=149&id=RrNPR&originHeight=298&originWidth=1192&originalType=binary&ratio=1&rotation=0&showTitle=false&size=121963&status=done&style=stroke&taskId=u7ebca2ae-6c71-457e-8737-ae7acacdd6b&title=&width=596)
<a name="iDxyE"></a>
#### 示例
```javascript
var obj = new Proxy({}, {
  get: function (target, propKey, receiver) {
    console.log(`getting ${propKey}!`);
    return Reflect.get(target, propKey, receiver);
  },
  set: function (target, propKey, value, receiver) {
    console.log(`setting ${propKey}!`);
    return Reflect.set(target, propKey, value, receiver);
  }
});

obj.count = 1
//  setting count!
++obj.count
//  getting count!
//  setting count!
//  2
```
![image.png](https://cdn.nlark.com/yuque/0/2022/png/168170/1657181620832-b7d6b0ef-75fe-4555-b4f5-8aeb7934e3ef.png#clientId=uf980f38c-c55c-4&from=paste&height=307&id=u670dc2d0&originHeight=614&originWidth=880&originalType=binary&ratio=1&rotation=0&showTitle=false&size=107823&status=done&style=stroke&taskId=u67c469e9-8d1f-4c98-8807-9c139d618e6&title=&width=440)
<a name="uQQbA"></a>
#### 应用场景
<a name="ldaXF"></a>
##### mobx
<a name="BHRDg"></a>
##### vue3
```javascript
function createReactiveObject(
  target: Target,
  isReadonly: boolean,
  baseHandlers: ProxyHandler<any>,
  collectionHandlers: ProxyHandler<any>,
  proxyMap: WeakMap<Target, any>
) {
  if (!isObject(target)) {
    if (__DEV__) {
      console.warn(`value cannot be made reactive: ${String(target)}`)
    }
    return target
  }
  // target is already a Proxy, return it.
  // exception: calling readonly() on a reactive object
  if (
    target[ReactiveFlags.RAW] &&
    !(isReadonly && target[ReactiveFlags.IS_REACTIVE])
  ) {
    return target
  }
  // target already has corresponding Proxy
  const existingProxy = proxyMap.get(target)
  if (existingProxy) {
    return existingProxy
  }
  // only specific value types can be observed.
  const targetType = getTargetType(target)
  if (targetType === TargetType.INVALID) {
    return target
  }
  const proxy = new Proxy(
    target,
    targetType === TargetType.COLLECTION ? collectionHandlers : baseHandlers
  )
  proxyMap.set(target, proxy)
  return proxy
}
```
```javascript
/**
 * Define a reactive property on an Object.
 */
export function defineReactive(
  obj: object,
  key: string,
  val?: any,
  customSetter?: Function | null,
  shallow?: boolean,
  mock?: boolean
) {
  const dep = new Dep()

  const property = Object.getOwnPropertyDescriptor(obj, key)
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  const getter = property && property.get
  const setter = property && property.set
  if (
    (!getter || setter) &&
    (val === NO_INIITIAL_VALUE || arguments.length === 2)
  ) {
    val = obj[key]
  }

  let childOb = !shallow && observe(val, false, mock)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      const value = getter ? getter.call(obj) : val
      if (Dep.target) {
        if (__DEV__) {
          dep.depend({
            target: obj,
            type: TrackOpTypes.GET,
            key
          })
        } else {
          dep.depend()
        }
        if (childOb) {
          childOb.dep.depend()
          if (isArray(value)) {
            dependArray(value)
          }
        }
      }
      return isRef(value) && !shallow ? value.value : value
    },
    set: function reactiveSetter(newVal) {
      const value = getter ? getter.call(obj) : val
      if (!hasChanged(value, newVal)) {
        return
      }
      if (__DEV__ && customSetter) {
        customSetter()
      }
      if (setter) {
        setter.call(obj, newVal)
      } else if (getter) {
        // #7981: for accessor properties without setter
        return
      } else if (isRef(value) && !isRef(newVal)) {
        value.value = newVal
        return
      } else {
        val = newVal
      }
      childOb = !shallow && observe(newVal, false, mock)
      if (__DEV__) {
        dep.notify({
          type: TriggerOpTypes.SET,
          target: obj,
          key,
          newValue: newVal,
          oldValue: value
        })
      } else {
        dep.notify()
      }
    }
  })

  return dep
}
```

- proxy **VS** Object.defineproperty

![image.png](https://cdn.nlark.com/yuque/0/2022/png/168170/1657189644889-25d9f322-f410-4d2b-91a8-ddd91c07eef0.png#clientId=uda86c7f2-a671-4&from=paste&height=312&id=uc3de0c9d&originHeight=624&originWidth=1560&originalType=binary&ratio=1&rotation=0&showTitle=false&size=119625&status=done&style=none&taskId=u496b99dc-1107-4729-afb5-2f204924603&title=&width=780)
<a name="XFqQ3"></a>
### 5.2 eval
<a name="ugJHJ"></a>
#### 概述
eval() 函数计算 JavaScript 字符串，并把它作为脚本代码来执行。<br />如果参数是一个表达式，eval() 函数将执行表达式。如果参数是Javascript语句，eval()将执行 Javascript 语句。

- 执行Javascript语句

![image.png](https://cdn.nlark.com/yuque/0/2022/png/168170/1657180468824-1aaf5468-7e5b-4e2e-8450-48b093c247ee.png#clientId=uf980f38c-c55c-4&from=paste&height=99&id=hA8ql&originHeight=198&originWidth=978&originalType=binary&ratio=1&rotation=0&showTitle=false&size=37044&status=done&style=stroke&taskId=u54522e00-9024-456c-86bc-33f6501dacb&title=&width=489)

- 执行表达式

![image.png](https://cdn.nlark.com/yuque/0/2022/png/168170/1657180810652-85a79781-88e0-40b7-931b-3ececce632e8.png#clientId=uf980f38c-c55c-4&from=paste&height=119&id=b1hh8&originHeight=238&originWidth=1236&originalType=binary&ratio=1&rotation=0&showTitle=false&size=38685&status=done&style=stroke&taskId=u4a112fc1-0b66-448d-849e-78470164d7e&title=&width=618)
<a name="e7eBv"></a>
#### 使用示例

- form-render：[https://e.gitee.com/aistarfish/repos/aistarfish/form-render/sources](https://e.gitee.com/aistarfish/repos/aistarfish/form-render/sources)
- formula-edit：[https://e.gitee.com/aistarfish/repos/aistarfish/formula-edit/sources](https://e.gitee.com/aistarfish/repos/aistarfish/formula-edit/sources)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/168170/1657182481540-9d7499a8-4f61-4e30-af21-bdf128caa92b.png#clientId=uf980f38c-c55c-4&from=paste&height=382&id=u092f2783&originHeight=764&originWidth=570&originalType=binary&ratio=1&rotation=0&showTitle=false&size=56411&status=done&style=stroke&taskId=u63585871-5d18-4e59-8e39-b22e5032187&title=&width=285)
<a name="iz07y"></a>
## 6. 具体实现
<a name="OZVjq"></a>
### 6.1 具体实现
<a name="nTxzM"></a>
#### 6.1.1 数据结构设计
[https://aistarfish.yuque.com/engpvq/ts9qw5/wau8d1](https://aistarfish.yuque.com/engpvq/ts9qw5/wau8d1)
<a name="FZgQg"></a>
#### 6.1.2 关键实现逻辑
<a name="PoRl8"></a>
##### 控件展示逻辑
控件展示受制于跳题逻辑和关联逻辑，为此设计了 jumpShow，relevanceShow 分别控制，只有当二者同时为true 时该控件的 show 为 true 。<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/168170/1647229433319-7f24e79a-71f3-4899-9c21-728c4f053a9d.png#clientId=u934d5a92-29a5-4&from=paste&height=469&id=ua509c0e2&originHeight=938&originWidth=1718&originalType=binary&ratio=1&rotation=0&showTitle=false&size=188884&status=done&style=none&taskId=u46d47fe7-2b9a-4402-8e85-1c56c62ef2e&title=&width=859)<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/168170/1647229453989-e0d1178e-31c1-4529-80dc-d2aa0602e047.png#clientId=u934d5a92-29a5-4&from=paste&height=370&id=u787d3bcf&originHeight=740&originWidth=1528&originalType=binary&ratio=1&rotation=0&showTitle=false&size=136600&status=done&style=none&taskId=u2e88362a-f8d4-4fb9-9c07-6afe30863dd&title=&width=764)
<a name="EFzZI"></a>
##### 逻辑表达式生成与执行
页面初始化时根据表单配置生成逻辑表达式，在符合条件时执行。
```javascript
// 根据设置的跳题条件生成跳题表达式
    generateJumpTemp = (item, formList) => {
        let tempOfJump = '';
        const { jumpCondition } = item;
        const maxTargetId = this.getMaxTargetId(jumpCondition, formList);
        /**
         * 拼接后的表达式如：
         * let value=this.getValueById('co1');
         * if (this.isEqual(value, 0))  {
         *    this.setJumpShow('co1','co3', 'co4');
         * } else if (this.isEqual(value, '1')) {
         *    this.setJumpShow('co1', 'co4', 'co4');
         * } else if (this.isEqual(value, 2)) {
         *    this.setJumpShow('co1', 'co2', 'co4');
         * } else {
         *    this.setJumpShow('co1', 'all', 'co4');
         * }
         */
        if (isChoiceTopic(item.type)) { // 选择题
            tempOfJump = `let value = this.getValueById('${item.id}');`;
            // 无条件跳题
            if (jumpCondition.jumpWay === 'straight') {
                tempOfJump += `if(value?.length){this.setJumpShow('${item.id}', '${jumpCondition.unconditionalTargetId}', '${maxTargetId}')}`;
                tempOfJump += `else{this.setJumpShow('${item.id}', 'all', '${maxTargetId}');}`;
            }
            // 按选项跳题
            if (jumpCondition.jumpWay === 'option') {
                const { targetMap = [] } = jumpCondition;
                if (!targetMap?.length) return false;
                targetMap.forEach((mapItem, mapIndex) => {
                    if (mapIndex === 0) {
                        tempOfJump += 'if';
                    } else {
                        tempOfJump += 'else if';
                    }
                    tempOfJump += `(this.isEqual(value, '${mapItem.selectedValue}')){this.setJumpShow('${item.id}', '${mapItem.dependId}', '${maxTargetId}');}`;
                });
                tempOfJump += `else{this.setJumpShow('${item.id}', 'all', '${maxTargetId}');}`;
            }
        } else if (item.type === 'componentGroup') { // 组合题
            tempOfJump = `let hasCompleted = this.getHasCompletedById('${item.id}');`;
            tempOfJump += `if(hasCompleted){this.setJumpShow('${item.id}', '${jumpCondition.unconditionalTargetId}', '${maxTargetId}')}`;
            tempOfJump += `else{this.setJumpShow('${item.id}', 'all', '${maxTargetId}');}`;
        } else if (['date', 'time'].includes(item.type)) { // 日期
            tempOfJump = `let value = this.getValueById('${item.id}');`;
            tempOfJump += `if(value){this.setJumpShow('${item.id}', '${jumpCondition.unconditionalTargetId}', '${maxTargetId}')}`;
            tempOfJump += `else{this.setJumpShow('${item.id}', 'all', '${maxTargetId}');}`;
        } else { // 填空题
            tempOfJump = `let hasCompleted = this.getHasCompletedById('${item.id}');let value = this.hasValue('${item.id}');`;
            tempOfJump += `if(hasCompleted && value){this.setJumpShow('${item.id}', '${jumpCondition.unconditionalTargetId}', '${maxTargetId}')}`;
            tempOfJump += `else{this.setJumpShow('${item.id}', 'all', '${maxTargetId}');}`;
        }
        jumpCondition.tempOfJump = tempOfJump;
    }
    
     // 执行 js 表达式
    execStringScript = (string) => {
        eval(string);
    };
```
<a name="xHy1t"></a>
##### 表单控件监听
通过使用 proxy 实现监听，但是为了避免过度监听，造成性能损耗，只监听关键属性。
```javascript
// 监听form 数据
export const proxy = (data, valueChangeCb, showChangeCb) => new Proxy(data, {
    set: (target, key, value) => {
        Reflect.set(target, key, value);
        if (key === 'value' || key === 'hasCompleted') {
            valueChangeCb(target, key);
        }
        if (key === 'jumpShow' || key === 'relevanceShow') {
            showChangeCb(target, key);
        }
        if (key === 'show') {
            valueChangeCb(target, key);
        }
        // TNM、address、LWHFill value 值是对象类型
        if (objectValueKey.includes(key)) {
            valueChangeCb(target, key, false);
        }
        return true;
    },
});


// 源数据是一个数组，我们需要对数组里每一项的第一层做监听，故在此加一层监听
export const arrayProxy = (obj, valueChangeCb, showChangeCb) => {
    if (typeof obj === 'object') {
        for (const key in obj) {
            if (typeof obj[key] === 'object') {
                // 问题组
                if (obj[key].type === 'componentGroup') {
                    // 深度监听问题组内每一组
                    arrayProxy(obj[key].components, valueChangeCb, showChangeCb);
                    obj[key].components.forEach(groupItem => {
                        // 深度监听问题组内每一个控件
                        arrayProxy(groupItem, valueChangeCb, showChangeCb);
                    })
                }
                obj[key] = proxy(obj[key], valueChangeCb, showChangeCb);
                // value 是对象类型，需要深度监听
                if (['TNM', 'address', 'LWHFill'].includes(obj[key].type)) {
                    obj[key].value = proxy(obj[key].value, valueChangeCb, showChangeCb);
                }
            }
        }
    }
    return obj;
};
```
<a name="iHvnA"></a>
##### 组件关联关系集合
页面初始化时收集所有组件间的关联关系，避免每次组件值变化时都得去查找所有相关联的组件，减少了损耗。
```javascript
/**
 * 组件间的关联关系集合, key是被依赖组件id, value 是所有依赖了组件的集合。如现有关联关系如下：
 * 组件1选择了选项2时，组件3和组件4显示。==> 组件3、4依赖组件1。得到的集合如下：
 * {
 *   'co1': {
 *     'co3': "if(!this.isAllShow(['6877137817890197504'])){this.setRelevanceShow('6877138157351997440', false);}else{....}",
 *     'co4': "if(!this.isAllShow(['6877137817890197504'])){this.setRelevanceShow('6877138157351997440', false);}else{....}",
 *   }
 * }
 *
 * @returns {Map<any, any>}
 * @param formList
 */
export const getRelevanceMap = (formList) => {
    const relevanceMap = new Map();
    const traverseList = (list) => {
        list.forEach(item => {
            const { relevanceCondition } = item;
            if (isNotEmptyObject(relevanceCondition)) {
                relevanceCondition.conditionList?.forEach(listItem => {
                    const { dependId } = listItem;
                    const currentId = item.id;
                    const relevanceInfo = relevanceMap.get(dependId) || {};
                    relevanceInfo[currentId] = relevanceCondition.tempOfRelevance;
                    relevanceMap.set(dependId, relevanceInfo);
                });
            }
            if (item.type === 'componentGroup') {
                item.components.forEach(groupItem => {
                    traverseList(groupItem);
                });
            }
        });
    };
    traverseList(formList);
    return relevanceMap;
};
```
<a name="PDlI6"></a>
##### 组件信息集合
页面初始化时收集了控件信息，避免每次控件执行时都得去遍历获取组件信息，减少了损耗。
```javascript
/**
   * 收集表单控件信息
   * @param preventForm
   */
  @action setPreviewComponentIdMap = (preventForm: []) => {
    const componentIdMap = new Map();
    const traverseList = (list: any, parentId = null, groupIndex = null) => {
      list.forEach((item: object, index: number) => {
        componentIdMap.set(item.id, {
          parentId,
          index,
          groupIndex,
        });
        if (item.type === 'componentGroup') {
          item.components.forEach((groupItem, groupIndex) => {
            traverseList(groupItem, item.id, groupIndex);
          });
        }
      });
    };
    traverseList(preventForm);
    this.previewComponentIdMap = componentIdMap;
  }
```
<a name="vlb7S"></a>
##### 关联关系清除
组件拖动时，可能会导致之前设置好的关联关系变为异常，因而有必要清除异常的关系。对于异常关系的处理，使用了 Map，简洁高效。
```javascript
/**
 * 清除异常关联的核心方法。
 *
 * 1. 关联题，只能关联前面题，否则就是异常，需要删除这段关系
 * 2. 跳题，只能跳到该题后面，否则就是异常，需要删除这段关系
 *
 * @param editingFormList 表单列表 数据结构：https://aistarfish.yuque.com/engpvq/ts9qw5/mv37ha#J2xCJ
 * @param isClear true： 如果存在异常，则直接清除；false:如果存在异常，不清除，只是返回true
 * @returns {*} 返回是否存在异常
 */
export const clearLogicSetting = (editingFormList, isClear) => {
    // 已遍历的id set
    const traversedIdSet = new Set();
    for (const item of editingFormList) {
        // 清除异常的关联关系
        if (isNotEmptyObject(item.relevanceCondition)) {
            const { conditionList } = item.relevanceCondition;
            for (let i = 0; i < conditionList.length; i += 1) {
                // 不存在，说明该题关联了此题后面的题，关系异常
                if (!traversedIdSet.has(conditionList[i].dependId)) {
                    // 不清除，直接返回关系异常
                    if (!isClear) return true;
                    // 否则直接删除此关系
                    conditionList.splice(i, 1);
                    i -= 1;
                }
            }
            if (!conditionList.length) {
                item.relevanceCondition = {};
            }
        }
        // 清除异常的跳题关系
        if (isNotEmptyObject(item.jumpCondition)) {
            const { jumpWay } = item.jumpCondition;
            // 直接跳题或者题目填写完成时跳题
            if (jumpWay === 'straight' || jumpWay === 'finishFill') {
                // 若存在，说明该题跳题设置了此题前面的题，关系异常
                if (traversedIdSet.has(item.jumpCondition.unconditionalTargetId)) {
                    if (!isClear) return true;
                    item.jumpCondition.unconditionalTargetId = undefined;
                    item.jumpCondition = {};
                }
            } else if (jumpWay === 'option') { // 按选项跳题
                const { targetMap } = item.jumpCondition;
                for (let i = 0; i < targetMap.length; i += 1) {
                    // 若存在，说明该题跳题设置了此题前面的题，关系异常
                    if (traversedIdSet.has(targetMap[i].dependId)) {
                        if (!isClear) return true;
                        targetMap.splice(i, 1);
                        i -= 1;
                    }
                }
                if (!targetMap.length) {
                    item.jumpCondition = {};
                }
            }
        }
        clearHasLogicProp(item);
        traversedIdSet.add(item.id);
    }
    // 没有存在异常
    return false;
};

```
<a name="LBHRF"></a>
## 7. 项目遇到问题
<a name="phfMY"></a>
### 数据过多时，页面卡顿
```javascript
render() {
    const { item, index, previewForm } = this.props;
    return (
      <div className="form-item preview-component">
        <div className="title-wrapper">
          {
            item.required && (<span className="item-required">*</span>)
          }
        </div>
        <div className="preview-content">
          <FDTitle item={item} />
          {
            (() => {
                switch (item.type) {
                  case 'radio':
                    return (
                      <FPRadio index={index} previewForm={previewForm} updatePreviewForm={this.updatePreviewForm.bind(this)} />
                    );
                  case 'select':
                    return (
                      <FPSelect index={index} previewForm={previewForm} updatePreviewForm={this.updatePreviewForm.bind(this)} />
                    );
                  case 'checkbox':
                    return <FPCheckbox index={index} previewForm={previewForm} updatePreviewForm={this.updatePreviewForm.bind(this)} />;
                  case 'multipleSelect':
                    return <FPMultipleSelect index={index} previewForm={previewForm} updatePreviewForm={this.updatePreviewForm.bind(this)} />;
                  case 'singleFill':
                    return <FPSingleFill index={index} previewForm={previewForm} updatePreviewForm={this.updatePreviewForm.bind(this)} />;
                  case 'LWHFill':
                    return <FPLWHFill index={index} previewForm={previewForm} updatePreviewForm={this.updatePreviewForm.bind(this)} />;
                  case 'mobilePhone':
                    return <FPInputBox index={index} previewForm={previewForm} icon="icon-shoujihaoma" updatePreviewForm={this.updatePreviewForm.bind(this)} />;
                  case 'fixPhone':
                    return <FPFixPhone index={index} previewForm={previewForm} updatePreviewForm={this.updatePreviewForm.bind(this)} />;
                  case 'IDCard':
                    return <FPInputBox index={index} previewForm={previewForm} icon="icon-shenfenzheng" updatePreviewForm={this.updatePreviewForm.bind(this)} />;
                  case 'address':
                    return <FPAddress index={index} previewForm={previewForm} updatePreviewForm={this.updatePreviewForm.bind(this)} />;
                  case 'date':
                    return <FPDate index={index} previewForm={previewForm} updatePreviewForm={this.updatePreviewForm.bind(this)} />;
                  case 'time':
                    return <FPTime index={index} previewForm={previewForm} updatePreviewForm={this.updatePreviewForm.bind(this)} />;
                  case 'TNM':
                    return <FPTNM index={index} previewForm={previewForm} updatePreviewForm={this.updatePreviewForm.bind(this)} />;
                  case 'componentGroup':
                    return <Group index={index} previewForm={previewForm} updatePreviewForm={this.updatePreviewForm.bind(this)} />;
                  default:
                    break;
                }
            })()
          }
        </div>
      </div>
    );
  }
```
```javascript
constructor(props) {
    super(props);
    this.updatePreviewForm = this.updatePreviewForm.bind(this);
}

render() {
  return (
    switch (item.type) {
      case 'radio':
        return (
          <FPRadio index={index} previewForm={previewForm} updatePreviewForm={this.updatePreviewForm} />
        );
      case 'select':
        return (
          <FPSelect index={index} previewForm={previewForm} updatePreviewForm={this.updatePreviewForm} />
        );
      case 'checkbox':
        return <FPCheckbox index={index} previewForm={previewForm} updatePreviewForm={this.updatePreviewForm} />;
      case 'multipleSelect':
        return <FPMultipleSelect index={index} previewForm={previewForm} updatePreviewForm={this.updatePreviewForm} />;
      case 'singleFill':
        return <FPSingleFill index={index} previewForm={previewForm} updatePreviewForm={this.updatePreviewForm} />;
      case 'LWHFill':
        return <FPLWHFill index={index} previewForm={previewForm} updatePreviewForm={this.updatePreviewForm} />;
      case 'mobilePhone':
        return <FPInputBox index={index} previewForm={previewForm} icon="icon-shoujihaoma" updatePreviewForm={this.updatePreviewForm} />;
      case 'fixPhone':
        return <FPFixPhone index={index} previewForm={previewForm} updatePreviewForm={this.updatePreviewForm} />;
      case 'IDCard':
        return <FPInputBox index={index} previewForm={previewForm} icon="icon-shenfenzheng" updatePreviewForm={this.updatePreviewForm} />;
      case 'address':
        return <FPAddress index={index} previewForm={previewForm} updatePreviewForm={this.updatePreviewForm} />;
      case 'date':
        return <FPDate index={index} previewForm={previewForm} updatePreviewForm={this.updatePreviewForm} />;
      case 'time':
        return <FPTime index={index} previewForm={previewForm} updatePreviewForm={this.updatePreviewForm} />;
      case 'TNM':
        return <FPTNM index={index} previewForm={previewForm} updatePreviewForm={this.updatePreviewForm} />;
      case 'componentGroup':
        return <Group index={index} previewForm={previewForm} updatePreviewForm={this.updatePreviewForm} />;
      default:
        break;
    }
  )
}
  

```
updatePreviewForm 回调函数作为 prop 传入子组件时，这些组件可能会进行额外的重新渲染。所以将事件在构造器中绑定避免了这类性能问题。
<a name="fLn5y"></a>
### npm link 报错
<a name="LrrWE"></a>
#### 背景
应用项目A和 npm 项目B都使用了 react 或者 react-dom 时，当 A 引用了 B，启动项目 A 会报错误。那是由于在项目中使用了不同版本的 react。 
<a name="SENYp"></a>
#### 解决方案
原因是由于使用了 npm link 后，项目中出现了多个版本的react，所以应避免有多版本的 react、react-dom。

操作步骤：<br />进入 A 项目，进入到项目中的 node_modules 下的 react、react-dom，执行 npm link；<br />进入B项目，执行 Npm link react react-dom。
<a name="XvDSb"></a>
## 8. 不足
由于 Form Render 是通过 store 管理的数据，所以在一个组件中只能同时展示一个表单。对于此问题你能看到的现象就是，当你的组件中想要同时渲染多个表单时，所有渲染出的表单都是获取到的最后一份表单配置。
<a name="ZJgIL"></a>
## 9. 未来规划
快速交付表单类功能，沉淀平台能力。