import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  initDB, 
  addToCart as dbAddToCart, 
  removeFromCart as dbRemoveFromCart,
  getCart as dbGetCart,
  clearCart as dbClearCart
} from '../services/db';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCart = async () => {
      try {
        await initDB();
        const cartItems = await dbGetCart();
        setItems(cartItems);
      } catch (error) {
        console.error('Error loading cart:', error);
      } finally {
        setLoading(false);
      }
    };
    loadCart();
  }, []);

  const addToCart = async (product) => {
    try {
      await dbAddToCart(product);
      const cartItems = await dbGetCart();
      setItems(cartItems);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      await dbRemoveFromCart(itemId);
      const cartItems = await dbGetCart();
      setItems(cartItems);
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const clearCart = async () => {
    try {
      await dbClearCart();
      setItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const getCartTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const value = {
    items,
    addToCart,
    removeFromCart,
    clearCart,
    getCartTotal,
    loading
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};