import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import BlogCard from '../components/BlogCard';
import { blogPosts } from '../data/blogPosts';
import '../styles/pages/Blog.css';
import '../styles/components/BlogCard.css';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  const categories = ['all', ...new Set(blogPosts.map(post => post.category))];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredPosts = blogPosts
    .filter(post =>
      (post.title.toLowerCase().includes(searchTerm) ||
        post.excerpt.toLowerCase().includes(searchTerm)) &&
      (selectedCategory === 'all' || post.category === selectedCategory)
    )
    .sort((a, b) => b.views - a.views);

  const featuredPosts = blogPosts.filter(p => p.isFeatured).slice(0, 3);
  const mostReadPosts = blogPosts.filter(p => p.mostRead).slice(0, 3);

  return (
    <div className="blog-page">

     <Hero 
      title="Blog"
      subtitle="Recetas, tips y secretos del café ☕"
      imgUrl="/images/tabitha-turner-3n3mPoGko8g-unsplash.jpg"
      size="small"
        />
      <div className="container">

        {/* CONTROLES */}
        <div className="blog-controls">

          <input
            type="text"
            placeholder="Buscar artículos..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="filter-select"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'Todas' : cat}
              </option>
            ))}
          </select>

          <div className="view-toggle">
            <button
              className={`view-button ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              Grid
            </button>
            <button
              className={`view-button ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              Lista
            </button>
          </div>
        </div>

        {/* GRID */}
        <div className={`blog-grid ${viewMode === 'list' ? 'list' : ''}`}>
          {filteredPosts.map(post => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <p className="no-results">No se encontraron artículos</p>
        )}
      </div>

      {/* DESTACADOS */}
      <section className="section">
        <div className="container">
          <h2>Destacados</h2>
          <div className="blog-grid">
            {featuredPosts.map(post => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* MÁS LEÍDOS */}
      <section className="section alt">
        <div className="container">
          <h2>Más leídos</h2>
          <div className="blog-grid">
            {mostReadPosts.map(post => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* AUTOR */}
      <section className="author-section">
        <div className="container author-content">
          <img src="/images/placeholder-coffee.jpg" alt="autor" />
          <div>
            <h3>The Coffee Club</h3>
            <p>Expertos en café colombiano premium ☕</p>
            <Link to="/productos" className="cta">
              Ver productos
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Blog;