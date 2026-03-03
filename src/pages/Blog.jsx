import React from 'react';
import '../styles/pages/Blog.css';

const blogPosts = [
  {
    id: 1,
    title: 'Los beneficios del café orgánico',
    excerpt: 'Descubre por qué el café orgánico es mejor para tu salud y el medio ambiente.',
    date: '15 de Enero, 2025',
    image: '/images/nathan-dumlao-So7cyDtlmls-unsplash.jpg'
  },
  {
    id: 2,
    title: 'Cómo hacer un cappuccino perfecto',
    excerpt: 'Aprende los secretos para preparar un cappuccino con leche texturizada.',
    date: '10 de Enero, 2025',
    image: '/images/primer-plano-de-cafe-capuchino-con-latte-de-arte-en-la-mesa-de-madera.jpg'
  },
  {
    id: 3,
    title: 'Orígenes del café colombiano',
    excerpt: 'Conoce la historia y tradición del café colombiano de alta montaña.',
    date: '5 de Enero, 2025',
    image: '/images/CafeColombia.jpg'
  }
];

const Blog = () => {
  return (
    <div className="blog-page">
      <div className="blog-page__hero">
        <h1>Blog</h1>
        <p>Artículos y noticias sobre el mundo del café</p>
      </div>
      <div className="blog-page__content">
        <div className="blog-grid">
          {blogPosts.map((post) => (
            <article key={post.id} className="blog-card">
              <div className="blog-card__image">
                <img src={post.image} alt={post.title} />
              </div>
              <div className="blog-card__content">
                <span className="blog-card__date">{post.date}</span>
                <h3 className="blog-card__title">{post.title}</h3>
                <p className="blog-card__excerpt">{post.excerpt}</p>
                <button className="blog-card__btn">Leer más</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
