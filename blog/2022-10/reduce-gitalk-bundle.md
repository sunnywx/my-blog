---
title: 优化打包gitalk
date: 2022-10-19
tags:
  - webpack
  - refine
---

## lazy load
评论插件gitalk的react组件体积比较大 (~700K), 直接静态import会导致某个chunk的体积很大。
尝试使用lazy, Suspense来主动分包。

```tsx
import "gitalk/dist/gitalk.css"
const Gitalk=lazy(()=> import("gitalk/dist/gitalk-component"))

<Suspense fallback={<div>Loading gitalk..</div>}>
  {typeof window !== "undefined" && (
    <Gitalk options={gitalkOptions} />
  )}
</Suspense>
```
这样虽然可以手动将gitalk分包，但是对于整体的bundle大小依然没有减少。
与其减小某个包，不如完全不要这个包。于是考虑不使用react组件，用script从CDN加载，这样可以彻底消除gitalk的bundle。

## off load

首先在父组件内用`Helmet`动态加载gitalk对应的css, js

```tsx
<Helmet>
  <link rel="stylesheet" href="https://unpkg.com/gitalk/dist/gitalk.css" />
  <script src="https://unpkg.com/gitalk/dist/gitalk.min.js" />
</Helmet>
```

由于不确定gitalk对应的js脚本何时会将构造函数挂载到window对象，需要用timer来监听

```tsx
useEffect(() => {
  const gitalkOptions = {...}

  let tm: number = setInterval(() => {
    if (window.Gitalk) {
      const gitalk = new window.Gitalk(gitalkOptions)
      gitalk.render('gitalk-container')

      clearInterval(tm)
    }
  }, 100)

  return () => {
    clearInterval(tm)
    tm = null
  }
}, [blogUrl])
```
