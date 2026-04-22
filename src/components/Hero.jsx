import React from 'react';
import '../styles/components/Hero.css';

const Hero = ({ title = "The Coffee Club", subtitle = "Café premium colombiano ☕", imgUrl = '/images/banner.jpg' }) => (
  <section
    className="hero"
    style={{
      backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${imgUrl})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
    }}
  >
    <div className="hero__container container">
      <h1 className="hero__title animate-fade-up">{title}</h1>
      <p className="hero__paragraph animate-fade-up delay-1">{subtitle}</p>
    </div>
  </section>
);

export default Hero;

