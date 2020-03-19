import React from "react"
import { Link, graphql } from "gatsby"
import hastToHyperscript from "hast-to-hyperscript";
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import '../themes/prism-nord.css'

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext

  const renderHtmlToReact = node => {
    return hastToHyperscript(React.createElement, node);
  };

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article id="blog-post">
        <header>
          <div className="blog-post-header">
            <div>
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
            </div>
            <p
              className="blog-post-date"
              style={{
                display: `block`,
              }}
            >
              {post.frontmatter.date}
            </p>
          </div>
          
        </header>
        {/* <section dangerouslySetInnerHTML={{ __html: post.html }} /> */}
        <section>
          <Img fluid={post.frontmatter.featuredImage.childImageSharp.fluid} alt={post.frontmatter.title}/>
          {renderHtmlToReact(post.htmlAst)}
        </section>
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
              <Link to={`${process.env.SLUG_PATH}${previous.frontmatter.slug}`} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={`${process.env.SLUG_PATH}${next.frontmatter.slug}`} rel="next">
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
      htmlAst
      frontmatter {
        title
        subtitle
        featuredImage {
            childImageSharp {
              id
              fluid(maxWidth: 800) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        slug
        date(formatString: "MMMM DD, YYYY")
      }
    }
}
`
