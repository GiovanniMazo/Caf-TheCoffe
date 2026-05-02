import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import { useCart } from '../context/CartContext';
import { fetchProducts } from '../services/api';
import { products as localProducts } from '../data/products';
import { FaFilter, FaSort, FaTh, FaList } from 'react-icons/fa';
import '../styles/pages/Products.css';

const Products = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('all');
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [lastAddedProduct, setLastAddedProduct] = useState('');
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  const { addToCart } = useCart();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();

        // Si el backend no está disponible, fetchProducts devuelve array vacío
        if (!data || data.length === 0) {
          console.warn('⚠️ Backend no disponible o sin productos. Usando productos locales.');
          setProducts(localProducts);
          setLoading(false);
          return;
        }

        // Mapear campos de PostgreSQL al formato del frontend
        const mapped = data.map(p => ({
          id: p.id,
          name: p.nombre || p.name,
          description: p.descripcion || p.description,
          price: Number(p.precio || p.price),
          image: p.imagen || p.image || '/placeholder-coffee.jpg',
          category: p.categoria_id ? String(p.categoria_id) : (p.category || 'general'),
          origin: p.origin || 'Colombia',
          rating: p.rating || 4.5,
          reviewCount: p.reviewCount || 0,
          bestseller: p.bestseller || false
        }));
        setProducts(mapped);
      } catch (err) {
        console.warn('⚠️ Error cargando productos. Usando locales:', err);
        setProducts(localProducts);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
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

        {error && (
          <div className="products-error" style={{textAlign: 'center', padding: '2rem', color: '#dc2626'}}>
            {error}
          </div>
        )}

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

