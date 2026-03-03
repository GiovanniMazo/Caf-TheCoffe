import React from 'react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatCurrency';
import '../styles/components/Cart.css';

const Cart = () => {
  const { items, removeFromCart, clearCart, getCartTotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="cart cart--empty">
        <h2>Tu carrito está vacío</h2>
        <p>¡Agrega algunos productos deliciosos!</p>
      </div>
    );
  }

  return (
    <div className="cart">
      <h2 className="cart__title">Tu Carrito</h2>
      
      <div className="cart__items">
        {items.map(item => (
          <div key={item.id} className="cart-item">
            <div className="cart-item__image">
              <img src={item.image} alt={item.name} />
            </div>
            
            <div className="cart-item__details">
              <h3 className="cart-item__name">{item.name}</h3>
              <p className="cart-item__price">{formatCurrency(item.price)}</p>
              <p className="cart-item__quantity">Cantidad: {item.quantity}</p>
            </div>
            
            <div className="cart-item__total">
              {formatCurrency(item.price * item.quantity)}
            </div>
            
            <button 
              onClick={() => removeFromCart(item.id)}
              className="cart-item__remove"
              aria-label="Eliminar del carrito"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      
      <div className="cart__footer">
        <button onClick={clearCart} className="cart__clear">
          Limpiar carrito
        </button>
        <div className="cart__total">
          <span>Total:</span>
          <strong>{formatCurrency(getCartTotal())}</strong>
        </div>
        <button className="cart__checkout">
          Proceder al pago
        </button>
      </div>
    </div>
  );
};

export default Cart;