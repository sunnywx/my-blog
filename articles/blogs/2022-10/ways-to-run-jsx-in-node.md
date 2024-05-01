---
title: ways to run jsx in nodejs
date: 2022-10-17
tags:
  - react
  - node
---

如何在nodejs repl下运行下面的代码：

```js
// ssr.js

/** @jsx h */
import {render} from 'preact-render-to-string'
import {h} from 'preact'

const App=<div className='app'>full content </div>

console.log(render(App))
```

## babel-node

安装依赖
```shell
yarn add --dev @babel/core @babel/node @babel/preset-env @babel/preset-react @babel/plugin-transform-react-jsx
babel-node ssr.js
```

## ts-node
```shell
yarn add --dev ts-node
ts-node --esm ssr.js
```