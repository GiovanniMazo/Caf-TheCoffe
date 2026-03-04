import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

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
      <div className="price__card-header">
        <span className="price__card-badge">Oferta Especial</span>
        <h3 className="price__card-title">{featuredProduct.name}</h3>
        <p className="price__card-description">{featuredProduct.description}</p>
      </div>
      <div className="price__card-body">
        <div className="price__card-image">
          <img src={featuredProduct.image} alt={featuredProduct.name} />
        </div>
        <div className="price__card-info">
          <span className="price__card-origin">Origen: {featuredProduct.origin}</span>
          <div className="price__card-price">
            <span className="price__card-currency">COP</span>
            <span className="price__card-amount">{featuredProduct.price.toLocaleString()}</span>
          </div>
        </div>
      </div>
      <button className="price__card-cta" onClick={handleBuy}>
        Comprar Ahora
      </button>
    </div>
  );
};

export default PriceCard;

