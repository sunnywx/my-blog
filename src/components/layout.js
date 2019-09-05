import React, { Fragment } from "react"
import styled from "styled-components"
import Helmet from "react-helmet"
import Container from "@material-ui/core/Container"

import Header from "./header"

class Layout extends React.Component {
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

        <Header title={title} />
        <StyledContainer>{children}</StyledContainer>
        <Footer>
          © {new Date().getFullYear()}, Built with
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </Footer>
      </Fragment>
    )
  }
}

export default Layout

const StyledContainer = styled(Container)`
  position: relative;
  top: 70px;
`

const Footer = styled.footer`
  position: relative;
  width: 100%;
  bottom: 0;
  transform: translateY(80px);
  display: flex;
  justify-content: center;

  > a {
    margin-left: 5px;
  }
`
