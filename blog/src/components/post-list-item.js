import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"

const PostListItem = ({ post }) => (
  <Link className="post-link" to={`${process.env.SLUG_PATH}${post.frontmatter.slug}`}>
    <div className="blog-list-item--container1">
      <Img fluid={post.frontmatter.featuredImage.childImageSharp.fluid} alt={post.frontmatter.title}/>
      <article key={post.frontmatter.slug} className="blog-list-item blog-list-item--old">
        <header>
          <small>{`${post.frontmatter.category} // ${post.frontmatter.date}`}</small>
          <h3
            className="blog-list-title" 
            >
            <Link to={`${process.env.SLUG_PATH}${post.frontmatter.slug}`}>
              {post.frontmatter.title}
            </Link>
          </h3>
          <p>{post.frontmatter.subtitle}</p>
        </header>
      </article>
    </div>
  </Link>
);

export default PostListItem;
