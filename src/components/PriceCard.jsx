import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import { FaArrowRight, FaShoppingCart } from 'react-icons/fa';

const PriceCard = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  // Get a featured product for the promotion
  const featuredProduct = products[0];

  const handleBuy = () => {
    addToCart(featuredProduct);
    navigate('/checkout');
  };

  return (
    <div className="price__card">
      <div className="price__card-image">
        <img src={featuredProduct.image} alt={featuredProduct.name} />
        <span className="price__card-badge">Oferta Especial</span>
      </div>
      
      <div className="price__card-content">
        <div className="price__card-header">
          <span className="price__card-label">Edición Limitada</span>
          <h3 className="price__card-title">{featuredProduct.name}</h3>
          <p className="price__card-description">{featuredProduct.description}</p>
        </div>
        
        <div className="price__card-details">
          <div className="price__card-detail-item">
            <span className="detail-icon">🌍</span>
            <div className="detail-text">
              <span className="detail-label">Origen</span>
              <span className="detail-value">{featuredProduct.origin}</span>
            </div>
          </div>
          <div className="price__card-divider" />
          <div className="price__card-detail-item price__card-detail-item--price">
            <span className="detail-icon">🏷️</span>
            <div className="detail-text">
              <span className="detail-label">Precio</span>
              <div className="price__card-price-value">
                <span className="price__card-currency">COP</span>
                <span className="price__card-amount">{featuredProduct.price.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
        
        <button className="price__card-cta" onClick={handleBuy}>
          <FaShoppingCart />
          <span>Comprar Ahora</span>
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default PriceCard;

