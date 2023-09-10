---
sidebar: auto
category: 跨端
tags:
  - Flutter
  - iOS
---

# Flutter项目安装、调试、问题总结

## 本地环境配置信息
* 我的本机Flutter配置信息如下：
* ![1](https://static.aistarfish.com/front-release/file/F2023091100025797000006961.1.png)

## 开发环境配置

### vscode报错Could not create temporary directory: 权限被拒绝
* 解决：终端执行命令：
```sh
sudo chown $USER ~/Library/Caches/com.microsoft.VSCode.ShipIt
```

### 执行flutter --version 卡住
* 解决：修改`Flutter SDK` 目录下 `packages/flutter_tools/lib/src/version.dart` 文件。
* 通过 `flutter --version --verbose` 命令可以查看详情，如果卡在 `git fetch https://github.com/flutter/flutter.git --tags`，那么就是这个原因导致的。
* 修改`flutter`的仓库地址，更换为 `gitee`。
```dart
// String get _flutterGit => globals.platform.environment['FLUTTER_GIT_URL'] ?? 'https://github.com/flutter/flutter.git';
String get _flutterGit => globals.platform.environment['FLUTTER_GIT_URL'] ?? 'https://gitee.com/mirrors/Flutter.git';
```
* 然后重新生成**_flutter_tools_**
```bash
$ rm -rf bin/cache
$ ./bin/flutter --version --verbose
```

参考：[https://www.jianshu.com/p/3901af5f828c](https://www.jianshu.com/p/3901af5f828c)

### 执行flutter channel 卡住
* 我碰到的原因是，`git` 拉取 `github.com/flutter/flutter.git` 失败。
* 修改`origin`的`url`地址为`ssh`的地址。在`flutter`的项目目录下，执行`git config -e`，对`origin`进行修改。
* ![image.png](https://static.aistarfish.com/front-release/file/F2023091100082228900008834.2.png)

### 执行flutter doctor报错
```bash
flutter doctor

```
* ![image.png](https://static.aistarfish.com/front-release/file/F2023091100082231800001102.3.png)
* 解决：根据提示信息，执行：`fluttor doctor --android-licenses` 即可

### 执行 fluttor doctor --android-licenses 报错
* ![image.png](https://static.aistarfish.com/front-release/file/F2023091100082232800007765.4.png)
* 解决：打开`android studio`，设置，安装 `Android SDK Command-line Tools`.
* 参考：[https://juejin.cn/post/7019103639067164708](https://juejin.cn/post/7019103639067164708)