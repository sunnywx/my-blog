---
title: Mac 10.15 安装 libvips
description: mac安装gatsby图片处理依赖的libvips和sharp的问题记录
date: 2020-04-06T08:06:46.370Z
tags: [mac]
---

gatsby 的图片处理库`sharp`很方便，但是 sharp 依赖 c++编写的 `libvips`。
当 Mac 升级到 catalina(10.15), `brew`安装时一直失败，当尝试源码编译，会出现`tiff`依赖的错误。
还有`zlib`在 catalina 默认的 `pkg-config`的配置`zlib.pc`错误。针对我遇到的情形，解决方式如下。

```
// 从github 下载最新的gz包，vips-8.9.1.tar.gz

tar xf vips-8.9.1.tar.gz
cd vips-8.9.1

./configuration --with-jpeg --with-png --without-tiff

make

sudo make install

rm -rf node_modules

npm i --unsafe-perm --build-from-source --verbose

```

改进之处

- 在 markdown 内引入 png 图片，gatsby 有时会编译出错 (可能是 libvips 编译的参数不对， 或者`gatsby-plugin-sharp`的 bug)
- `brew info vips` 显示的 vips 版本始终是 8.8.x，尝试升级 brew，拉取`brew/versions`仓库也报错，可能是`brew/core`的 bug
- 等 brew 官方发新版，最简单的就是通过`brew install vips`安装 libvips

参考文档

- [https://sharp.pixelplumbing.com/install](https://sharp.pixelplumbing.com/install)
- [https://libvips.github.io/libvips/install.html#building-libvips-from-a-source-tarball](https://libvips.github.io/libvips/install.html#building-libvips-from-a-source-tarball)
- [https://github.com/gatsbyjs/gatsby/issues/21032](https://github.com/gatsbyjs/gatsby/issues/21032)
