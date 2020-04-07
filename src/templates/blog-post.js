import React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Tags from "components/tags"
import { rhythm } from "../utils/typography"

export default class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />

        <Article>
          <Title>
            <h1>{post.frontmatter.title}</h1>
            <p>
              <span className="time">
                {new Date(post.frontmatter.date).toLocaleDateString()}
              </span>
              <Tags tags={post.frontmatter.tags} />
            </p>
          </Title>
          <Body dangerouslySetInnerHTML={{ __html: post.html }} />
          <Bio />
        </Article>

        <Paginator>
          <ul>
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </Paginator>
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tags
      }
    }
  }
`

const Article = styled.article``

const Title = styled.header`
  margin-bottom: 1.5rem;

  > h1 {
    margin-top: ${rhythm(1)};
  }

  > p {
    > .time {
      margin-right: 20px;
    }
  }
`
const Body = styled.section`
  margin-bottom: ${rhythm(1)};
`
const Paginator = styled.nav`
  > ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    list-style: none;
    padding: 0;
  }
`
