import React from 'react';
import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';

const BlogCard = ({ post }) => (
  <article className="blog-card">
    <div className="blog-card__image">
      <img src={post.image} alt={post.title} loading="lazy" />
      {post.isFeatured && <span className="badge badge--featured">Destacado</span>}
      {post.mostRead && <span className="badge badge--mostread">Más leídos</span>}
    </div>
    <div className="blog-card__content">
      <div className="blog-card__meta">
        <span className="category">{post.category}</span>
        <span className="date">{post.date}</span>
        <span className="views">
          <FaEye /> {post.views}
        </span>
      </div>
      <h3 className="blog-card__title">{post.title}</h3>
      <p className="blog-card__excerpt">{post.excerpt}</p>
      <div className="blog-card__footer">
        <Link to={`/blog/${post.id}`} className="cta cta--secondary">Leer más</Link>
        <Link to={post.productLink} className="cta cta--primary">Comprar este café</Link>
      </div>
      <p className="blog-card__author">Por {post.author}</p>
    </div>
  </article>
);

export default BlogCard;

