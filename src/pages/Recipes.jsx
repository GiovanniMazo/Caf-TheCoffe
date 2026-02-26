import React from 'react';
import './Recipes.css';

const recipes = [
  {
    id: 1,
    title: 'Café Latte Clásico',
    description: 'Una receta suave y cremosa con espresso y leche vaporizada.',
    time: '5 min',
    difficulty: 'Fácil',
    image: '/images/primer-plano-de-cafe-capuchino-con-latte-de-arte-en-la-mesa-de-madera.jpg'
  },
  {
    id: 2,
    title: 'Cold Brew',
    description: 'Café frío de preparación lenta, perfecto para días calurosos.',
    time: '12 horas',
    difficulty: 'Media',
    image: '/images/nathan-dumlao-dvuHNTJxIsg-unsplash.jpg'
  },
  {
    id: 3,
    title: 'Mocha Casero',
    description: 'Deliciosa combinación de chocolate, café y leche.',
    time: '10 min',
    difficulty: 'Fácil',
    image: '/images/manos-bronceadas-femeninas-sostiene-un-vaso-de-cafe-con-leche-de-coco.jpg'
  }
];

const Recipes = () => {
  return (
    <div className="recipes-page">
      <div className="recipes-page__hero">
        <h1>Recetas</h1>
        <p>Aprende a preparar los mejores cafés en casa</p>
      </div>
      <div className="recipes-page__content">
        <div className="recipes-grid">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <div className="recipe-card__image">
                <img src={recipe.image} alt={recipe.title} />
              </div>
              <div className="recipe-card__content">
                <h3 className="recipe-card__title">{recipe.title}</h3>
                <p className="recipe-card__description">{recipe.description}</p>
                <div className="recipe-card__meta">
                  <span className="recipe-card__time">⏱️ {recipe.time}</span>
                  <span className="recipe-card__difficulty">{recipe.difficulty}</span>
                </div>
                <button className="recipe-card__btn">Ver Receta</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recipes;
