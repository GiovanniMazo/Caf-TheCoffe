import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { CartProvider } from './context/CartContext';
import { AdminProvider } from './context/AdminContext';

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
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminProducts from './pages/AdminProducts';
import AdminOrders from './pages/AdminOrders';
import AdminRoute from './components/AdminRoute';
import AdminLayout from './components/AdminLayout';
import './styles/index.css';
import './styles/App.css';

const MainContent = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Admin routes render without Header/Footer
  if (isAdminRoute) {
    return (
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/*"
            element={
              <AdminRoute>
                <AdminLayout>
                  <Routes>
                    <Route path="/" element={<AdminDashboard />} />
                    <Route path="/usuarios" element={<AdminDashboard />} />
                    <Route path="/ordenes" element={<AdminOrders />} />
                    <Route path="/productos" element={<AdminProducts />} />
                  </Routes>
                </AdminLayout>
              </AdminRoute>
            }
          />
        </Routes>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        className={`app ${isHomePage ? 'home-page' : ''}`}
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <main>
          <Routes location={location} key={location.pathname}>
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
      </motion.div>
    </AnimatePresence>
  );
};

const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <CartProvider>
      {!isAdminRoute && <Header currentPath={location.pathname} />}
      <MainContent />
      {!isAdminRoute && <Footer />}
    </CartProvider>
  );
};

const App = () => {
  /* eslint-disable no-undef */
  useEffect(() => {
    if (window.VanillaTilt) {
      VanillaTilt.init(document.querySelectorAll('.tilt-3d'), {
        max: 12,
        speed: 400,
        glare: false,
      });
    }
  }, []);
  /* eslint-enable no-undef */

  return (
    <Router>
      <AdminProvider>
        <AppContent />
      </AdminProvider>
    </Router>
  );
};

export default App;

