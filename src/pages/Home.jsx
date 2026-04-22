import React from 'react';
import Hero from '../components/Hero';
import PriceCard from '../components/PriceCard';
import Testimony from '../components/Testimony';
import ProductList from '../components/ProductList';
import { FaCoffee, FaShippingFast, FaStar } from 'react-icons/fa';
import '../styles/pages/Home.css';

const Home = () => {
  return (
    <div className="home-page">

      {/* 🟤 HERO PRINCIPAL */}
      <Hero />

      {/* 🟤 SECCIÓN DE CONFIANZA */}
      <section className="trust-section">
        <div className="trust-section__container container">
          <div className="trust-section__items">
            <div className="trust-section__item">
              <FaCoffee size={32} />
              <span>Café artesanal 100% colombiano</span>
            </div>
            <div className="trust-section__divider">•</div>
            <div className="trust-section__item">
              <FaShippingFast size={32} />
              <span>Envíos a toda Colombia</span>
            </div>
            <div className="trust-section__divider">•</div>
            <div className="trust-section__item">
              <FaStar size={32} />
              <span>Calidad garantizada</span>
            </div>
          </div>
        </div>
      </section>

      {/* 🟤 PROMOCIÓN */}
      <section className="promo-section">
        <div className="container">
          <PriceCard />
        </div>
      </section>

      {/* 🟤 PRODUCTOS */}
      <section className="products-section">
        <div className="container">
          <h2 className="section-title">Nuestros Productos</h2>
          <ProductList limit={8} />
        </div>
      </section>

      {/* 🟤 TESTIMONIOS */}
      <section className="testimonials-section">
        <div className="container">
          <Testimony />
        </div>
      </section>
    </div>
  );
};

export default Home;
