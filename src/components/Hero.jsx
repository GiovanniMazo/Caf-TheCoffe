import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  const bannerUrl = '/images/banner.jpg';
  const overlay = 'linear-gradient(rgba(44,24,16,0.65), rgba(44,24,16,0.65))';

  return (
    <section
      className="hero"
      style={{
        backgroundImage: `${overlay}, url(${bannerUrl})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="hero__container container">
        <h1 className="hero__title animate-fade-up">
          Café premium 100% colombiano
        </h1>

        <p className="hero__paragraph animate-fade-up delay-1">
          Descubre sabores únicos y aromas irresistibles en cada taza ☕
        </p>

        <div className="hero__buttons animate-fade-up delay-2">
          <Link to="/productos" className="cta cta--primary">
            Ordenar ahora
          </Link>
          <a href="#about" className="cta cta--secondary">
            Conócenos
          </a>
        </div>
      </div>

      {/* Indicador de scroll lateral, discreto */}
      <div className="hero__scroll-side">
        <div className="hero__scroll-icon"></div>
        <span>Desliza</span>
      </div>
    </section>
  );
};

export default Hero;
