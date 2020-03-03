import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  console.log(process.env.NODE_ENV);
  console.log(process.env.SLUG_PATH);

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Recent Posts" />
      <header id="recent-posts">Recent Posts</header>

      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <article key={node.frontmatter.slug} className="blog-list-item">
            <header>
              <h3
                class="blog-list-title" 
              >
                <Link to={`${process.env.SLUG_PATH}${node.frontmatter.slug}`}>
                  {title}
                </Link>
              </h3>
              <small>{node.frontmatter.date}</small>
            </header>
          </article>
        )
      })}
    </Layout>
  )
}

export default IndexPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            slug
            subtitle
          }
        }
      }
    }
  }
`
