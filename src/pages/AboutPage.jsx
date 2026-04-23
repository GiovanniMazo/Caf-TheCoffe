import React from 'react';
import Hero from '../components/Hero';
import AboutCard from '../components/AboutCard';
import '../styles/pages/AboutPage.css';

const AboutPage = () => (
  <>
    <Hero
      title="Sobre Nosotros"
      subtitle="Nuestra pasión por el café colombiano auténtico ☕"
      imgUrl="/images/manos-bronceadas-femeninas-sostiene-un-vaso-de-cafe-con-leche-de-coco.jpg"
      size="medium"
    />
    <div className="about-page__content">
      <h2 className="subtitle">Qué quieres probar de nuevo.</h2>
      <p className="about__paragraph">
        Existe gran variedad de tipos de café que aún no conoces y debes probar ahora mismo.
      </p>
      <div className="coffee-types">
        <AboutCard 
          title="Capuccino" 
          description="Es una bebida nacida en Italia, preparada con café expreso y leche montada con vapor para darle cremosidad."
          image="/images/primer-plano-de-cafe-capuchino-con-latte-de-arte-en-la-mesa-de-madera.jpg"
          number="01"
        />
        <AboutCard 
          title="Mocacino" 
          description="Es una variante del café con leche. Lleva expreso, leche vaporizada y chocolate en jarabe o polvo."
          image="/images/manos-bronceadas-femeninas-sostiene-un-vaso-de-cafe-con-leche-de-coco.jpg"
          number="02"
        />
        <AboutCard 
          title="Espresso" 
          description="Es un tipo de café negro fuerte que se forma cuando el agua caliente pasa a mucha presión a través del café molido."
          image="/images/nathan-dumlao-So7cyDtlmls-unsplash.jpg"
          number="03"
        />
      </div>
    </div>
  </>
);

export default AboutPage;

