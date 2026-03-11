import React from 'react';
import AboutCard from '../components/AboutCard';
import '../styles/pages/AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="about-page__hero">
        <h1>Sobre Nosotros</h1>
        <p>Conoce nuestra historia y pasión por el café</p>
      </div>
      <div className="about-page__content">
        <h2 className="subtitle">Qué quieres probar de nuevo.</h2>
        <p className="about__paragraph">
          Existe gran variedad de tipos de café que aún no conoces y debes probar ahora mismo.
        </p>
        <div className="about__main">
          <AboutCard 
            title="Capuccino" 
            description="Es una bebida nacida en Italia, preparada con café expreso y leche montada con vapor para darle cremosidad."
            image="/images/primer-plano-de-cafe-capuchino-con-latte-de-arte-en-la-mesa-de-madera.jpg"
          />
          <AboutCard 
            title="Mocacino" 
            description="Es una variante del café con leche. Lleva expreso, leche vaporizada y chocolate en jarabe o polvo."
            image="/images/manos-bronceadas-femeninas-sostiene-un-vaso-de-cafe-con-leche-de-coco.jpg"
          />
          <AboutCard 
            title="Espresso" 
            description="Es un tipo de café negro fuerte que se forma cuando el agua caliente pasa a mucha presión a través del café molido."
            image="/images/nathan-dumlao-So7cyDtlmls-unsplash.jpg"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
