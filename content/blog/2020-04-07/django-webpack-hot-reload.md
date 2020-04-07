---
title: django webpack hot reload
description: django作为后端的webpack热加载的一种实现
date: 2020-04-07T08:06:46.370Z
tags: [web]
---

## 1. 设置后端环境

```shell
# init python virtrual env
pip install virtualenv
virtualenv venv
source ./venv/bin/activate

pip install django-webpack-loader
```

## 2. 设置 django 的 settings.py

```shell
WEBPACK_LOADER = {
    'DEFAULT': {
        'CACHE': not DEBUG,
        'BUNDLE_DIR_NAME': 'dist/', # must end with slash
        'STATS_FILE': os.path.join(BASE_DIR, 'static/dist/webpack-stats.json'),
        'POLL_INTERVAL': 0.1,
        'TIMEOUT': None,
        'IGNORE': ['.+\.hot-update.js', '.+\.map']
    }
}

```

## 3. 设置 webpack (开发环境)

```shell
const path = require('path')
const webpackNotifier = require('webpack-notifier')
const ManifestPlugin = require('webpack-manifest-plugin')
const BundleTracker = require('webpack-bundle-tracker')

const devServerPort = process.env.DEV_SERVER_PORT || 9000

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'static/dist'),
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',

    // if you want hmr, point to webpack-dev-server path, not django static file
    publicPath: `http://localhost:${devServerPort}/static/dist/`
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'static/dist'),
    compress: true,
    port: process.env.DEV_SERVER_PORT || 9000,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    historyApiFallback: true,

    // HMR
    hotOnly: true,
    inline: true,
    clientLogLevel: 'warn'
  },
  plugins: [
    new ManifestPlugin({
      publicPath: 'static/dist/'
    }),
    new BundleTracker({
      filename: './static/dist/webpack-stats.json'
    })
  ]
}

```

## 4. django 模板

```html
{% load custom_tags %} {% load render_bundle from webpack_loader %}
<!DOCTYPE html>
<html lang="{{ site.lang|default:'zh-cn' }}">
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />

    {% block styles %} {% if is_prod %}
    <link rel="stylesheet" href="{{ 'styles.css' | get_manifest_asset }}" />
    {% endif %} {% endblock %}
  </head>
  <body>
    {% block content %}
    <div id="app"></div>
    {% endblock %} {% block scripts %} {% if is_prod %}
    <script src="{{ 'styles.js' | get_manifest_asset }}"></script>
    <script src="{{ 'main.js' | get_manifest_asset }}"></script>
    {% else %} {% render_bundle 'main' %} {% endif %} {% endblock %}
  </body>
</html>
```

### 实际项目中的演示：

![django webpack热加载](/images/django-webpack-hot-reload.jpg)
