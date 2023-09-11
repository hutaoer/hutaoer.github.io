---
sidebar: auto
category: 实践
tags:
  - 微前端 
---
# 运营后台微前端改造
## 背景
* 现有的运营后台，从项目创建至今，有 `1459` 天，提交 `3096` 次代码，现有代码 `205116` 行，共有 `125` 个页面。已经成为了一个巨石应用，有着诸多的问题，比如编译慢，团队间代码权限未隔离，技术栈升级困难，加载速度慢。维护难度和成本随着时间不停累加，没有上限，非常痛苦，简直就是：`屎山上雕花`。
* 巨石应用需要拆解变成一个个小应用。而微前端的诞生，能帮我们解决以上的问题。
* 经过技术选型使用 `qiankun` 作为基础框架，对运营后台进行微前端化升级。现有的后台将被拆解为一个主应用和若干个子应用。
* 和之前进行比较，微前端化后将有如下好处：
  - 1. 代码隔离。微应用间的代码是隔离的，这意味着代码执行的错误也只会影响单个应用并且在应用中几乎可以做到任何想做的事情（比如重构、升级等等）。
  - 2. 代码权限隔离。每个开发者只需要关注自己的微应用代码。
  - 3. 开发速度大大提升。微应用项目开发启动用时是原来的七分之一，构建用时是原来的十分之一，开发时编译用时是原来的十分之一。
* **主应用**
  - 负责基础数据获取与注入、外框架和子应用注册与启动。
* **子应用（微应用）**
  - 基础数据：患者管理，医生中心，机构管理，基础数据（医院管理），日志行为审计，账户注销处理反馈中心。路由前缀: `/basicdata`
  - 运营：服务中心 运营统计，营销管理 ，用户运营 ，视频诊室。 路由前缀: `/operation`
  - 商务中心:  商务中心。路由前缀: `/business-center`
  - 数字疗法：csco ai ，临床试验，数字疗法科室，医生中心下（科室列表 日间化疗中心 药房维护）。路由前缀: `/digital-therapeutics`
  - ocr。路由前缀: `/ocr`

## iframe的缺陷
* 在微前端框架出现之前，其实还有种方式可以用来加载不同的页面，那就是`Iframe`，但`Iframe`自身有着较多的缺陷和局限性。
* 虽然隔离性完美，但是`Iframe`同父级窗口的同学，以及同级窗口的通信，较为复杂，有着严格的限制。
* 性能和加载时间：每个 `IFrame` 都需要加载和渲染独立的 `HTML`、`CSS` 和 `JavaScript`。这意味着在加载微前端应用时，需要同时加载多个 `IFrame`，导致额外的网络请求和页面资源占用，可能会影响性能和加载时间。
* 样式和布局限制：`IFrame` 的内容在页面中是独立的，它们具有自己的 `CSS` 样式和布局上下文。这导致在微前端架构中难以实现全局样式的一致性，以及子应用之间的布局和交互的协调问题。

## 实施

### 主应用
* 提供子应用挂载节点，负责加载子应用
* 渲染公共部分菜单、导航、登录、登出，全局异常处理。
* 加载全局的基础信息，透传给子应用，比如用户登录信息。

### 代码示例 
```js
import {addGlobalUncaughtErrorHandler, registerMicroApps} from 'qiankun'

// 加载子应用
registerMicroApps(
  [
    {
      name: 'basicdata',
      entry: '/lion/basic-data',
      container: '#subapp-viewport',
      activeRule: '/lion/#/basicdata',
    },
    {
      name: 'digitalTherapeutics',
      entry: '/lion/digital-therapeutics',
      container: '#subapp-viewport',
      activeRule: '/lion/#/digital-therapeutics',
    },
    {
      name: 'businessCenter',
      entry: '/lion/business-center',
      container: '#subapp-viewport',
      activeRule: '/lion/#/business-center',
    },
    // ...
  ]
)

  /**
   * 添加全局的未捕获异常处理器
   */
  addGlobalUncaughtErrorHandler((event) => {
    const {message: msg} = event;
    // 加载失败时提示
    if (msg && msg.includes('died in status LOADING_SOURCE_CODE')) {
      render({loading: false, userInfo: {}});
    }
  });
```

