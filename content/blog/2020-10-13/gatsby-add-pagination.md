---
title: gatsby page add pagination
description: 如何在 gatsby 和 graphql下给列表加分页
date: 2020-10-13 14:20:48
tags:
  - gatsby
  - graphql
---

## gatsby 下分页的难点

gatsby 生成的都是静态网页，数据是通过 graphql 聚合的，这里查询数据不像传统的关系型数据库那样
直接通过`limit`, `offset`来控制分页数据。gatsby 的数据源可能是每个 markdown 经过 nodejs 转换后的纯 json，
再通过 graphql 的接口来查本地的 json 数据，也就是页面加载到浏览器后，不能像传统的发起 ajax 请求，因为没有一个接收分页参数的后端。

所以只能在每个页面生成之前就提前拿到全局的分页数据，比如 总页数，当前页码，再注入页面，让页面在浏览器加载就可以使用这些数据。

考虑到 gatsby 生成页面的逻辑是通过在 `gatsby-node.js`里调用 nodejs 的接口，最典型的就是 `createPages`, `createPage`。

## gatsby-node 生成分页列表

```javascript
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  const posts = result.data.allMarkdownRemark.edges
  const postsPerPage = 10
  const numPages = Math.ceil(posts.length / postsPerPage)

  // save numPages to global data
  fs.writeFileSync(
    path.resolve(__dirname, "src/data/num-pages.js"),
    `export default ${numPages}`
  )

  // create paginated page
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog` : `/blog/${i + 1}`,
      component: path.resolve("./src/templates/blog-list.js"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })

  // create each post
  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: `/blog${post.node.fields.slug}`,
      component: path.resolve(`./src/templates/blog-post.js`),
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })
}
```

上面是完整的在 nodejs 端生成单独分页的列表页和每个子页面的逻辑。

这里涉及两个模板，一个是每个分页对应的列表页（对应 `src/templates/blog-list.js`），一个是每个 blog 的详情页(对应 `src/templates/blog-post.js`).

`templates/blog-list`的代码如下

```js
import React from "react"
import { graphql } from "gatsby"

import Layout from "components/layout"
import ListItem from "components/list-item"
import Pagination from "components/pagination"

export default class BlogList extends React.Component {
  render() {
    const { data, pageContext } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges
    const { currentPage, numPages } = pageContext

    return (
      <Layout location={this.props.location} title={siteTitle}>
        {posts.map(({ node }) => (
          <ListItem node={node} key={node.fields.slug} />
        ))}

        <Pagination numPages={numPages} currentPage={currentPage} />
      </Layout>
    )
  }
}

export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }

    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date
            title
            description
            tags
          }
        }
      }
    }
  }
`
```

最终的效果如图：
![](/images/gatsby-pagination.jpg)
