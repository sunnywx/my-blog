import React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import Card from "../components/base/card"
import SEO from "../components/seo"
import Tags from "components/tags"

export default class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All posts" />
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          const tags = node.frontmatter.tags || []

          return (
            <Article key={node.fields.slug}>
              <h3>
                <Link to={node.fields.slug}>{title}</Link>
              </h3>

              <Time>
                <span className="time">
                  {new Date(node.frontmatter.date).toLocaleDateString()}
                </span>
                <Tags tags={tags} />
              </Time>

              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </Article>
          )
        })}
      </Layout>
    )
  }
}

const Article = styled(Card)`
  > h3 {
    margin-bottom: 1rem;
    > a {
      text-decoration: none;
    }
  }

  > p {
    margin: 10px 0;
  }
`

const Time = styled.span`
  display: inline-block;
  font-size: 13px;

  > .time {
    margin-right: 20px;
  }
`

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            tags
          }
        }
      }
    }
  }
`