### 子应用
* 将新子应用模板，通过脚手架集成，通过脚手架可直接创建。
* 脚手架改造，支持本地项目的`webpack`覆写。
* 老的项目，可以走新模板的基础，对原有代码进行迁移，并升级脚手架版本。
```js
// 子应用入口改造
function render(props) {
  // 获取主应用的props
  const { container, userInfo } = props;
  ReactDOM.render(
    <Provider {...stores}>
      <ConfigProvider locale={zh_CN}>
        <App userInfo={userInfo} />
      </ConfigProvider>
    </Provider>,
    container
      ? container.querySelector('#root')
      : document.querySelector('#root')
  );
}

if (!window.__POWERED_BY_QIANKUN__) {
  require('antd/dist/antd.css');
  render({});
}

export async function bootstrap() {
  console.log('children app bootstraped');
}

export async function mount(props) {
  render(props);
}

export async function unmount(props) {
  const { container } = props;
  ReactDOM.unmountComponentAtNode(
    container
      ? container.querySelector('#root')
      : document.querySelector('#root')
  );
}
```

### 后台公共组件封装
* 各个子应用、主应用中的公共UI组件、业务组件编写，提升开发效率和组件复用率。
* 常用公共方法封装，比如`fetch`

#### 示例代码
```js
export Page403 from './src/components/403';
export Page404 from './src/components/404';
export App from './src/components/App';
export HxMenu from './src/components/Menu';
export layoutEvnet from './src/events/layout';
export MTable from './src/components/MTable';
export MInput from './src/components/MInput';
export MInputNum from './src/components/MInputNum';
export MRadio from './src/components/MRadio';
export MSelect from './src/components/MSelect';
export MTextArea from './src/components/MTextArea';
export MSwitch from './src/components/MSwitch';
export Breadcrumb from './src/components/Breadcrumb';
export LnModal from './src/components/LnModal';
export SearchBar from './src/components/SearchBar';
export Container from './src/components/Container'
export WaterMark from "./src/components/WaterMark"
export services from './src/services';
export { get, post } from './src/services/fetch';
```

### 脚手架支持
* 新增子应用模板。
* 脚手架版本升级，支持子应用打包。

#### 示例代码
```js
function initNewProject(answers) {
  const { type, name, version, projectType } = answers;
  // 项目类型
  switch (type) {
    case "Sub App":
      install({
        name,
        version,
        template: "https://gitee.com/xxx/micro-app-template.git",
        originalDirectory: process.cwd(),
      });
      break;
    case "H5":
      install({
        name,
        version,
        template:
          projectType === "single"
            ? "https://gitee.com/xxxx/h5-template.git"
            : "https://gitee.com/xxxx/pc-template.git",
        originalDirectory: process.cwd(),
      });
      break;
    default:
      log(chalk.green("需要选择工程模版类型"));
  }
}
// 合并webpack配置文件
  try {
    const cmdWebpackConfigPath = !devArg ? path.join(process.cwd(), 'webpack.config.dev.js') : path.join(process.cwd(), `src/entry/${devArg}/webpack.config.dev.js`);
    console.log(devArg, cmdWebpackConfigPath, fs.existsSync(cmdWebpackConfigPath))
    if (fs.existsSync(cmdWebpackConfigPath)) {
      const cmdWebpackConfig = require(cmdWebpackConfigPath);
      config = mergeOneOf(cmdWebpackConfig, config);
      config = functionMerge(cmdWebpackConfig, config);
      config = merge(cmdWebpackConfig, config);
      console.log(config.externals)
    }
  } catch (err) {
    console.log(chalk.red('合并本地 webpack.config.dev.js 配置错误: '));
    console.log(chalk.cyan(err.message));
    console.log(err.stack)
    process.exit(1)
  }
```

## 原理
* `qiankun`框架给我们提供的最便利和有用的功能就是其基于配置的自动化沙箱隔离机制了。有了框架层面的子应用隔离支持，用户无论是在编写JS代码还是修改CSS样式时都不必再担心代码对于全局环境的污染问题了。沙箱机制一方面提升了微应用框架运行的稳定性和独立性，另一方面也降低了微前端开发者的心智负担，让其只需专注于自己的子应用代码开发之中。

### JS隔离
* 在`JS`隔离方面，`qiankun`为开发者提供了三种不同模式的沙箱机制，分别适用于不同的场景之中。
* 分别为：`Snapshot`,`Legacy`,`Proxy`

