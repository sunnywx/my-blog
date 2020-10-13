import React, { Fragment } from "react"
import styled from "styled-components"
import Helmet from "react-helmet"
import { throttle } from "lodash"

import Header from "./header"
import { device } from "../config/device-size"

const scrollThreshold = 100

class Layout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hideHeader: false,
    }

    this.throttleScroll = throttle(this.handleScroll, 100)
  }

  get scrollTop() {
    return window.pageYOffset || document.documentElement.scrollTop
  }

  componentDidMount() {
    this.lastScrollY = this.scrollTop
    document.addEventListener("scroll", this.throttleScroll)
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.throttleScroll)
  }

  handleScroll = e => {
    const isScrollDown = this.lastScrollY < this.scrollTop
    this.lastScrollY = this.scrollTop

    if (isScrollDown) {
      if (this.scrollTop > scrollThreshold) {
        this.setState({ hideHeader: true })
      }
    } else {
      this.setState({ hideHeader: false })
    }
  }

  render() {
    const { title, children } = this.props

    return (
      <Fragment>
        <Helmet>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          />
        </Helmet>

        <Header title={title} hide={this.state.hideHeader} />
        <Container>{children}</Container>
        <Footer>© {new Date().getFullYear()}, Built with ❤️</Footer>
      </Fragment>
    )
  }
}

export default Layout

const Container = styled.main`
  position: relative;
  top: 60px;
  margin-left: 1.5rem;
  margin-right: 1.5rem;
  max-width: 90%;
  min-height: calc(100vh - 100px);

  @media ${device.desktop} {
    max-width: 960px;
    margin-left: auto;
    margin-right: auto;
  }
`

const Footer = styled.footer`
  position: relative;
  width: 100%;
  bottom: 0;
  transform: translateY(80px);
  display: flex;
  justify-content: center;
`