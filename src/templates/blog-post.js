import React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Tags from "components/tags"
import { rhythm } from "../utils/typography"
import { MdAccessTime as IconTime } from "react-icons/md"
import { ImCircleLeft, ImCircleRight } from "react-icons/im"

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
                <IconTime style={{ marginRight: "5px" }} />
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
                <Link
                  to={`/blog${previous.fields.slug}`}
                  rel="prev"
                  className="btn-prev"
                >
                  <ImCircleLeft />{" "}
                  <span style={{ marginLeft: "10px" }}>
                    {previous.frontmatter.title}
                  </span>
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link
                  to={`/blog${next.fields.slug}`}
                  rel="next"
                  className="btn-next"
                >
                  <span style={{ marginRight: "10px" }}>
                    {next.frontmatter.title}
                  </span>{" "}
                  <ImCircleRight />
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
  query($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 200)
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
      display: inline-flex;
      align-items: center;
      vertical-align: middle;
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
    margin-left: 0;

    li {
      > a {
        display: inline-flex;
        align-items: center;
        text-decoration: none;
        svg {
          font-size: 1.4rem;
        }
      }
    }
  }
`
