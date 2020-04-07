import React, { Component } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Link } from "gatsby"
import IconGithub from "assets/github.svg"
import IconRss from "assets/rss.svg"

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
        <NavMenu>
          <li>
            <a href="https://github.com/iwisunny">
              <IconGithub />
            </a>
          </li>
          <li>
            <Link to="/rss.xml">
              <IconRss style={{ position: "relative", top: "3px" }} />
            </Link>
          </li>
        </NavMenu>
      </Wrapper>
    )
  }
}

export default Header

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  padding-left: 1rem;
  padding-right: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  background: #3f51b5;
  z-index: 10;
  box-shadow: 0 1px 2px 1px rgb(63, 81, 181, 0.3);
  transition: all 0.3s ease-in-out;
  ${({ hide }) => hide && `top: -50px;`}
`

const Title = styled.h1`
  font-weight: 200;
  margin: 0;

  > a {
    text-decoration: none;
    color: white;
    box-shadow: none;
  }
`

const NavMenu = styled.ul`
  height: 100%;
  margin-bottom: 0;
  line-height: 50px;
  list-style-type: none;

  > li {
    position: relative;
    top: 3px;
    float: left;
    margin-left: 10px;
  }
`
