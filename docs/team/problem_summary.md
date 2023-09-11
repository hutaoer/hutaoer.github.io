---
sidebar: auto
category: 团队
tags:
  - 问题总结 
---

# 前端问题总结

## 小程序Webview中上传图片失败问题
### 现象
* 在小程序的`Webview`页面中，点图片上传按钮，应能正确调起图片上传功能。但是会偶发性的出现点击之后没有反应，不能正确调起上传图片功能的现象。

### 原因
* 由于该页面会同时运行在 APP 和小程序两种环境中，在不同环境，调起方法不同。
* 环境判断在项目入口文件  `index.js` 中调用，并挂载到 `window.env` 中。上传图片组件是个通用组件，不是直接通过 `window.env `实时获取环境值，而是从父组件将 `window.env` 作为属性值传入。但是，微信官方提供的 获取小程序环境的方法是异步的，导致传入到组件里的环境错误，导致图片上传方法调用失败。
* 入口代码
```javascript
// 获取当前环境
export const getCurrentEnv = () => {
  const envPromise = new Promise(resolve => {
    // 海心患者端/医生端
    if (hxAppHelper?.isStarfish()) {
      resolve('starfishPatient');
    } else if (hxAppHelper?.isStarfishDoctor()) {
      resolve('starfishDoctor');
    }
    // 小程序环境
    wx.miniProgram.getEnv(res => {
      if (res.miniprogram) {
        resolve('miniprogram');
      }
    });
    // 默认为空 - 浏览器环境
    setTimeout(() => {
      resolve('');
    }, 2000);
  });
  return envPromise;
};



getCurrentEnv().then(env => {
  window.env = env
})
```
* 父组件代码
```javascript
export default class Question extends React.Component {
  render () {
    return (
      <DocumentTitle title={ qnTitle || ' ' }>
        <FormRender
            configData={ formConfigData }
            mode="mobile"
            appEnv={ window.env === 'miniprogram' ? 'miniprogram' : 'app' }
            actionObj={{
              imgUpload: {
                otherParams: {
                  modelsName: 'immune_pic_v2',
                  origin: miniParams.origin,
                },
                customRequest: (formData, cb) => this.customRequest(formData, cb),
              },
            }}
            handleSubmit={ this.handleSubmitQues.bind(this) }
          />
      </DocumentTitle>
    )
  }
}
```
* 环境取值
* ![](https://cdn.jsdelivr.net/gh/hutaoer/images/1658921723799-62db31ff-92a7-4bbe-b07c-cb476f4e3bd0.png)
* 图片上传部分代码
```js
export default () => {
  
  const handleUploadInWX = () {...}
  
  const handleUploadInApp = () {...}
  
  const handleAdd = () => {
    if (appEnv === 'miniprogram') {
      handleUploadInWX()
    } else {
      handleUploadInApp()
    }
  };
                                
  return (
    <div className="add-btn" onClick={handleAdd}/>
  )
}
```

### 解决方案
* 由于页面执行 `render` 时 `window.env` 值可能还没获取到，获取到值以后并不会再次执行 `render` 函数，所以应保证在获取到环境值后再次触发 `render` 函数。
* 因而重新在页面中重新定义一个变量，接受环境值，数据更新将会再次触发 `render`。
* 示例代码
```js
export default () => {
  
  const [env, setEnv] = useState(null)
  const [formConfigData, setFormConfigData] = useState([])

  const getEnv = () => {
    getCurrentEnv().then(env => {
      setEnv(env)
    })
  }
  
  useEffect(() => {
    getEnv()
  }, [])
  
  return (
     <DocumentTitle title="问卷详情">
       {
          formConfigData?.length && env ? (
            <div className="wx-ques-detail">
              <MobileDetail
                appEnv={ env === 'miniprogram' ? 'miniprogram' : 'app' }
                titleData={ formBaseInfo }
                hasFilled
                configData={ formConfigData }
                formData={ formSubmitData }
              />
            </div>
          ) : (
            <Empty emptyText="暂无数据" />
          )
       }
     </DocumentTitle>
  )
}  

```

## 小程序分包之间调用组件报错
### 背景
* 在一次开发中，在B分包目录下写了一个组件， 这个组件后来需要被A分包引用使用，但是在A分包代码中引入组件后，控制台报错提示未找到该模块。
* 代码示例
```js
import ContactNutrition from '@/module-doctor/components/ContactNutrition'

// ... 省略非关键代码

<ContactNutrition />
```
* 以上代码可以肯定的是路径引入正确，并且在taro编译后也是存在的，使用该组件的小程序.json文件下也存在的。
* ![1](https://static.aistarfish.com/front-release/file/F2023090711335969100009938.1.png)
* ![2](https://static.aistarfish.com/front-release/file/F2023090711335974800000677.2.png)
* 但控制台依然报错，提示找不到该模块。
### 原因
* 查阅资料得到的信息是微信小程序分包隔离机制以及分包异步化问题导致。
* 在原有的分包隔离机制下，各分包之间无法引用自定义组件或逻辑代码，所以小程序引入了分包异步化的方案解决这类问题，但是正是由于这种机制导致页面加载后，组件是其他分包下的代码，在当前分包下，并没有及时加载进来，所以导致以上错误提示。
### 解决
* 为了处理异步加载分包组件的问题，小程序在.json文件中新增了一个配置项componentPlaceholder, 顾名思义，占位组件，在分包还未下载完成前，使用占位组件代替自定义组件，待分包下载完成和注入后，将占位组件替换成真正的组件。
* 原生代码
```js
"usingComponents": {
    "contact-nutrition": "../../../../../module-doctor/components/ContactNutrition/index"
},
"componentPlaceholder": {
    "contact-nutrition":"view"
}
```
* Taro代码
```js
// 类组件语法
export default class Index extends Component {
  config = {  
    componentPlaceholder: {
      'contact-nutrition': 'View',
    }
  }
}

// 函数组件语法
const Index = ()=> {}
Index.config = {
  componentPlaceholder: {
    'contact-nutrition': 'View',
  }
}
export default Index
```

### 参考
* [分包异步化](https://developers.weixin.qq.com/community/develop/article/doc/0004e289988f001814cc3efc75b413)

## antd 3.x Upload组件使用问题
### 问题1：上传图片一直处于loading态
* 示例代码
```js
/* eslint-disable */

import { Upload, Icon, Modal, Form } from 'antd';

const FormItem = Form.Item;

class UploadImage extends PureComponent {
  state = {
    previewVisible: false,
    previewImage: '',
    imgList: [],
  };


  handleChange = ({ file, fileList }) => {
    console.log(JSON.stringify(file)); // file 是当前正在上传的 单个 img
    console.log(JSON.stringify(fileList)); // fileList 是已上传的全部 img 列表

    this.setState({
      imgList: fileList,
    });
  };


  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };


  // 参考链接：https://www.jianshu.com/p/f356f050b3c9
  handleBeforeUpload = file => {
    //限制图片 格式、size、分辨率
    const isJPG = file.type === 'image/jpeg';
    const isJPEG = file.type === 'image/jpeg';
    const isGIF = file.type === 'image/gif';
    const isPNG = file.type === 'image/png';
    if (!(isJPG || isJPEG || isGIF || isPNG)) {
      Modal.error({
        title: '只能上传JPG 、JPEG 、GIF、 PNG格式的图片~',
      });
      return;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      Modal.error({
        title: '超过2M限制，不允许上传~',
      });
      return;
    }
    return (isJPG || isJPEG || isGIF || isPNG) && isLt2M && this.checkImageWH(file);
  };

  //返回一个 promise：检测通过则返回resolve；失败则返回reject，并阻止图片上传
  checkImageWH(file) {
    let self = this;
    return new Promise(function(resolve, reject) {
      let filereader = new FileReader();
      filereader.onload = e => {
        let src = e.target.result;
        const image = new Image();
        image.onload = function() {
          // 获取图片的宽高，并存放到file对象中
          console.log('file width :' + this.width);
          console.log('file height :' + this.height);
          file.width = this.width;
          file.height = this.height;
          resolve();
        };
        image.onerror = reject;
        image.src = src;
      };
      filereader.readAsDataURL(file);
    });
  }

  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {// values 是form表单里的参数
      // 点击按钮后，将表单提交给后台
      dispatch({
        type: 'mymodel/submitFormData',
        payload: values,
      });
    });
  };

  render() {
    const { previewVisible, previewImage, imgList } = this.state; //  从 state 中拿数据
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
          <FormItem label="图片图片" {...formItemLayout}>
            {getFieldDecorator('myImg')(
              <Upload
                action="//xxxx" // 这个是图片上传的接口请求，实际开发中，要替换成你自己的业务接口
                data={file => ({ // data里存放的是接口的请求参数
                  param1: myParam1,
                  param2: myParam2,
                  photoCotent: file, // file 是当前正在上传的图片
                  photoWidth: file.height, // 通过  handleBeforeUpload 获取 图片的宽高
                  photoHeight: file.width,
                })}
                listType="picture-card"
                fileList={this.state.imgList}
                onPreview={this.handlePreview} // 点击图片缩略图，进行预览
                beforeUpload={this.handleBeforeUpload} // 上传之前，对图片的格式做校验，并获取图片的宽高
                onChange={this.handleChange} // 每次上传图片时，都会触发这个方法
              >
                {this.state.imgList.length >= 9 ? null : uploadButton}
              </Upload>
            )}
          </FormItem>
        </Form>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default UploadImage;


```
### 原因
* 使用单文件上传时onChange事件会至少触发两次，一次file.status=uploading，最后一次要么是done或者error，
根据官网文档上对 这个问题 的解释，就是要注意两点：
* 其一是要保证 onchange 事件内部，至少有一次无阻碍的调用 setState 赋值 fileList，让所有状态变化都及时更新。当然这个“无阻碍”是我自己的理解，就是说 setState 的方法执行最好不写在 if 这类条件判断里面，直接写在最底部或者最顶部就行；
* 其二是要保证每次 setState 后 fileList 的状态都是最新的。所以，以上 issue 里面建议上一点我说的写法最好是：
```js
this.setState({ fileList: [...this.state.fileList] })
```
* 在获取记录详情时，拿到图片的 url，一定要将 state 中的 fileList 的 status 状态设为 done
* 要保证每次 setState 后 fileList 的状态都是最新的，虽然你 Upload 操作很规范，但是，fileList 的变化没法让 DOM 节点及时渲染，这个数据流的过程因为你的 DOM 或操作过 React 生命周期等等因素，没法及时反映到 DOM 渲染上。比如你 shouldComponentUpdate 那儿逻辑是不是有问题？封装组件的时候，哪儿忘了 fileList 是个引用类型，没有深层比较，或者因为其他原因，组件根本就不能触发 render。
```js
this.setState({
        previewImage: url,
        fileList: [ {
             thumbUrl: url,
             status: 'done',    // 这个必须，不然，图片自然显示不出来
             uid: uid,      // w唯一id
           } ],
        });
      // 以及将受控字段的值设为 url:
this.props.form.setFieldsValue( { file: bannerUrl } )
```

### 问题2：预览图片卡死
### 原因
* 依据上方的代码，通过 Antd 的 upload 组件将图片上传成功后，点击图片的缩略图，理应可以在当前页面弹出 Modal，预览图片。但实际的结果是，浏览器一定会卡死。
定位问题发现，原因竟然是：图片上传成功后， upload 会将其转为 base64编码。base64这个字符串太大了，点击图片预览的时候，浏览器在解析一大串字符串，然后就卡死了。详细过程描述如下。
* 上方代码中，我们可以把 `handleChange(file, fileList)`方法中的 `file`、以及 `fileList`打印出来看看。 file指的是当前正在上传的 单个 img，`fileList`是已上传的全部 img 列表。 当我上传完 两张图片后， 打印结果如下：
* `file`的打印的结果如下：
```js
    {
        "uid": "rc-upload-1551084269812-5",
        "width": 600,
        "height": 354,
        "lastModified": 1546701318000,
        "lastModifiedDate": "2019-01-05T15:15:18.000Z",
        "name": "e30e7b9680634b2c888c8bb513cc595d.jpg",
        "size": 31731,
        "type": "image/jpeg",
        "percent": 100,
        "originFileObj": {
            "uid": "rc-upload-1551084269812-5",
            "width": 600,
            "height": 354
        },
        "status": "done",
        "thumbUrl": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAHQ9qKKlbimcXrIH9o2vH/AC2T+ddPj98v+9RRWsuhnHdk0ar9qb5R0Pb6VPB/qh9aKKiRr0Irnt/vUDr+NFFJCRqWxJik5Pb+dLJ938aKK06mYSdKKKKBH//Z",
        "response": {
            "retCode": 0,
            "imgUrl": "http://qianguyihao.com/opfewfwj098902kpkpkkj976fe.jpg",
            "photoid": 271850
        }
    }

```
* 上方的json数据中，需要做几点解释：
 -（1）response 字段里面的数据，就是请求接口后，后台返回给前端的数据，里面包含了图片的url链接。
 -（2）status 字段里存放的是图片上传的实时状态，包括上传中、上传完成、上传失败。
 -（3）thumbUrl字段里面存放的是图片的base64编码。这个base64编码非常非常长。当点击图片预览的时候，其实就是加载的 thumbUrl 这个字段里的资源，难怪浏览器会卡死。
```js
handleChange = ({ file, fileList }) => {
    console.log(JSON.stringify(file)); // file 是当前正在上传的 单个 img
    console.log(JSON.stringify(fileList)); // fileList 是已上传的全部 img 列表


    // 【重要】将 图片的base64替换为图片的url。 这一行一定不会能少。
    // 图片上传成功后，fileList数组中的 thumbUrl 中保存的是图片的base64字符串，这种情况，导致的问题是：图片上传成功后，点击图片缩略图，浏览器会会卡死。而下面这行代码，可以解决该bug。
    fileList.forEach(imgItem => {
      if (imgItem && imgItem.status == 'done' && imgItem.response && imgItem.response.imgUrl) {
        imgItem.thumbUrl = imgItem.response.imgUrl;
      }
    });

    this.setState({
      imgList: fileList,
    });
  };
```

## pad端真机环境日历控件超出展示区域
### 效果
* ![](https://cdn.jsdelivr.net/gh/hutaoer/images/1677649554034-f0e05a47-df43-4320-ac86-1bccf539edb6.png)
* 日历控件的弹出方向受视口高度有影响。全屏状态，可以展示正常。非全屏状态，在部分浏览器下有兼容性问题。
### 解决
* 避免视口出现滚动条，设置 `centered:true`。

## css属性导致H5页面中的二维码在微信环境下无法长按识别
### 导致问题的代码
* 如果css中给img标签设置了pointer-events: none;会导致在微信环境下长按图片无法识别
```css
img {
	pointer-events: none;
}
```
### 解决
* 去掉全局污染的代码

## 日期格式
* 在iOS下，有日期格式的兼容性问题，不能直接使用`2021-10-13`，而是需要使用`2021/10/13`
* 做日期格式化的时候，一般都是采用24小时制，使用`HH`，示例：`moment().format('HH:mm')`

## js截图保存/上传问题
### 背景
* 在编辑文章的的时候，需要在提交表格拿到文章 `id` 之后将该 `form` 表单将其截图上传至后端，而该截图和上传的过程本质上不需要让用户感知到。由于图片是在前端生成，当生成图片比较大的时候，会导致页面交互明显的卡顿。
* 前端截图的库，常用的有`dom-to-image`和 `html2canvas`，本质上这两个用的方式区别不大，`html2canvas` 一直在维护更新。
* 当数据较多时，绘制`canvas`的速度问题无法避免。
### 优化方向
* 交互层，增加loading提示，较少用户焦虑。
* 截图的时候，在dom节点较多的时候，可考虑分批截图
