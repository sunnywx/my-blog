---
title: nodejs打印目录的tree结构
date: 2022/10/24
desc: scan dir to get all file content recursively
tags:
  - node
---

> 假设有一个需求：扫描某个目录，获取任意子目录下的所有markdown文件的内容，并输出到json，如何实现?

我们将问题分解下，首先我们需要一个目录扫描函数，用于遍历任意层级的目录，然后在每次遍历时，读取文件内容，写入到待输出的json变量。

这里关键是如何将内容插入到输出的变量里，并最终打印出目录树结构, 考虑到目录是一个 `tree`结构，每一个tree node的结构可以定义为

```ts
type Node = {
  data: unknown,
  child: Array<Node>
}
```

一个典型的二叉树的结构是

```ts
type BinaryTreeNode = {
  data: unknown,
  left?: BinaryTreeNode,
  right?: BinaryTreeNode
}
```

于是，我们可以先创建一个 tree对象，在每次遍历时只需要insert node，等目录遍历完毕，最终print tree即可。整个过程包含三个子函数

- scanDir
- getFileContent
- tree.insertNode

```ts
// scan-dir.ts
const fs = require('fs')
const path = require('path')
const root = process.cwd()
const resolve = d => path.resolve(root, d)

function scanDir(prefix = 'articles', res = [], cb = f => f) {
  if (!fs.existsSync(resolve(prefix))) {
    return res
  }

  const dirs = fs.readdirSync(resolve(prefix))
  dirs.forEach(d => {
    const childPrefix = [prefix, d].join('/')
    const stat = fs.statSync(resolve(childPrefix))

    if (stat.isFile()) {
      cb(res, childPrefix)
    }

    if (stat.isDirectory()) {
      cb(res, childPrefix, true)
      scanDir(childPrefix, res, cb)
    }
  })

  return res
}
```

然后是在每次遍历到某个文件时，在回调里去写获取文件内容的逻辑，并插入到tree对象

```ts
const fs = require('fs')
const Tree = require('./tree')
const scanDir = require('./scan-dir')

function getFileContent() {
  const prefix = 'articles/topics'
  const tree = new Tree()
  tree.insertNode({root: true}, [])

  scanDir(prefix, tree, (parent, f, isDir) => {
    const normalizedKey = `/${f.replace(prefix, 'topic')}`
    if (!isDir && path.extname(f) === '.md') {
      // debug('enter topic file: ', f)

      const {meta, cont} = getMarkdownMetaInfo(fs.readFileSync(resolve(f), 'utf-8'))
      const item = {
        url: normalizedKey.replace('.md', ''),
        title: meta.title || guessTitleByMd(cont),
      }
      tree.insertNode(item)
    }

    if (isDir) {
      // debug('enter topic dir: ', f)

      tree.insertNode({
        url: normalizedKey,
        title: f.slice(f.lastIndexOf('/') + 1)
      }, [])
    }
  })

  return tree.toJson()
}
```

最后编写tree类

```ts
// tree.ts

class Node {
  constructor(data, child = null) {
    this.data = data
    this.child = child
  }

  toJson() {
    if (this.child === null) {
      return {...this.data}
    }
    return {
      ...this.data,
      child: this.mapChild()
    }
  }

  mapChild() {
    return this.child.map(c => {
      return this.toJson.call(c)
    })
  }
}

class Tree {
  constructor(root = null) {
    this.root = root
  }

  insertNode(data, child) {
    let n = new Node(data, child)
    if (this.root === null) {
      this.root = n
      return
    }

    let parent = this.root
    while (parent.child) {
      // find first dir prefix with data.url
      const found = parent.child.find(c => c.child && data.url.startsWith(c.data.url))
      if (found) {
        parent = found
      } else {
        parent.child.push(n)
        break
      }
    }
  }

  toJson() {
    if (this.root) {
      return this.root.toJson()
    }
    return null
  }
}
```

最终的效果：
![img.png](/assets/images/scan-dir-tree.png)