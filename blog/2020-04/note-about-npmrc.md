---
title: npmrc常用配置
description: 切换npm源，加入私有仓库，加快node-sass安装...
date: 2020-04-07T10:06:46.370Z
---

在平时的 web 开发中，常用的一些 npmrc 配置

在项目根目录创建 `.npmrc`文件，加上如下内容

```shell
// 切换到国内的npm源
registry=https://registry.npm.taobao.org

// 如果平时喜欢yarn，不想生成npm的package-lock
package-lock=false

// 切换node-sass的下载镜像
sass-binary-site=https://npm.taobao.org/mirrors/node-sass

// 添加私有仓库，便于安装私有部署的scope package
@scope:registry=http://172.16.0.60:xxxx

```
