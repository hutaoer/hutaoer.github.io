---
sidebar: auto
category: 实践
tags:
  - 低代码
  - 表单配置化
---

# 表单配置化实践

## 1. 项目背景
* 真实世界研究包含了：真实世界研究、真实世界证据和真实世界数据三大模块。其中的真实世界数据，是非常重要的一环。真实世界数据可以来源患者的病历，也可以来源一些随访问卷等。其中的问卷、病历或者是随访，其实都是一个个可视化表单，表单意味着信息的初始来源，是第一手数据的载体。

* 现阶段，我们系统内的OCR处理、病历打标、不良反应问卷和量表，都是通过写死一套套不同场景的表单来实现，复杂度高，工作量繁琐并且大量都是重复性操作。

* 业务现有表单场景部分截图
  - 决策展示：
  - ![决策展示](https://static.aistarfish.com/front-release/file/F2023090516302246700009580.1.png)
  - 病历打标：
  - ![病历打标](https://static.aistarfish.com/front-release/file/F2023090516382733400006407.2.png)
  - 问卷填写：
  - ![不良反应问卷-填写](https://static.aistarfish.com/front-release/file/F2023090516342941500004443.3.png)
## 2. 目标

1. 实现一个可自定义配置的表单配置平台。
2. 能支持内部系统应用场景如病历打标的表单配置，承载各个业务线的简单表单和问卷需求。
3. 支持真实世界研究自定义复杂表单配置。

## 成果展示
### 表单编辑态
* ![编辑](https://static.aistarfish.com/front-release/file/F2023090517340410900003427.6.png)

### 表单预览态
* ![预览](https://static.aistarfish.com/front-release/file/F2023090517340412500000825.5.png)

### 填空题属性配置
* ![](https://static.aistarfish.com/front-release/file/F2023091114140308800001705.logic_edit.png)

### 填空题逻辑配置
* ![](https://static.aistarfish.com/front-release/file/F2023091114140300900009515.property_edit.png)

### 整体框架
* 顶部对表单进行保存，预览，和发布。
* 左侧展示现有的组件模块
* 右侧为静态组件展示区域

## 3. 核心逻辑实现
### 3.1 表单编辑
* 根据用户拖拽的组件，展示对应的静态样式（这里不需要展示完整逻辑，仅是对属性、逻辑进行编辑）
* 点击每个静态组件卡片，可以对组件的选项、逻辑进行编辑
* 编辑模式示例代码
```js
<div className={classNames('content-wrapper', { maxWidth: editForm })}>
    <Droppable droppableId="editPanel">
      {(provided) => (
        <div
          className="droppable-wrapper"
          ref={provided.innerRef}
        >
          <div className="content-box">
            {/* 表单标题 */}

            {
              this.state.formType === 'normal' && <FDHeadline />
            }

            {editingFormList.map((item, index) => (
              <Draggable
                key={item.id}
                draggableId={item.id}
                index={index}
              >
                {/* eslint-disable-next-line no-shadow */}

                {(provided, snapshot) => (
                  <div
                    id={item.id}
                    className={`form-item-wrapper ${(currentOperationInfo.index === index || snapshot.isDragging) ? 'active' : ''}`}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onClick={() => this.handleCardClick(item, index)}
                  >
                    <div className={classNames('form-item', { maxWidth: editForm })}>
                    {/* 对每种类型的组件进行展示 */}
                      <ComponentRender cRef={ref => renderRefs[index] = ref} editInfo={item} edit={false} editIndex={index} />
                    </div>

                    <OperateFormItem
                      index={index}
                      handleLogicSetting={() => this.handleLogicSetting(item, index)}
                    />
                  </div>
                )}
              </Draggable>
            ))}

            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>

    {/* 编辑属性弹框 */}

    <EditPropertyModal
      onRef={ref => this.editPropertyModal = ref}
      editList={editingFormList}
      editInfo={currentEditInfo}
      editIndex={currentEditIndex}
      hideModal={(editInfo, editIndex) => this.hideEditPropertyModal(editInfo, editIndex)}
    />

    {/* 逻辑设置弹框 */}

    <EditLogicModal
      cRef={ref => this.editLogicModal = ref}
      fromGroup={false}
      editList={editingFormList}
      editInfo={currentEditInfo}
      editIndex={currentEditIndex}
    />
  </div>

```

### 3.2 表单预览
* 表单预览是一个单独的npm二方包，本质上，乐高搭建后台，最重要的作用是编辑问卷数据。当有了数据后，可以在任何地方进行拼装。
* 比如客户端、web端、小程序端，所以为了满足问卷在更多场景下的渲染，我们把渲染的逻辑，单独抽取为一个npm包：`form-render`

### 3.3 表单联动

- 表单联动监听
   - 组件同时被多个组件所关联
   - 组件同时设置了关联逻辑，由关联了其他其他的跳转逻辑
   - 组件不同选项设置了不同逻辑的跳转逻辑，选项切换时该如何恢复
- 组件展示执行

### 3.4 数据结构定义

- 参考 `json-scheme` 数据结构定义方式

## 4. 关键技术选型和思考

### 方案分析
* [拖拽式表单生成方案](/practice/drag_form_generate.md)

### 最终方案
* ![image.png](https://static.aistarfish.com/front-release/file/F2023090516451181100009803.4.png)
* 通过 Proxy 监听数据的变化，当依赖的组件的值修改时， 使用 eval 函数执行对应的语句实现联动功能。
  - show：控制组件的展示和隐藏属性。
  - showCondition：组件的显示条件（js语句）。
  - value：组件值。

* show 控制UI组件的展示，showCondition 记录了组件的显示条件，当依赖组件发生变化时，执行 showCondition 的脚本，通过脚本的执行结果设置 show 或者 value 的值。
## 5. 关键技术点
### 5.1 Proxy
#### 概述
* `Proxy` 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”(meta programming) ，即对编程语言进行编程。
* `Proxy` 可以理解成，在目标对象之前架设一层“拦截"，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。Proxy这个词的原意是代理，用在这里表示由它来"代理”某些操作，可以译为"代理器”

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
![7.png](https://static.aistarfish.com/front-release/file/F2023090517365880300008760.7.png)
#### 应用场景
* Vue3中
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
* Vue2中
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

- Proxy **VS** Object.defineProperty

![image.png](https://static.aistarfish.com/front-release/file/F2023090610595019800004060.11.png)

### 5.2 eval
* eval() 函数计算 JavaScript 字符串，并把它作为脚本代码来执行。<br />如果参数是一个表达式，eval() 函数将执行表达式。如果参数是Javascript语句，eval()将执行 Javascript 语句。
* 执行Javascript语句
* ![image.png](https://static.aistarfish.com/front-release/file/F2023090611031335400002924.12.png)
* 执行表达式
* ![image.png](https://static.aistarfish.com/front-release/file/F2023090611031335400006714.13.png)

#### 使用示例

- form-render：[https://e.gitee.com/aistarfish/repos/aistarfish/form-render/sources](https://e.gitee.com/aistarfish/repos/aistarfish/form-render/sources)
- formula-edit：[https://e.gitee.com/aistarfish/repos/aistarfish/formula-edit/sources](https://e.gitee.com/aistarfish/repos/aistarfish/formula-edit/sources)
- 展示效果如下：
  - ![image.png](https://static.aistarfish.com/front-release/file/F2023090611052108200001426.14.png)

## 6. 实现

### 6.1 数据结构设计
详见：[表单配置化方案评估](/practice/form_config_evaluation.md)

### 6.2 关键实现逻辑

### 控件展示逻辑
控件展示受制于跳题逻辑和关联逻辑，为此设计了 jumpShow，relevanceShow 分别控制，只有当二者同时为true 时该控件的 show 为 true 。
![image.png](https://static.aistarfish.com/front-release/file/F2023090615043696800004628.15.png)
![image.png](https://static.aistarfish.com/front-release/file/F2023090615043694900000574.16.png)

### 逻辑表达式生成与执行
* 页面初始化时根据表单配置生成逻辑表达式，在符合条件时执行。
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

### 表单控件监听
* 通过使用 proxy 实现监听，但是为了避免过度监听，造成性能损耗，只监听关键属性。

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

### 组件关联关系集合
* 页面初始化时收集所有组件间的关联关系，避免每次组件值变化时都得去查找所有相关联的组件，减少了损耗。
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

### 组件信息集合
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

### 关联关系清除
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

## 7. 问题

### 数据过多时，页面卡顿
* 原因：`updatePreviewForm`方法，会多次执行bind方法
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
* 解决：修改为统一的绑定
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
`updatePreviewForm` 回调函数作为 `prop` 传入子组件时，这些组件可能会进行额外的重新渲染。所以将事件在构造器中绑定避免了这类性能问题。

### npm link 报错
* 场景：
  - 应用项目A和 `npm` 项目B都使用了 `react` 或者 `react-dom` 时，当 A 引用了 B，启动项目 A 会报错误。那是由于在项目中使用了不同版本的 `react`。 
* 解决方案：
  - 原因是由于使用了 `npm link` 后，项目中出现了多个版本的 `react`，所以应避免有多版本的 `react、react-dom`。
* 操作步骤：
  - 进入 A 项目，进入到项目中的 `node_modules` 下的 `react、react-dom`，执行 `npm link`；
  - 进入 B 项目，执行 `npm link react react-dom`。

## 8. 待优化
* 由于 `Form Render` 是通过 `store` 管理的数据，所以在一个组件中只能同时展示一个表单。对于此问题你能看到的现象就是，当你的组件中想要同时渲染多个表单时，所有渲染出的表单都是获取到的最后一份表单配置。
* 快速交付表单类功能，沉淀平台能力。
* 去掉对`mobx`的依赖
* `form-render`去掉对渲染库的依赖，在需要使用的地方，比如mobile, pc端，在项目中，可以独自引入`antd`和`antd-mobile`，但需要在npm的`peerDependency`中做好依赖声明，减少包体积大小。