#### Snapshot沙箱
* 该沙箱主要用于不支持`Proxy`对象的低版本浏览器之中，`qiankun`会自动检测浏览器的支持情况并降级到`Snapshot`沙箱实现。
* 沙箱内部存在两个对象变量`windowSnapshot`和`modifyPropsMap` ，分别用来存储子应用挂载前原始`window`对象上的全部属性以及子应卸载时被其修改过的`window`对象上的相关属性。
* 在子应用`mount`时候，将`modifyPropsMap`的属性重新赋值给`window`；并在`unmount`的时候，将`windowSnapshot`的属性重新赋值给`window`，使得两个不同子应用的`window`互相独立。
* 示例代码
```js
// 基于 diff 方式实现的沙箱，用于不支持 Proxy 的低版本浏览器
export default class SnapshotSandbox implements SandBox {
  private windowSnapshot!: Window;
  private modifyPropsMap: Record<any, any> = {};

  constructor() {}

  active() {
    // 记录当前快照
    this.windowSnapshot = {} as Window;
    iter(window, (prop) => {
      this.windowSnapshot[prop] = window[prop];
    });

    // 恢复之前的变更
    Object.keys(this.modifyPropsMap).forEach((p: any) => {
      window[p] = this.modifyPropsMap[p];
    });
  }

  inactive() {
    this.modifyPropsMap = {};

    iter(window, (prop) => {
      if (window[prop] !== this.windowSnapshot[prop]) {
        // 记录变更，恢复环境
        this.modifyPropsMap[prop] = window[prop];
        window[prop] = this.windowSnapshot[prop];
      }
    });
  }
}
```

#### Legacy沙箱
* 手动配置`sandbox.loose: true`时启用。`Legacy`沙箱同样会对`window`造成污染。
* 同样`Legacy`沙箱也只适用于单例模式之中。
* 示例代码
```js
/**
 * 基于 Proxy 实现的沙箱
 * TODO: 为了兼容性 singular 模式下依旧使用该沙箱，等新沙箱稳定之后再切换
 */
export default class LegacySandbox implements SandBox {
  /** 沙箱代理的全局变量 */
  proxy: WindowProxy;
  /** 沙箱期间新增的全局变量 */
  private addedPropsMapInSandbox = new Map<PropertyKey, any>();
  /** 沙箱期间更新的全局变量 */
  private modifiedPropsOriginalValueMapInSandbox = new Map<PropertyKey, any>();
  /** 持续记录更新的(新增和修改的)全局变量的 map，用于在任意时刻做 snapshot */
  private currentUpdatedPropsValueMap = new Map<PropertyKey, any>();
  
  constructor() {
    const { addedPropsMapInSandbox, modifiedPropsOriginalValueMapInSandbox, currentUpdatedPropsValueMap } = this;
    const rawWindow = window;
    const fakeWindow = Object.create(null) as Window;

    const setTrap = (p: PropertyKey, value: any, originalValue: any) => {
      if (!rawWindow.hasOwnProperty(p)) {
        // 当前 window 对象不存在该属性，将其记录在新增变量之中
        addedPropsMapInSandbox.set(p, value);
      } else if (!modifiedPropsOriginalValueMapInSandbox.has(p)) {
        // 如果当前 window 对象存在该属性，且 record map 中未记录过，则记录该属性初始值
        modifiedPropsOriginalValueMapInSandbox.set(p, originalValue);
      }
      // 无论何种修改都记录在currentUpdatedPropsValueMap中
      currentUpdatedPropsValueMap.set(p, value);
      // 必须重新设置 window 对象保证下次 get 时能拿到已更新的数据
      (rawWindow as any)[p] = value;
    };

    const proxy = new Proxy(fakeWindow, {
      set: (_: Window, p: PropertyKey, value: any): boolean => {
        const originalValue = (rawWindow as any)[p];
        return setTrap(p, value, originalValue, true);
      },

      get(_: Window, p: PropertyKey): any {
        // avoid who using window.window or window.self to escape the sandbox environment to touch the really window or use window.top to check if an iframe context
        if (p === 'top' || p === 'parent' || p === 'window' || p === 'self') {
          return proxy;
        }
        const value = (rawWindow as any)[p];
        return value;
      },
    });
    
    this.proxy = proxy
  }
  
  active() {
    // 激活时将子应用之前的所有改变重新赋予window，恢复其运行时上下文
    this.currentUpdatedPropsValueMap.forEach((v, p) => this.setWindowProp(p, v));
  }

  inactive() {
    // 卸载时将window上修改的值复原，新添加的值删除
    this.modifiedPropsOriginalValueMapInSandbox.forEach((v, p) => this.setWindowProp(p, v));
    this.addedPropsMapInSandbox.forEach((_, p) => this.setWindowProp(p, undefined, true));
  }
  
  private setWindowProp(prop: PropertyKey, value: any, toDelete?: boolean) {
    if (value === undefined && toDelete) {
      delete (this.globalContext as any)[prop];
    } else {
      (this.globalContext as any)[prop] = value;
    }
  }
}

```

