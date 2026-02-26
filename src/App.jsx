import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import Checkout from './pages/Checkout';
import Recipes from './pages/Recipes';
import Products from './pages/Products';
import Cart from './components/Cart';
import './index.css';
import './App.css';

const MainContent = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  return (
    <div className={`app ${isHomePage ? 'home-page' : ''}`}>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre-mi" element={<AboutPage />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/recetas" element={<Recipes />} />
          <Route path="/productos" element={<Products />} />
          <Route path="/carrito" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <CartProvider>
        <Header />
        <MainContent />
        <Footer />
      </CartProvider>
    </Router>
  );
};

export default App;