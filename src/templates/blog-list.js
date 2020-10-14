import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import ListItem from "../components/list-item"
import Pagination from "../components/pagination"

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
            snapshot
          }
        }
      }
    }
  }
`
