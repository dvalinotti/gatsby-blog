import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle, description }) => (
  <header id="blog-header" className="">
    <div
      className="Header_root"
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <h1 style={{ margin: 0 }} className="Header_title">
        <Link
          to={`${process.env.SLUG_PATH}`}
          id="blog-header-title"
        >
          {siteTitle}
        </Link>
        <div className="title-bg" />
      </h1>
      <small>{description}</small>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
  description: PropTypes.string
}

Header.defaultProps = {
  siteTitle: ``,
  description: ``
}

export default Header
