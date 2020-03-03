import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import '../themes/prism-nord.css'

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article id="blog-post">
        <header>
          <h1
            className="blog-post-title"
            style={{
              marginTop: 30,
              marginBottom: 0,
            }}
          >
            {post.frontmatter.title}
          </h1>
          {post.frontmatter.subtitle && (
            <h6 className="blog-post-subtitle">
              {post.frontmatter.subtitle}
            </h6>
          )}
          <p
            className="blog-post-date"
            style={{
              display: `block`,
              marginBottom: 30,
            }}
          >
            {post.frontmatter.date}
          </p>
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr
          style={{
            marginBottom: 30,
          }}
        />
      </article>

      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.frontmatter.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.frontmatter.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
query BlogPostBy($id: String!) {
    site {
        siteMetadata {
          title
        }
    }
    markdownRemark(id: { eq: $id }) {
        id
        excerpt(pruneLength: 160)
        html
        frontmatter {
          title
          subtitle
          slug
          date(formatString: "MMMM DD, YYYY")
        }
    }
}
`
