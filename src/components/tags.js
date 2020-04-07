import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import IconTag from "assets/tag.svg"

export default class Tags extends React.PureComponent {
  static propTypes = {
    tags: PropTypes.array,
  }

  static defaultProps = {
    tags: [],
  }

  renderTags() {
    const { tags } = this.props

    if (!tags.length) {
      return <span className="no-data">暂无</span>
    }

    return tags.map((tag, idx) => {
      return (
        <span className="tag-item" key={idx}>
          {tag}
        </span>
      )
    })
  }

  render() {
    return (
      <Wrap>
        <span>
          <IconTag style={{ width: "16px", height: "16px" }} />
        </span>
        {this.renderTags()}
      </Wrap>
    )
  }
}

const Wrap = styled.span`
  display: inline-block;

  > span {
    position: relative;
    top: 5px;
    margin-right: 5px;
  }
  .no-data {
    position: relative;
    top: 2px;
    color: #777;
  }
  > .tag-item {
    position: relative;
    top: 0;
    font-size: 12px;
    margin-right: 10px;
    background: #f2f2f2;
    color: #999;
    padding: 2px 4px;
    border-radius: 4px;
  }
`
