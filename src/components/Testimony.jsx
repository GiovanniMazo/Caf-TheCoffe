import React, { useState } from 'react';

const Testimony = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const testimonies = [
    {
      id: 1,
      title: "Inicia con un buen sabor tu mañana",
      subtitle: "Hacienda la Monsalve",
      description: "Café echo tradicionalmente con los mejores granos de Colombia. Una experiencia única en cada taza.",
      image: "/images/CafeColombia.jpg"
    },
    {
      id: 2,
      title: "El aroma que define tu día",
      subtitle: "Café Especial",
      description: "Desde las montañas de Antioquia, trae la tradición del café colombiano premium.",
      image: "/images/tabitha-turner-3n3mPoGko8g-unsplash.jpg"
    },
    {
      id: 3,
      title: "Sabor intenso y auténtico",
      subtitle: "Espresso Italiano",
      description: "La receta tradicional italiana para los amantes del café intenso y aromático.",
      image: "/images/CafeItaliano.jpg"
    }
  ];

  const nextTestimony = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonies.length);
  };

  const prevTestimony = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonies.length) % testimonies.length);
  };

  const current = testimonies[currentIndex];

  return (
    <section className="testimony">
      <div className="testimony__container">
        <button 
          className="testimony__arrow testimony__arrow--left" 
          onClick={prevTestimony}
          aria-label="Anterior"
        >
          ❮
        </button>

        <div className="testimony__content">
          <div className="testimony__image-wrapper">
            <img 
              src={current.image} 
              alt={current.title} 
              className="testimony__image"
            />
          </div>
          <div className="testimony__text-wrapper">
            <p className="testimony__label">Testimonio</p>
            <h2 className="testimony__title">
              {current.title}
            </h2>
            <p className="testimony__subtitle">{current.subtitle}</p>
            <p className="testimony__description">{current.description}</p>
            <div className="testimony__dots">
              {testimonies.map((_, index) => (
                <span 
                  key={index} 
                  className={`testimony__dot ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>

        <button 
          className="testimony__arrow testimony__arrow--right" 
          onClick={nextTestimony}
          aria-label="Siguiente"
        >
          ❯
        </button>
      </div>
    </section>
  );
};

export default Testimony;

