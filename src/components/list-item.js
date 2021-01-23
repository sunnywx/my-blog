import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import styled from "styled-components"
import dayjs from "dayjs"
import Card from "./base/card"
import Tags from "./tags"
import { device } from "config/device-size"

const ListItem = ({ node }) => {
  const title = node.frontmatter.title || node.fields.slug
  const tags = node.frontmatter.tags || []
  let { snapshot } = node.frontmatter

  if (snapshot && typeof snapshot === "string") {
    snapshot = [].concat(snapshot)
  }

  return (
    <Article key={node.fields.slug}>
      <h3>
        <Link to={`/blog${node.fields.slug}`}>{title}</Link>
      </h3>

      <Time>
        <span className="time">
          {dayjs(node.frontmatter.date).format(`YYYY/MM/DD HH:mm`)}
        </span>
        <Tags tags={tags} />
      </Time>

      <p
        dangerouslySetInnerHTML={{
          __html: node.frontmatter.description || node.excerpt,
        }}
      />

      {snapshot && (
        <div className="blog-snapshots">
          {snapshot.map(pic => (
            <img src={pic} alt="" />
          ))}
        </div>
      )}
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

  .blog-snapshots {
    display: flex;

    > img {
      margin-right: 10px;
      @media ${device.desktop} {
        width: 30%;
      }
    }
  }
`

const Time = styled.span`
  display: inline-block;
  font-size: 13px;

  > .time {
    margin-right: 20px;
  }
`
