import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"

const FeaturedPost = ({ post }) => (
  <Link className="post-link" to={`${process.env.SLUG_PATH}${post.frontmatter.slug}`}>
    <div className="blog-list-item--container">
        <Img fluid={post.frontmatter.featuredImage.childImageSharp.fluid} alt={post.frontmatter.title}/>
      <article key={post.frontmatter.slug} className="blog-list-item">
        <header>
          <small>{`${post.frontmatter.category} // ${post.frontmatter.date}`}</small>
          <h3
            className="blog-list-title" 
            >
              {post.frontmatter.title}
          </h3>
          <p>{post.frontmatter.subtitle}</p>
        </header>
      </article>
    </div>
  </Link>
);

export default FeaturedPost;
