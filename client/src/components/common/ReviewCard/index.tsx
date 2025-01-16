import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { IRateDetail } from '@/models/interfaces';

// interface I {
//   name: string;
//   product: string;
//   date: string;
//   rating: number;
//   comment: string;
//   response?: string;
// }

const ReviewCard: React.FC<IRateDetail> = ({ fullName,star,content,createdAt }) => {
  const getStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;

    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <FontAwesomeIcon key={`full-${i}`} icon={faStar} className="text-black text-lg" />
        ))}
        {[...Array(emptyStars)].map((_, i) => (
          <FontAwesomeIcon key={`empty-${i}`} icon={faStarRegular} className="text-gray-300 text-lg" />
        ))}
      </>
    );
  };

  return (
    <div className="mx-2 border-b border-gray-300 py-4">
      <div className="my-2">
        <div className="flex mb-2 space-x-1">{getStars(star)}</div>
        <div className="font-semibold text-black font-medium">{fullName}</div>
      </div>
      {/* <p className="text-gray-500 text-sm">{product}</p> */}
      {/* <p className="text-black mt-2">{comment}</p> */}
      {content && (
        <div className="bg-gray-200 text-black p-3 rounded-xl mt-2">
          {content}
        </div>
      )}
      <p className="text-gray-400 text-sm mt-2">{createdAt}</p>
    </div>
  );
};

export default ReviewCard;
