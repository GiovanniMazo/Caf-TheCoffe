import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import AboutCard from '../components/AboutCard';
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
              <span className="trust-section__icon">☕</span>
              <span className="trust-section__text">Café artesanal</span>
            </div>
            <div className="trust-section__divider">|</div>
            <div className="trust-section__item">
              <span className="trust-section__icon">🚚</span>
              <span className="trust-section__text">Envíos nacionales</span>
            </div>
            <div className="trust-section__divider">|</div>
            <div className="trust-section__item">
              <span className="trust-section__icon">⭐</span>
              <span className="trust-section__text">Clientes satisfechos</span>
            </div>
          </div>
        </div>
      </section>

      {/* 🟤 SECCIÓN ABOUT */}
      <section id="about" className="about section">
        <h2 className="subtitle">Qué quieres probar de nuevo</h2>
        <p className="about__paragraph">
          Existe gran variedad de tipos de café que aún no conoces y debes probar ahora mismo.
        </p>
        <AboutCard />
      </section>

      {/* 🟤 SECCIÓN DE PLAN / PROMOCIÓN */}
      <section className="price section">
        <h2 className="subtitle">El plan perfecto para un día frío ☕</h2>
        <PriceCard />

        <div className="price__more">
          <h3 className="subtitle">¿Quieres conocer más cafés?</h3>
          <Link to="/productos" className="cta cta--more">
            Nuestros cafés ☕
          </Link>
        </div>
      </section>

      {/* 🟤 LISTA DE PRODUCTOS */}
      <section className="products-preview section">
        <h2 className="subtitle">Conoce nuestros productos</h2>
        <ProductList />
      </section>

      {/* 🟤 TESTIMONIOS */}
      <section className="testimony section">
        <Testimony />
      </section>
    </div>
  );
};

export default Home;
