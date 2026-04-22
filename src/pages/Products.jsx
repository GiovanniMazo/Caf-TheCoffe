import React, { useState } from 'react';
import Hero from '../components/Hero';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import '../styles/pages/Products.css';

const Products = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('all');
  const [isCartVisible, setIsCartVisible] = useState(false);

  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
    setIsCartVisible(true);
    setTimeout(() => setIsCartVisible(false), 2000);
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
        size="small"
      />
      <div className="container">
        <div className="products-controls">
          <div className="products-filters">
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="filter-select">
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'Todos' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="filter-select">
              <option value="name">Ordenar por nombre</option>
              <option value="price">Ordenar por precio</option>
              <option value="origin">Ordenar por origen</option>
            </select>
          </div>
          <div className="view-toggle">
            <button onClick={() => setViewMode('grid')} className={`view-button ${viewMode === 'grid' ? 'active' : ''}`}>
              🗃️ Cuadrícula
            </button>
            <button onClick={() => setViewMode('list')} className={`view-button ${viewMode === 'list' ? 'active' : ''}`}>
              📄 Lista
            </button>
          </div>
        </div>
        <div className={`products-grid ${viewMode}`}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </div>
      <div className={`cart-notification ${isCartVisible ? 'active' : ''}`}>
        ☕ Producto agregado al carrito
      </div>
    </>
  );
};

export default Products;

