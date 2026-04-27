import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  initDB, 
  addToCart as dbAddToCart, 
  removeFromCart as dbRemoveFromCart,
  getCart as dbGetCart,
  clearCart as dbClearCart,
  createOrder as dbCreateOrder
} from '../services/db';
import { registerUser as apiRegisterUser, loginUser as apiLoginUser } from '../services/api';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Persist user to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  useEffect(() => {
    const loadCart = async () => {
      try {
        await initDB();
        const cartItems = await dbGetCart();
        setItems(cartItems);
      } catch (error) {
        // silently fail
      } finally {
        setLoading(false);
      }
    };
    loadCart();
  }, []);

  const addToCart = async (product) => {
    try {
      const existingItem = items.find(item => item.productId === product.id);
      if (existingItem) {
        await dbRemoveFromCart(existingItem.id);
        const updatedProduct = { ...product, quantity: existingItem.quantity + 1 };
        await dbAddToCart(updatedProduct);
      } else {
        await dbAddToCart(product);
      }
      const cartItems = await dbGetCart();
      setItems(cartItems);
    } catch (error) {
      // silently fail
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      await dbRemoveFromCart(itemId);
      const cartItems = await dbGetCart();
      setItems(cartItems);
    } catch (error) {
      // silently fail
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
      // silently fail
    }
  };

  const clearCart = async () => {
    try {
      await dbClearCart();
      setItems([]);
    } catch (error) {
      // silently fail
    }
  };

  const registerUser = async (userData) => {
    try {
      const response = await apiRegisterUser(userData);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const loginUser = async (credentials) => {
    try {
      const response = await apiLoginUser(credentials);
      const loggedUser = response.user;
      setUser(loggedUser);
      return loggedUser;
    } catch (error) {
      throw error;
    }
  };

  const logoutUser = () => {
    setUser(null);
  };

  const createOrder = async (orderData) => {
    try {
      const orderWithUser = {
        ...orderData,
        ...(user && { userId: user.id })
      };
      const order = await dbCreateOrder({
        ...orderWithUser,
        items: items,
        total: getCartTotal()
      });
      return order;
    } catch (error) {
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
    user,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    registerUser,
    loginUser,
    logoutUser,
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

