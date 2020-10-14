import React from "react"
import { graphql, navigate } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

class NotFoundPage extends React.Component {
  state = {
    countDown: 3,
  }

  componentDidMount() {
    this.tm = setInterval(() => {
      const { countDown } = this.state

      this.setState(
        {
          countDown: countDown - 1,
        },
        () => {
          if (this.state.countDown === 0) {
            clearInterval(this.tm)
            navigate("/")
          }
        }
      )
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.tm)
  }

  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="404: Not Found" />
        <h1>Not Found</h1>
        {/*<p>You just hit a route that doesn't exist... :-(.</p>*/}
        <p id="tips">Will redirect to index page, {this.state.countDown}s...</p>
      </Layout>
    )
  }
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
