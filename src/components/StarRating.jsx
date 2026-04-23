import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import '../styles/components/StarRating.css';

const StarRating = ({ rating, reviewCount }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={`full-${i}`} className="star-icon star-icon--full" />);
  }

  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt key="half" className="star-icon star-icon--half" />);
  }

  const emptyStars = 5 - stars.length;
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<FaRegStar key={`empty-${i}`} className="star-icon star-icon--empty" />);
  }

  return (
    <div className="star-rating">
      <div className="star-rating__stars">{stars}</div>
      {reviewCount !== undefined && (
        <span className="star-rating__count">({reviewCount})</span>
      )}
    </div>
  );
};

export default StarRating;

