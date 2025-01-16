import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface RatingCardProps {
  rating: number; // The average rating, e.g., 4.0
  totalRatings: number; // Total number of ratings, e.g., 2
}

const RatingCard: React.FC<RatingCardProps> = ({ rating, totalRatings }) => {
  const getStars = (rating: number) => {
    const fullStars = Math.floor(rating); // Full stars
    const halfStar = rating % 1 >= 0.5; // Half star if rating has a decimal >= 0.5
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // Remaining empty stars

    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <FontAwesomeIcon key={`full-${i}`} icon={faStar} className="text-yellow-400 text-lg" />
        ))}
        {halfStar && <span className="text-yellow-400 text-lg">★</span>}
        {[...Array(emptyStars)].map((_, i) => (
          <FontAwesomeIcon key={`empty-${i}`} icon={faStarRegular} className="text-yellow-400 text-lg"/>
        ))}
      </>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-200 rounded-lg p-4 shadow-md w-48">
      <p className="text-black-500 text-sm">Rate For Product</p>
      <p className="text-black text-4xl font-bold mt-1">{rating.toFixed(1)}</p>
      <div className="flex space-x-1 mt-2">{getStars(rating)}</div>
      <p className="text-black-400 text-sm mt-2">{totalRatings} rate</p>
    </div>
  );
};

export default RatingCard;
