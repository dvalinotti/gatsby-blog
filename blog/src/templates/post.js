import React from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";
import ReactMarkdown from "react-markdown"  

import Layout from "../components/layout"
import CodeBlock from '../components/codeblock';
import SEO from "../components/seo"
import '../themes/prism-nord.css'

const PostTemplate = ({ data, pageContext, location }) => {
  const post = data;
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.strapiPost.title}
        description={post.strapiPost.description || post.excerpt}
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
                {post.strapiPost.title}
              </h1>
              {post.strapiPost.subtitle && (
                <h6 className="blog-post-subtitle">
                  {post.strapiPost.subtitle}
                </h6>
              )}
            </div>
            <p
              className="blog-post-date"
              style={{
                display: `block`,
              }}
            >
              {post.strapiPost.date_posted}
            </p>
          </div>
          
        </header>
        <section>
          <Img fluid={post.strapiPost.thumbnail.childImageSharp.fluid} alt={post.strapiPost.title}/>
          <ReactMarkdown source={post.strapiPost.content} renderers={{ code: CodeBlock }}/>
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
              <Link to={`${process.env.SLUG_PATH}${previous.strapiPost.slug}`} rel="prev">
                ← {previous.strapiPost.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={`${process.env.SLUG_PATH}${next.strapiPost.slug}`} rel="next">
                {next.strapiPost.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default PostTemplate;

export const pageQuery = graphql`
query PostTemplate($slug: String!) {
    site {
        siteMetadata {
          title
        }
    }
    strapiPost(slug: {eq: $slug}) {
      title
      content
      subtitle
      slug
      date_posted
      thumbnail {
        childImageSharp {
              id
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid
                }
            }
        }
    }
  }
`
