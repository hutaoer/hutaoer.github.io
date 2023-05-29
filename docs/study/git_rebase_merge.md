---
sidebar: auto
category: 学习笔记
tags:
  - rebase
  - merge
  - git
---

# git rebase 和 git merge 

## git pull 
* 举例：拉取远程的分支`B1`。
* 拉取代码，使用`git pull origin B1 --rebase` 而不是 `git pull origin B1` 
* 平时使用 rebase 注意的一点，`git pull` 这条命令默认使用了 `--merge` 的方式更新代码，如果你不指定用 `--rebase`，有的时候就会发现日志里有这样的一次提交 `Merge`
* 这时候直接使用 `git push origin B1` 提示也说明了提交失败的原因。使用 `rebase` 之后，master分支上比B1分支上多的修改，直接“插入”到了B1分支修改的内容之后，也就是 master 分支的修改在 B1 分支上重演了一遍，相对远程 B1 分支而言，本地仓库的B1分支的“基底”已经变化了，直接 push 是不行的，所以确保没有问题的情况下必须使用 `--force` 参数才能提交。

## git merge
* 当我们合并两个没有上下游关系的分支时，git会自动替我们生成一个`merge commit`，记录此次的`merge`。记录`merge`操作没有什么问题，问题是如果我们遇到特殊情况需要反复`merge`的时候，就会导致`commit`的提交记录非常混乱。
* git merge 有如下几种方式：

### --ff
* 这是默认的行为， 即 `fast-forward` 方式，又叫快进式合并，仅仅是指针的移动。缺点是：分支删除的时候，会丢失merge分支信息。
* When the merge resolves as a fast-forward, only update the branch pointer, without creating a merge commit. This is the default behavior.

### –-squash
* 把一些不必要commit进行压缩。最终形成一个`commit`，作为一个总结式的`message`
* 在`merge pr`的时候，有个选项是`merge squash`。比如我们有个`feature/dev`分支，开发测试完成后，要想主干分支合并，可以这样操作：
  - `git checkout master`
  - `git merge --squash feature/dev`
* 注意：这里merge的时候，commit的作者是执行操作的同学。那么历史记录中的提交者信息可能会丢失。

### --no-ff
* 关闭`fast-forward`式的合并。

## git rebase 使用场景
* 所谓的变基其实就是找到两个分支共同的祖先，然后在当前分支上合并从共同祖先到现在的所有 `commit`
* 当我们`rebase`了之后再提交合并请求我们的合并记录里面会非常干净，没有多余`merge`的信息。对于多人协同开发的场景非常有帮助。
* 拉取远程代码
  - `git pull origin master --rebase`
* 合并多次提交
  - `git rebase -i`
  - 进入交互界面后，将除第一行的pick外，其余的pick都改成 squash ，退出编辑模式，保存即可。
  - 这样就把几次的commit汇总到了一次commit中。
* 合并某个`feature`分支到`master`分支的步骤：
  - `git checkout feature/xxx`
  - `git rebase master`
  - `git checkout master`
  - `git merge feature/xxx`
* `rebase`过程中，如果碰到文件冲突，那么就解决冲突，然后再继续`git rebase continue`
* 使用`git rebase`可以使得我们本地的提交基于远程的最新提交。

## 总结
* feature 分支合并到主干分支（比如master）的时候，先在feature分支使用`git rebase master`，然后再到主干分支进行合并`feature`分支。
* 要经常从上游分支更新代码，如果长时间不更新上游分支代码容易出现大量冲突。
* rebase 可以尽可能保持 master 分支干净整洁，并且易于识别 author
* squash 也可以保持 master 分支干净，但是 master 中 author 都是 maintainer，而不是原 owner
* merge 不能保持 master 分支干净，但是保持了所有的 commit history。

