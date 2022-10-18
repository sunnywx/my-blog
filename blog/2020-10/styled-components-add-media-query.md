---
title: styled-components add media query
description: 如何在styled-components下使用media query来做响应式设计
date: 2020-10-14 09:36
snapshot:
  - /images/styled-comp-scss.jpeg
---

Media query 在`styled-components`下的使用，和普通 css 下是一样的，只是 styled-components 支持 SCSS 的语法
，另外可以在 es6 的模板字符串(tagged template)下有独特的写法。

![](/assets/images/styled-comp-scss.jpeg)

## 传统的写法

```
#wrapper {
  display: flex;
  flex-direction: row;
  @media (max-width: 768px) {
    flex-direction: column;
  }
}

```

## styled-components 下的写法

```js
import styled from "styled-components"

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`
```

## styled-component 下的 scss 写法

```js
const Article = styled.div`
  > h3 {
    margin-bottom: 1rem;
    > a {
      text-decoration: none;
    }
  }
  
  .snapshots{
    display: flex;
    
    > img {
      @media (min-width: 1024px} {
        width: 30%;        
      }
    }
  }
`
```

`styled.div` 后面接的是 模板字符串，可以插值(interpolate)，所以可以把不同分辨率的配置抽出来：

```js
// config/device-size.js

export const size = {
  mobile: "425px",
  tablet: "768px",
  desktop: "1024px",
}

export const device = {
  mobile: `(max-width: ${size.mobile})`,
  tablet: `(min-width: ${size.tablet}) and (max-width: ${size.desktop})`,
  desktop: `(min-width: ${size.desktop})`,
}
```

最终的 styled-components media query 写法

```js
const Article = styled(Card)`
  > h3 {
    margin-bottom: 1rem;
    > a {
      text-decoration: none;
    }
  }

  .snapshots {
    display: flex;

    > img {
      @media ${device.desktop} {
        width: 30%;
      }
    }
  }
`
```
