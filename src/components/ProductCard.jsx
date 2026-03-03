import React from 'react';
import { formatCurrency } from '../utils/formatCurrency';
import '../styles/components/ProductCard.css';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="product-card">
      <div className="product-card__image-container">
        <img src={product.image} alt={product.name} className="product-card__image" />
        <div className="product-card__overlay">
          <button 
            className="product-card__button"
            onClick={() => onAddToCart(product)}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
      <div className="product-card__content">
        <h3 className="product-card__title">{product.name}</h3>
        <p className="product-card__description">{product.description}</p>
        <span className="product-card__price">{formatCurrency(product.price)}</span>
      </div>
    </div>
  );
};

export default ProductCard;