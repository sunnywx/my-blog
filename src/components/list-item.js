import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import styled from "styled-components"
import Card from "./base/card"
import Tags from "./tags"

const ListItem = ({ node }) => {
  const title = node.frontmatter.title || node.fields.slug
  const tags = node.frontmatter.tags || []

  return (
    <Article key={node.fields.slug}>
      <h3>
        <Link to={`/blog${node.fields.slug}`}>{title}</Link>
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
}

ListItem.propTypes = {
  node: PropTypes.shape({
    fields: PropTypes.object,
    frontmatter: PropTypes.object,
  }).isRequired,
}

export default ListItem

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