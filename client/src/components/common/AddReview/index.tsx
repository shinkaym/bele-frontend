import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { IRateDetail } from '@/models/interfaces';

interface IProps {
  handleAddReview:any,
  reviews: IRateDetail[];
  productId: number,
  
}

const AddReview: React.FC <IProps>= ({handleAddReview,reviews,productId}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const rate:IRateDetail = {
      fullName:"Trinh dinh hoang",
      star:rating,
      content:comment,
      createdAt:"20/2/2005"
    }
    handleAddReview([rate,...reviews])
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <div className="flex items-center space-x-4">
        {/* <label className="text-sm font-medium">Rating</label> */}
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <FontAwesomeIcon
              key={star}
              type="button"
              onClick={() => setRating(star)}
              icon={star <= rating ?faStar:faStarRegular}
              className={`text-lg cursor-pointer	 ${
                star <= rating ? 'text-yellow-400' : 'text-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
      <div className='flex mt-4'>
        <textarea
          placeholder="Type Comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className=" flex-1 m-1 border border-gray-300 rounded-md p-2"
        />
       <div>
       <button
          type="submit"
          className="ml-10 mr-1 h-auto bg-black text-white px-10 py-2 rounded-xl hover:bg-gray-800"
        >
          Send
        </button>
       </div>
      </div>
      
    </form>
  );
};

export default AddReview;