#### Proxy沙箱
* `Proxy`沙箱是默认使用的沙箱模式（也可以通过配置`sandbox.loose: false`来开启），该模式真正做到了对`window`的无污染隔离，因此可以被应用在单/多例模式之中。
* 它将`window`上的所有属性遍历拷贝生成一个新的`fakeWindow`对象，并使用`Proxy代理`该对象。用户对`window`操作全部被拦截下来，仅作用在`fakeWindow`上。
* 示例代码
```js
// 便利window拷贝创建初始代理对象
function createFakeWindow(globalContext: Window) {
  const fakeWindow = {} as FakeWindow;
  Object.getOwnPropertyNames(globalContext)
    .forEach((p) => {
      const descriptor = Object.getOwnPropertyDescriptor(globalContext, p);
      rawObjectDefineProperty(fakeWindow, p, Object.freeze(descriptor));
    });
  return { fakeWindow };
}

/**
 * 基于 Proxy 实现的沙箱
 */
export default class ProxySandbox implements SandBox {
  // 标志该沙箱是否被启用
  sandboxRunning = true;
  
  constructor() {
    const { fakeWindow } = createFakeWindow(window);
    
    const proxy = new Proxy(fakeWindow, {
      set: (target: FakeWindow, p: PropertyKey, value: any): boolean => {
        if(this.sandboxRunning){
          // 修改代理对象的值
          target[p] = value;
          return true; 
        }
      }
      get: (target: FakeWindow, p: PropertyKey): any => {
        // avoid who using window.window or window.self to escape the sandbox environment to touch the really window
        if (p === 'window' || p === 'self' || p === 'globalThis') {
          return proxy;
        }
        // 获取代理对象的值
      	const value = target[p];
        return value;
      },
    })
  }
  
  active() {
    if (!this.sandboxRunning) activeSandboxCount++;
    this.sandboxRunning = true;
  }

  inactive() {
    this.sandboxRunning = false;
  }
}

```

### CSS隔离
* `qiankun`提供了两种CSS隔离方式：`ShadowDOM`和`Scoped CSS`
* 默认不开启样式隔离。

#### ShadowDOM 方式
* 配置`sandbox.strictStyleIsolation: true`时，开启`ShadowDOM`样式沙箱。
* 该模式下会为每个微应用的容器包裹上一个 `shadow dom` 节点，从而确保微应用的样式不会对全局造成影响。
* 注意：除了样式的硬隔离，DOM 元素也直接隔离，导致子应用的一些 `Modal、Popover、Drawer` 组件会因为找不到主应用的 `body` 而丢失。

#### Scoped CSS 方式
* 配置`sandbox.experimentalStyleIsolation: true`，开启`Scoped CSS`样式沙箱。
* 该模式下，会遍历子应用中所有的`CSS`选择器，通过对选择器前缀添加一个固定的带有子应用标识的属性选择器的方式来限制其生效范围，从而避免子应用间、主应用与子应用的样式相互污染。
* 需要注意，如果用户在运行时对内联样式进行修改，`qiankun`可以侦测到并帮助用户限制其作用范围，但如果用户在运行时引入了新的外联样式或者自行创建了新的内联标签，`qiankun`并不会做出反应，相关的`CSS`规则还是可能会污染全局样式。

### 通信方式
* `qiankun`是基于`single-spa`二次开发的，`single-spa`提供了从主应用向子应用传递`customProps`的方式实现了最基础的参数传递。
* `qiankun`通过发布订阅模式，提供了更强大的通信方式。

