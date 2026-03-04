import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

const ProductList = ({ viewMode = 'grid', limit = 4 }) => {
  const { addToCart } = useCart();
  const [isCartVisible, setIsCartVisible] = useState(false);

  // Show limited products on home page
  const displayProducts = limit ? products.slice(0, limit) : products;

  const handleAddToCart = (product) => {
    addToCart(product);
    // Mostrar notificación
    setIsCartVisible(true);
    setTimeout(() => setIsCartVisible(false), 2000);
  };

  return (
    <section className="products-section" id="products">
      <div className="container">
        <div className={viewMode === 'grid' ? 'products-grid' : 'products-list'}>
          {displayProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>
      <div className={`cart-notification ${isCartVisible ? 'active' : ''}`}>
        ¡Producto agregado al carrito!
      </div>
    </section>
  );
};

export default ProductList;
