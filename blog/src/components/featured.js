import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"

const FeaturedPost = ({ post }) => (
  <Link className="post-link" to={`${process.env.SLUG_PATH}${post.slug}`}>
    <div className="blog-list-item--container">
      <Img fluid={post.thumbnail.childImageSharp.fluid} alt={post.title}/>
      <article key={post.slug} className="blog-list-item">
        <header>
          <small>{`${post.category.name} // ${post.date_posted}`}</small>
          <h3
            className="blog-list-title" 
            >
              {post.title}
          </h3>
          <p>{post.subtitle}</p>
        </header>
      </article>
    </div>
  </Link>
);

export default FeaturedPost;
