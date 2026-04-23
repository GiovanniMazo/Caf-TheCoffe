import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import { useCart } from '../context/CartContext';
import { FaFilter, FaSort, FaTh, FaList } from 'react-icons/fa';
import '../styles/pages/Products.css';

const Products = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('all');
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [lastAddedProduct, setLastAddedProduct] = useState('');
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    setLastAddedProduct(product.name);
    setIsCartVisible(true);
    setTimeout(() => setIsCartVisible(false), 3000);
  };

  const categories = ['all', ...new Set(products.map((p) => p.category))];

  const filteredProducts = products
    .filter((p) => selectedCategory === 'all' || p.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'origin') return a.origin.localeCompare(b.origin);
      return 0;
    });

  return (
    <>
      <Hero
        title="Nuestros Productos"
        subtitle="Descubre cafés premium colombianos ☕"
        imgUrl="/images/products-hero.jpg"
        size="medium"
      />
      <div className="container">
        <div className="products-controls">
          <div className="products-filters">
            <div className="filter-group">
              <FaFilter className="filter-icon" />
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="filter-select">
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'Todas las categorías' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <FaSort className="filter-icon" />
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="filter-select">
                <option value="all">Ordenar por...</option>
                <option value="name">Nombre</option>
                <option value="price">Precio</option>
                <option value="origin">Origen</option>
              </select>
            </div>
          </div>
          <div className="view-toggle">
            <button onClick={() => setViewMode('grid')} className={`view-button ${viewMode === 'grid' ? 'active' : ''}`} title="Vista cuadrícula">
              <FaTh />
            </button>
            <button onClick={() => setViewMode('list')} className={`view-button ${viewMode === 'list' ? 'active' : ''}`} title="Vista lista">
              <FaList />
            </button>
          </div>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <div className={`products-grid ${viewMode}`}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
            ))}
          </div>
        )}
      </div>
      <div className={`cart-notification ${isCartVisible ? 'active' : ''}`}>
        <span className="cart-notification__icon">☕</span>
        <div className="cart-notification__content">
          <strong>¡Agregado!</strong>
          <span>{lastAddedProduct}</span>
        </div>
      </div>
    </>
  );
};

export default Products;

