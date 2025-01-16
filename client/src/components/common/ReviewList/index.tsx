import React from 'react';
import ReviewCard from '../ReviewCard';
import { IRateDetail } from '@/models/interfaces';

interface ReviewListProps {
  reviews: IRateDetail[];
}

const ReviewList: React.FC<ReviewListProps> = ({reviews}) => {
  return (
    <div className="grid grid-cols-2">
      {reviews.map((review, index) => (
        <ReviewCard key={index} {...review} />
      ))}
    </div>
  );
};

export default ReviewList;
