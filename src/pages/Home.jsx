import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import PriceCard from '../components/PriceCard';
import Testimony from '../components/Testimony';
import { FaCoffee, FaShippingFast, FaStar, FaArrowRight, FaMapMarkerAlt } from 'react-icons/fa';
import '../styles/pages/Home.css';

const towns = [
  {
    id: 1,
    name: 'Jardín',
    description: 'Conocido por sus coloridas fachadas y cafetales de altura, Jardín produce uno de los mejores cafés de Antioquia con notas florales y cítricas.',
    image: '/images/nathan-dumlao-dvuHNTJxIsg-unsplash.jpg',
    highlight: '1.800 msnm'
  },
  {
    id: 2,
    name: 'Jericó',
    description: 'Tierra del café mujer y del paisaje cultural cafetero, Jericó ofrece granos de cuerpo medio y acidez brillante cultivados en sus montañas.',
    image: '/images/primer-plano-de-cafe-capuchino-con-latte-de-arte-en-la-mesa-de-madera.jpg',
    highlight: '2.100 msnm'
  },
  {
    id: 3,
    name: 'Andes',
    description: 'Situado en el suroeste antioqueño, Andes es cuna de cafés con perfil chocolatado, dulzor pronunciado y aroma intenso.',
    image: '/images/tabitha-turner-3n3mPoGko8g-unsplash.jpg',
    highlight: '1.600 msnm'
  },
  {
    id: 4,
    name: 'Ciudad Bolívar',
    description: 'Sus tierras volcánicas y clima húmedo generan cafés de especialidad con cuerpo cremoso y notas a frutos secos.',
    image: '/images/manos-bronceadas-femeninas-sostiene-un-vaso-de-cafe-con-leche-de-coco.jpg',
    highlight: '1.550 msnm'
  }
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">

      {/* HERO PRINCIPAL */}
      <Hero />

      {/* SECCIÓN DE CONFIANZA */}
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

      {/* PROMOCIÓN */}
      <section className="promo-section">
        <div className="container">
          <PriceCard />
        </div>
      </section>

      {/* SOBRE NOSOTROS */}
      <section className="about-section">
        <div className="container">
          <div className="about-grid">
            <div className="about-image">
              <img src="/images/CafeColombia.jpg" alt="Nuestro café colombiano" />
            </div>
            <div className="about-content">
              <span className="about-label">Nuestra Historia</span>
              <h2 className="about-title">Conectamos el campo colombiano con tu taza</h2>
              <p className="about-text">
                En The Coffee Club trabajamos directamente con familias caficultoras de los 
                pueblos más emblemáticos de Antioquia. Seleccionamos a mano cada grano, 
                tostamos con precisión artesanal y entregamos fresco a tu puerta.
              </p>
              <p className="about-text">
                Nuestra misión es dignificar el trabajo de los campesinos cafeteros y 
                llevar hasta tu hogar el auténtico sabor de las montañas colombianas.
              </p>
              <button className="about-cta" onClick={() => navigate('/productos')}>
                Conoce nuestros cafés <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PUEBLOS CAFETEROS DE ANTIOQUIA */}
      <section className="towns-section">
        <div className="container">
          <div className="towns-header">
            <span className="towns-label">Origen</span>
            <h2 className="towns-title">Pueblos Cafeteros de Antioquia</h2>
            <p className="towns-subtitle">
              Explora las tierras donde nace nuestro café de especialidad
            </p>
          </div>
          
          <div className="towns-grid">
            {towns.map(town => (
              <div key={town.id} className="town-card" onClick={() => navigate('/productos')}>
                <div className="town-card__image">
                  <img src={town.image} alt={town.name} />
                  <div className="town-card__overlay">
                    <button className="town-card__btn">
                      Ver productos <FaArrowRight />
                    </button>
                  </div>
                </div>
                <div className="town-card__content">
                  <div className="town-card__meta">
                    <FaMapMarkerAlt />
                    <span>{town.highlight}</span>
                  </div>
                  <h3 className="town-card__name">{town.name}</h3>
                  <p className="town-card__desc">{town.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="testimonials-section">
        <div className="container">
          <Testimony />
        </div>
      </section>
    </div>
  );
};

export default Home;

