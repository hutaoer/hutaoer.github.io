---
sidebar: auto
category: 实践
date: 2024-03-11
tags:
  - nvm
---

# nvm install 报错 not found

## 背景

- 一直使用的`nvm`来管理`node`的版本，很久没有更新过了。今天有个项目，需要升级`node`版本到`18.17.0+`，结果发现执行 install 的时候，提示如下信息：`Version 'v18.17.0' not found - try nvm ls-remote to browse available versions.`
- 执行`nvm ls-remote`也只能查看很久以前的版本。
- ![](//static.xyb2b.com/images/7c04ef8f4c7359899abc1e309da4641d.png)

## 解决

- 我原来的`nvm`版本是`0.37.0`，我怀疑是版本太老了，所以对`nvm`升级到了最新版本。
- 先删除原来的，`rm -rf ~/.nvm`，然后重新安装
- `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash`
- 配置环境变量：

```sh
# nvm config
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

- 再次执行`nvm install 18.17.0`，结果还是一样的提示信息。
- 网上搜索下，有没有类似的场景和解决方案。
- 先查看下能否访问：`https://nodejs.org/dist/`
- 确认能访问的前提下，在`.zshrc`中，增加一个配置项
- `export NVM_NODEJS_ORG_MIRROR=https://nodejs.org/dist/`
- 然后确保生效：`source ~/.zshrc`
- 接下来就可以正常安装`node`啦
