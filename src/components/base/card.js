import React, { PureComponent } from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

class Card extends PureComponent {
  render() {
    const { caption, children, className } = this.props
    return (
      <Wrap className={className}>
        {caption && <header>{caption}</header>}
        {children}
      </Wrap>
    )
  }
}

Card.propTypes = {
  caption: PropTypes.node,
  children: PropTypes.node,
}

export default Card

const Wrap = styled.div`
  padding: 10px 20px;
  margin-bottom: 15px;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  box-shadow: 1px 1px 1px 1px rgba(220, 220, 220, 0.3);
  &:hover {
    box-shadow: 1px 1px 3px 2px rgba(220, 220, 220, 0.5);
  }
`