#### 示例代码
* 实际使用的时候，在调用`initGlobalState`的时候，会返回全局状态变化的时候的回调方法：`onGlobalStateChange`，可以通过该方法来监听状态的变化。
* 主应用
```js
import { initGlobalState, MicroAppStateActions } from 'qiankun';

// 初始化 state
const actions: MicroAppStateActions = initGlobalState(state);

actions.onGlobalStateChange((state, prev) => {
  // state: 变更后的状态; prev 变更前的状态
  console.log(state, prev);
});
actions.setGlobalState(state);
actions.offGlobalStateChange();
```
* 子应用
```js
// 从生命周期 mount 中获取通信方法，使用方式和 master 一致
export function mount(props) {
  props.onGlobalStateChange((state, prev) => {
    // state: 变更后的状态; prev 变更前的状态
    console.log(state, prev);
  });

  props.setGlobalState(state);
}
```

#### 源码示例
```js
import { cloneDeep } from 'lodash';
import type { OnGlobalStateChangeCallback, MicroAppStateActions } from './interfaces';
// 全局状态
let globalState: Record<string, any> = {};
// 缓存相关的订阅者
const deps: Record<string, OnGlobalStateChangeCallback> = {};

// 触发全局监听
function emitGlobal(state: Record<string, any>, prevState: Record<string, any>) {
  Object.keys(deps).forEach((id: string) => {
    if (deps[id] instanceof Function) {
      // 依次通知订阅者
      deps[id](cloneDeep(state), cloneDeep(prevState));
    }
  });
}
// 初始化
export function initGlobalState(state: Record<string, any> = {}) {
  if (state === globalState) {
    console.warn('[qiankun] state has not changed！');
  } else {
    const prevGlobalState = cloneDeep(globalState);
    globalState = cloneDeep(state);
    emitGlobal(globalState, prevGlobalState);
  }
  // 返回相关方法，形成闭包存储相关状态
  return getMicroAppStateActions(`global-${+new Date()}`, true);
}

export function getMicroAppStateActions(id: string, isMaster?: boolean): MicroAppStateActions {
  return {
    /**
     * onGlobalStateChange 全局依赖监听
     *
     * 收集 setState 时所需要触发的依赖
     *
     * 限制条件：每个子应用只有一个激活状态的全局监听，新监听覆盖旧监听，若只是监听部分属性，请使用 onGlobalStateChange
     *
     * 这么设计是为了减少全局监听滥用导致的内存爆炸
     *
     * 依赖数据结构为：
     * {
     *   {id}: callback
     * }
     *
     * @param callback
     * @param fireImmediately 是否立即执行callback
     */
    onGlobalStateChange(callback: OnGlobalStateChangeCallback, fireImmediately?: boolean) {
      if (!(callback instanceof Function)) {
        console.error('[qiankun] callback must be function!');
        return;
      }
      if (deps[id]) {
        console.warn(`[qiankun] '${id}' global listener already exists before this, new listener will overwrite it.`);
      }
      / 注册订阅
      deps[id] = callback;
      if (fireImmediately) {
        const cloneState = cloneDeep(globalState);
        callback(cloneState, cloneState);
      }
    },

    /**
     * setGlobalState 更新 store 数据
     *
     * 1. 对输入 state 的第一层属性做校验，只有初始化时声明过的第一层（bucket）属性才会被更改
     * 2. 修改 store 并触发全局监听
     *
     * @param state
     */
    setGlobalState(state: Record<string, any> = {}) {
      if (state === globalState) {
        console.warn('[qiankun] state has not changed！');
        return false;
      }

      const changeKeys: string[] = [];
      const prevGlobalState = cloneDeep(globalState);
      globalState = cloneDeep(
        Object.keys(state).reduce((_globalState, changeKey) => {
          if (isMaster || _globalState.hasOwnProperty(changeKey)) {
            changeKeys.push(changeKey);
            return Object.assign(_globalState, { [changeKey]: state[changeKey] });
          }
          console.warn(`[qiankun] '${changeKey}' not declared when init state！`);
          return _globalState;
        }, globalState),
      );
      if (changeKeys.length === 0) {
        console.warn('[qiankun] state has not changed！');
        return false;
      }
      // 触发全局监听
      emitGlobal(globalState, prevGlobalState);
      return true;
    },

    // 注销该应用下的依赖
    offGlobalStateChange() {
      delete deps[id];
      return true;
    },
  };
}

```