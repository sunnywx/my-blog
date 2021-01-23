import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Link, useStaticQuery, graphql } from "gatsby"
import { VscGithub, VscTwitter, VscRss } from "react-icons/vsc"
import { FaLinkedin, FaZhihu } from "react-icons/fa"

const Header = ({ title, hide }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          social {
            twitter
            github
            linkedin
            zhihu
          }
        }
      }
    }
  `)

  const { social } = data.site.siteMetadata

  return (
    <Wrapper hide={hide}>
      <Title>
        <Link to="/">{title}</Link>
      </Title>

      <NavMenu>
        <li>
          <a
            href={`https://github.com/${social.github}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <VscGithub />
          </a>
        </li>
        <li>
          <a
            href={`https://twitter.com/${social.twitter}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <VscTwitter />
          </a>
        </li>
        <li>
          <a
            href={`https://linkedin.com/in/${social.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>
        </li>
        <li>
          <a
            href={`https://zhihu.com/column/${social.zhihu}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaZhihu />
          </a>
        </li>
        <li>
          <Link to="/rss.xml">
            <VscRss />
          </Link>
        </li>
      </NavMenu>
    </Wrapper>
  )
}

Header.propTypes = {
  title: PropTypes.string,
  hide: PropTypes.bool,
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
  background: #fdfdfd;
  color: #000;
  z-index: 10;
  box-shadow: 1px 0 5px rgb(0, 0, 0, 0.3);
  transition: all 0.3s ease-in-out;
  ${({ hide }) => hide && `top: -50px;`}
`

const Title = styled.h1`
  font-weight: 200;
  margin: 0;

  > a {
    text-decoration: none;
    //color: white;
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
    top: 5px;
    float: left;
    margin-left: 15px;
  }
`
