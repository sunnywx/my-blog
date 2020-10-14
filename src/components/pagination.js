import React from "react"
import styled from "styled-components"
import classnames from "classnames"
import { Link, navigate } from "gatsby"
import PropTypes from "prop-types"
import {
  BsChevronLeft as IconLeft,
  BsChevronRight as IconRight,
} from "react-icons/bs"

export default class Pagination extends React.PureComponent {
  static propTypes = {
    currentPage: PropTypes.number,
    numPages: PropTypes.number,
  }

  static defaultProps = {
    currentPage: 1,
    numPages: 1,
  }

  handlePrev = e => {
    const { currentPage } = this.props

    e.preventDefault()

    if (currentPage <= 1) {
      return
    }
    navigate(`/blog/${currentPage - 1}`)
  }

  handleNext = e => {
    const { currentPage, numPages } = this.props

    e.preventDefault()

    if (currentPage >= numPages) {
      return
    }

    navigate(`/blog/${currentPage + 1}`)
  }

  renderPrevLink() {
    const { currentPage } = this.props

    return (
      <li
        onClick={this.handlePrev}
        className={classnames({
          disabled: currentPage <= 1,
        })}
      >
        <IconLeft />
      </li>
    )
  }

  renderNextLink() {
    const { currentPage, numPages } = this.props

    return (
      <li
        onClick={this.handleNext}
        className={classnames({
          disabled: currentPage >= numPages,
        })}
      >
        <IconRight />
      </li>
    )
  }

  renderLinkBtns() {
    const { currentPage, numPages } = this.props

    return (
      <>
        {Array.from({ length: numPages }).map((_, i) => {
          let link = i === 0 ? `/blog` : `/blog/${i + 1}`
          return (
            <li
              key={i}
              className={classnames({
                active: currentPage === i + 1,
              })}
            >
              <Link to={link}>{i + 1}</Link>
            </li>
          )
        })}
      </>
    )
  }

  render() {
    return (
      <Paginator>
        {this.renderPrevLink()}
        {this.renderLinkBtns()}
        {this.renderNextLink()}
      </Paginator>
    )
  }
}

const Paginator = styled.ul`
  display: flex;
  justify-content: center;
  margin-left: 0;
  margin-top: 20px;
  color: #333;

  > li {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    list-style-type: none;
    width: 32px;
    height: 32px;
    margin-right: 10px;
    border-radius: 50%;
    background: #f2f2f2;
    box-shadow: 1px 1px 3px #9baab3, -1px -1px 3px #d1e6f2;
    &:hover {
      background: #ededed;
    }

    &.disabled {
      cursor: not-allowed;
      background: lightgrey;
    }

    &.active {
      background: #3962ff;
    }

    > a {
      width: 100%;
      text-align: center;
      text-decoration: none;
    }
  }
`
