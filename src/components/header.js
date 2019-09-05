import React, { Component } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Link } from "gatsby"

import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"

class Header extends Component {
  static propTypes = {
    title: PropTypes.string,
  }

  render() {
    const { title } = this.props

    return (
      <Wrapper>
        <Toolbar>
          <IconButton edge="start">
            <MenuIcon />
          </IconButton>
          <Title>
            <Link to="/">{title}</Link>
          </Title>
        </Toolbar>
      </Wrapper>
    )
  }
}

export default Header

const Wrapper = styled(AppBar)`
  height: 64px;
`

const Title = styled.h1`
  margin-top: 0;
  margin-bottom: 0;
  font-weight: 500;

  > a {
    text-decoration: none;
    color: white;
    box-shadow: none;
  }
`
