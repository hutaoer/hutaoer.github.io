#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

echo 'build'
# 生成静态文件
npm run docs:build

# 复制dist下面的所有文件和目录到 github-blog
cp -a docs/.vuepress/dist/. ../github-blog

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

time=$(date "+%Y-%m-%d %H:%M:%S")
echo "deploy time: ${time}"

cd ../github-blog
git add .
git commit -m "update blog @ ${time}"

git push origin master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages
echo "deploy successfully"
