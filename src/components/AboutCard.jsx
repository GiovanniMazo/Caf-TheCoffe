import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

const AboutCard = ({ title, description, image, number }) => {
  return (
    <article className="coffee-type-card">
      <div className="coffee-type-card__image">
        <img src={image} alt={title} />
        <span className="coffee-type-card__number">{number}</span>
      </div>
      <div className="coffee-type-card__content">
        <h3 className="coffee-type-card__title">{title}</h3>
        <p className="coffee-type-card__description">{description}</p>
        <button className="coffee-type-card__btn">
          Descubrir más <FaArrowRight />
        </button>
      </div>
    </article>
  );
};

export default AboutCard;
