import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  initDB, 
  addToCart as dbAddToCart, 
  removeFromCart as dbRemoveFromCart,
  getCart as dbGetCart,
  clearCart as dbClearCart,
  createOrder as dbCreateOrder
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
      // Check if product already exists in cart
      const existingItem = items.find(item => item.productId === product.id);
      if (existingItem) {
        // Update quantity if already exists
        await dbRemoveFromCart(existingItem.id);
        const updatedProduct = { ...product, quantity: existingItem.quantity + 1 };
        await dbAddToCart(updatedProduct);
      } else {
        await dbAddToCart(product);
      }
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

  const updateQuantity = async (itemId, newQuantity) => {
    try {
      if (newQuantity <= 0) {
        await dbRemoveFromCart(itemId);
      } else {
        const item = items.find(i => i.id === itemId);
        if (item) {
          await dbRemoveFromCart(itemId);
          const updatedItem = {
            productId: item.productId,
            name: item.name,
            price: item.price,
            quantity: newQuantity,
            image: item.image
          };
          await dbAddToCart(updatedItem);
        }
      }
      const cartItems = await dbGetCart();
      setItems(cartItems);
    } catch (error) {
      console.error('Error updating quantity:', error);
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

  const createOrder = async (orderData) => {
    try {
      const order = await dbCreateOrder({
        ...orderData,
        items: items,
        total: getCartTotal()
      });
      return order;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };

  const getCartTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    createOrder,
    getCartTotal,
    getItemCount,
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
