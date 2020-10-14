import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ListItem from "../components/list-item"
import Pagination from "../components/pagination"
import numPages from "../data/num-pages"

export default class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All blogs" />

        {posts.map(({ node }) => (
          <ListItem node={node} key={node.fields.slug} />
        ))}

        <Pagination numPages={numPages} />
      </Layout>
    )
  }
}

// fixme: move limit to global config
export const pageQuery = graphql`
  query indexQuery($limit: Int = 10) {
    site {
      siteMetadata {
        title
      }
    }

    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
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
            snapshot
          }
        }
      }
    }
  }
`
