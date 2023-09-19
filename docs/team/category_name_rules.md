---
sidebar: auto
category: 团队
date: 2022-12-17
tags:
  - 目录文件命名 
---

# 目录文件命名规范
## 项目命名
*【强制】全部使用小写字母，单词之间使用中划线进行分隔，避免使用拼音。对于业内统一认知的单词，可以使用缩写。比如f2e代表前端（front to end），dtx代表数字疗法（Digital Therapeutics， DTx），pc 代表桌面web端，h5代表移动web端。命名务必要精练，见名知意。
* 例如：
  - 数疗个案管理平台：`case-management`
  - 数疗H5仓库：`f2e-dtx-h5`
  - 数疗患教素材管理项目：`patient-education`
  - 社区业务H5：`content-line-mobile-h5`（可以不用加这个`line`）

## 目录命名
*【强制】React 项目中，`components/pages` 目录下的目录名使用`UpperCamelCase`风格，即大驼峰写法。即 `components/pages` 下的目录都是代表着组件，目录名下面放一个 `index.jsx` (非 index.js)作为入口文件。
*【强制】如果组件下还需要做进一步的组件拆分，可以再建一个 `components` 目录或者通过文件名来标识为组件，这时候文件名也使用 `UpperCamelCase`风格。示例:
```powershell
components/ListView/index.jsx // 公共组件入口文件
pages/Home/index.jsx // 入口文件
pages/Home/Components/Banner/index.jsx  // 组件入口文件
pages/Home/Components/Banner/index.scss // 样式入口
pages/Home/Components/List/index.jsx  // 组件入口文件
pages/Home/Components/List/index.less
```
*【推荐】非页面或组件的目录，使用小驼峰命名。示例
```powershell
src/layout/main/index.js
src/entry/caseManager/pages/
```

## 文件命名
【建议】文件名中包含多个单词时，使用小驼峰写法。示例：

```powershell
src/constants/doctorApi.js
src/utils/commonTools.js
src/styles/safeArea.scss
src/services/followUp.js
public/planManange.html  // 计划管理页面模板
public/departmentNotice.html  // 科室通知页面模板
```

## 引用规范
【强制】 公共文件引入(组件 图片等)等单独拎文件夹 不能跨目录引入，这样的写法别人修改组件A的代码会影响到页面B，可能额导致bug或故障，影响点的评估也可能被遗忘。示例：
```jsx
// 组件A所在的目录为，src/pages/Home/components/ComponentB/index.jsx
// 组件B所在的目录为，src/pages/PlanManage/components/ComponentB/index.jsx
// 在组件B中，不能直接跨目录引入Home下的组件A
import ComponentA from 'src/pages/Home/components/ComponentB/'
```
两种方式处理：<br />1.把组件A放到公共组件目录下，必要的话，需要对代码做重构。<br />2.单独把组件A放到B的页面中，保持独立。