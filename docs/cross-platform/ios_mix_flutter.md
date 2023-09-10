---
sidebar: auto
category: 跨端
tags:
  - Flutter
  - iOS
---

# iOS集成Flutter调研
## 一、环境配置
### 1、Flutter环境安装
* 因安卓代码原因，有很多jar包和Flutter3.0以后得语法冲突，导致无法使用最新的Flutter语言开发，需要将Flutter的版本控制到Flutter3.0以下，和安卓环境一直的情况下，我们使用Flutter2.2的版本。
* 因为我的电脑已经安装了Flutter3.0，所以需要降级，先打开终端，具体降级方式如下：
#### 1、查看所有分支和当前分支
> flutter channel

#### 2、切换到指定分支
> flutter channel stable

#### 3、降级到指定版本
> flutter downgrade v2.2.0

#### 4、检查Flutter环境
> flutter doctor

* 如下图所示，则表示Flutter环境已经配置完成：
* ![1.png](https://static.aistarfish.com/front-release/file/F2023091023274128400002467.1.png)

### 2、Dart安装
同样的原因，因为Flutter环境需要想配套的语言开发，所以我们需要同样对Dart切换到想匹配的版本，这里我是直接修改了Flutter代码中的`pubspec`文件中的相关配置：
```sh
sdks:
 dart: ">=2.12.0 <3.0.0"
```
* ![2.png](https://static.aistarfish.com/front-release/file/F2023091023302207200008912.2.png)

然后在终端中执行:
> flutter packages get

等待执行完毕，则表示当前dart版本切换完成。

### 3、XCode安装和配置
要为iOS开发Flutter应用程序，需要Xcode 9.0或更高版本，因为iOS有一些新特性需要兼容，所以一般我们都是使用最新的XCode版本，安装较为简单，我们打开mac的应用商店，搜索XCode即可。

* ![3.png](https://static.aistarfish.com/front-release/file/F2023091023302248700003842.3.png)
* 等待XCode安装完成之后，我们需要设置开发者账号或者开发证书，否则是无法真机调试的，具体步骤为：
* 打开`XCode -> XCode选项下Settings -> Accounts ->添加开发者账号`
* 完成之后如下：
* ![image.png](https://static.aistarfish.com/front-release/file/F2023091023302243400006228.4.png)

* `Flutter`和`iOS`的混合开发是不支持`BitCode`的，所以我们需要把它设置为`NO`
* ![image.png](https://static.aistarfish.com/front-release/file/F2023091023302215900000134.5.png)

### 4、Cocoapods安装
目前iOS开发中主流的第三方管理的工具就是`cocoapods`，`Flutter`官方也是推荐此方法来管理，相比于手动集成，他们更加便捷，我们只需要使用简单的脚本语言就能把最新的代码集成进来。具体的集成方式如下：
#### 1、安装ruby环境
mac下是自带ruby环境的，这个我们不需要再关心，如果当前Flutter语法和默认的ruby冲突，我们就需要安装所需的版本，这里因为项目重构和组件化的原因，我们用了一些新的脚本配置，这里ruby环境要安装两个版本，ruby-2.6.3和ruby-3.0.0，相关安装和版本切换如下：
##### 1、查看当前的ruby版本
> rvm list

##### 2、查看可安装的ruby版本
> rvm list known

##### 3、安装想要的ruby版本
> rvm install 3.0.0
> rvm install 2.6.3

##### 4、切换ruby默认版本
> rvm use ruby-3.0.0 --default

当然如果我们本地有其他的工具需要特定的ruby环境才能跑的话，我们只需要通过第四步切换到对应的环境即可。
#### 2、删除自带的ruby镜像
在终端输入：
> gem sources --remove https://rubygems.org/

#### 3、添加新镜像
在终端输入：
> gem source --add https://gems.ruby-china.com/

添加完成之后，确保只有一个镜像是我们所需的，在终端输入：
> gem sources -l

#### 4、更新ruby
在终端输入：
> sudo gem update --system

#### 5、安装cocoapods
在终端输入：
> sudo gem install -n /usr/local/bin cocoapods

#### 6、查询cocoapods是否安装成功
在终端输入：
> pod --version

#### 7、安装pod
在终端输入：
> pod setup

## 二、Flutter代码开发和配置
* 在集成之前，我们需要先把`Flutter`代码跑通，否则是无法进行下去的，需要先检查我们check下来的代码是否完整，文件夹中必须要有`pubspec.yaml`文件，否则无法生成相对应的ios文件夹，如果没有发现iOS文件夹，则需要先运行一下相应指令。
* ![image.png](https://static.aistarfish.com/front-release/file/F2023091023302213600007444.6.png)
* 在VSCode终端执行：
> flutter pub get

如果我们需要开发新的页面，这个时候就可以进行了。
### 1、真机调试
* 如果需要真机调试，我们需要进一步在XCode中配置相关证书。在iOS开发中，真机调试的情况下是需要开发者账号的，否则生成的相关证书有效期是只有7天，过了7天就无法再次使用了，默认情况下我们使用自动证书管理会简单一点。
* 我们打开`.ios`文件夹，然后双击`Runner.xcworkspace`文件，就会使用XCode打开相应工程
* ![image.png](https://static.aistarfish.com/front-release/file/F2023091023302208500005728.7.png)
* 接下来找到相应位置配置开发者账号，账号配置如下：
* ![image.png](https://static.aistarfish.com/front-release/file/F2023091023302214500002792.8.png)
* 配置完成之后选择好要运行的设备，然后点击run按钮就可以检查代码时候正常运行了。
* 如果可以正常运行，则一般情况下就没有问题了，就可以进行集成了。

### 2、通过cocoapods把代码集成到项目中
#### 1、项目文件夹配置
* 这里我们需要先把`Flutter`文件夹和`iOS`项目的根目录文件夹放到同一层级
* ![10.png](https://static.aistarfish.com/front-release/file/F2023091023434714000009355.10.png)

#### 2、编辑Podfile文件夹
* 这个文件夹是iOS项目工程所有的第三方库的配置文件，基本控制所有的第三方版本的管理，这里我们需要把`Flutter`项目的代码和依赖库添加进来，当然添加方式有很多种，但是`Flutter1.0`和`Flutter2.0`和`Flutter3.0`的集成方式都是有所区别，这点`Flutter`的官方文档有提到，下面是`Flutter2.0`版本的配置方式：
* ![image.png](https://static.aistarfish.com/front-release/file/F2023091023434710300001762.11.png)
* 这里是设置路径和需要引入的项目名称。然后在target下添加集成
* ![image.png](https://static.aistarfish.com/front-release/file/F2023091023434712100000220.12.png)

#### 3、集成Flutter代码
* 打开终端，cd到`iOS`项目中，然后运行：
> pod install 

* 注意：`iOS`项目中，我们使用了很多新的脚本语言，如果`pod install`执行失败，这里我们需要把`ruby`环境先切换到`3.0.0`版本，然后再执行`pod install`，执行结束之后再切换到`2.6.3`

* 顺利的话这个时候代码就已经集成进来了，这个时候再打开`iOS`项目就会发现多了3个库，分别是：
* ![image.png](https://static.aistarfish.com/front-release/file/F2023091023434712100000156.13.png)

下面，按照上面的真机调试，运行一下，如果正常运行则说明集成已经完成了。

注意：集成部分踩了一些坑，配置方面已经写了一些，按照上面的步骤来基本是可以避免的，如果最后跑不起来，而且XCode也没有具体报错，基本上都是一些环境配置版本冲突造成的。重新检查一下配置环境的版本即可。

### 3、iOS代码集成
* 集成时遇到了一个很大的问题，就是相关代码已经集成完成，真机运行也没有报错，但是跳转的时候就是打不开相应的界面，但是如果我新创建一个工程，按照上面的方式集成进来就是可以的，这个问题困扰了我很久，网上搜了很多也没有找到问题，最后才发现是组件化的原因，然后是通过创建一个`Flutter`组件的方式才正常运行。
* ![image.png](https://static.aistarfish.com/front-release/file/F2023091023474183500003423.14.png)

数据交互方面准备使用`FlutterMessage`来进行，相关代码需要调试的具体调整和补充，待续...