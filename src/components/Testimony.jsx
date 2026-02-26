import React from 'react';

const Testimony = () => {
  const testimonies = [
    {
      id: 1,
      title: "Conoce nuestros productos",
      course: "Hacienda la------.",
      review: "Cafe echo tradicionalmente.",
      image: "./imagenes/Foto Henry.jpg"
    },
    // Testimonios adicionales sepueden añadidr aquí
  ];

  return (
    <section className="testimony">
      <div className="testimony__container container">
        <img src="./imagenes/leftarrow.svg" className="testimony__arrow" id="before" alt="Previous" />

        {testimonies.map(testimony => (
          <section key={testimony.id} className="testimony__body testimony__body--show" data-id={testimony.id}>
            <div className="testimony__texts">
              <h2 className="subtitle">
                {testimony.title} <span className="testimony__course">{testimony.course}</span>
              </h2>
              <p className="testimony__review">{testimony.review}</p>
            </div>
            <figure className="testimony__picture">
              <img src={testimony.image} alt={testimony.title} />
            </figure>
          </section>
        ))}

        <img src="./imagenes/rightarrow.svg" className="testimony__arrow" id="next" alt="Next" />
      </div>
    </section>
  );
};

export default Testimony;