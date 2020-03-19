import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import FeaturedPost from "../components/featured"
import PostListItem from "../components/post-list-item"

const IndexPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  
  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Recent Posts" />
      <FeaturedPost post={posts[0].node}/>
      
      <div className="old-posts-container">
        {posts.slice(1, posts.length).map(({ node }, key) => {
          return (
            <PostListItem key={key} post={node}/> 
          )
        })}
      </div>
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
          excerpt(format: MARKDOWN)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            slug
            featuredImage {
              childImageSharp {
                id
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            subtitle
            category
          }
        }
      }
    }
  }
`
