import React, { Component } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Link } from "gatsby"

class Header extends Component {
  static propTypes = {
    title: PropTypes.string,
    hide: PropTypes.bool,
  }

  render() {
    const { title, hide } = this.props

    return (
      <Wrapper hide={hide}>
        <Title>
          <Link to="/">{title}</Link>
        </Title>
      </Wrapper>
    )
  }
}

export default Header

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 50px;
  background: #3f51b5;
  z-index: 10;
  box-shadow: 0 1px 2px 1px rgb(63, 81, 181, 0.3);
  transition: all 0.3s ease-in-out;
  ${({ hide }) => hide && `top: -50px;`}
`

const Title = styled.h1`
  margin: 0 auto;
  font-weight: 200;
  padding-left: 1rem;

  > a {
    text-decoration: none;
    color: white;
    box-shadow: none;
  }
`
