import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { IProductReview } from '@/models/interfaces' // Import interface từ file models
import { Link } from 'react-router-dom'
import { formatYouTubeLikeTime } from '@/utils'

interface ProductReviewProps {
  review: IProductReview
}

const ProductReview: React.FC<ProductReviewProps> = ({ review }) => {
  const { star, content, createdAt, pName, pImage, slug } = review

  const stars = Array.from({ length: 5 }, (_, index) => (
    <FontAwesomeIcon
      key={index}
      icon={faStar}
      className={`w-5 h-5 ${index < star ? 'text-yellow-500' : 'text-black'} bg-transparent`}
    />
  ));
  return (
    <div className='flex flex-col gap-2 w-full lg:w-[700px]'>
      <p className='font-bold'>ohmyghost</p>
      <div className='flex items-center gap-2'>{stars}</div>
      <p className='text-gray-400'>{formatYouTubeLikeTime(createdAt)}</p>
      <p>{content}</p>
      <Link to={`/product/detail/${slug}`} className='flex items-center gap-3 px-3 py-2 bg-[#f1f1f1]'>
        <img src={pImage} alt={pName} className='w-14' />
        <p className='truncate'>{pName}</p>
      </Link>
    </div>
  )
}

export default ProductReview
