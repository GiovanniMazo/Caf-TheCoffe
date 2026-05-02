import React, { useEffect, useRef } from 'react';
import { formatCurrency } from '../utils/formatCurrency';
import StarRating from './StarRating';
import '../styles/components/ProductCard.css';

/* eslint-disable no-undef */
const ProductCard = ({ product, onAddToCart }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current && window.VanillaTilt) {
      VanillaTilt.init(cardRef.current, {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.3,
        "glare-prerender": true,
        gyroscope: true,
      });
    }
  }, []);

  return (
    <div className="tilt-3d product-card" ref={cardRef}>
      <div className="tilt-3d-inner product-card__inner">
        <div className="product-card__image-container">
          <img src={product.image} alt={product.name} className="product-card__image" />
          {product.bestseller && (
            <span className="product-card__badge">Más vendido</span>
          )}
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
          <StarRating rating={product.rating || 0} reviewCount={product.reviewCount || 0} />
          <p className="product-card__description">{product.description}</p>
          <span className="product-card__price">{formatCurrency(product.price)}</span>
        </div>
      </div>
    </div>
  );
};
/* eslint-enable no-undef */

export default ProductCard;

