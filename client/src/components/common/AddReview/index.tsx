import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { IApiResponse, IRateDetail } from '@/models/interfaces';
import { z } from 'zod';
import { UToast } from '@/utils/swal';
import { EToastOption } from '@/models/enum';
import rateApi from '@/apis/modules/rate.api';
import { useSearchParams } from 'react-router-dom';

interface IProps {
  handleAddReview:any,
  reviews: IRateDetail[];
  productId: number,
  
}

const AddReview: React.FC <IProps>= ({handleAddReview,reviews,productId}) => {
  const [searchParams] = useSearchParams();
  const orderIdParam = searchParams.get('orderId');
 
  const orderId: number | null = orderIdParam ? parseInt(orderIdParam) : null;

  const schema = z.object({
    orderId: z.number(),
    productId:z.number(),
    star: z.number().min(1).max(5),
    content: z.string(),
  });
  const [rating, setRating] = useState<number>(1);
  const [comment, setComment] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
     const data = schema.parse({
        star:rating,
        content:comment,
        productId:productId,
        orderId:orderId
      });
      console.log(data);
    const res: IApiResponse<{ rate: IRateDetail }> = await rateApi.addRate(data)

    if(res.status === 201){
      const rate:IRateDetail = res.data?.rate!;
      handleAddReview([rate,...reviews])
      setComment('');
      setRating(1);
      UToast(EToastOption.SUCCESS,"Đánh giá thành công.");
    }
    }catch(error){
      setComment('');
      setRating(1);
      UToast(EToastOption.ERROR,"Đánh giá thất bại.");
    }
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
