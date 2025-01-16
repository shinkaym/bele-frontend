import React from 'react'

interface ProductReviewProps {
  review: IProductReview
}

const ProductReview: React.FC<ProductReviewProps> = ({ review }) => {
  const { id, star, content, createdAt, pId, pName, pImage } = review

  const stars = Array.from({ length: star }, (_, index) => (
    <FontAwesomeIcon key={index} icon={faStar} className='w-5 h-5 text-yellow-500 bg-transparent' />
  ))

  return (
    <div className='flex flex-col gap-2 w-[700px]'>
      <p>ohmyghost</p>
      <div className='flex items-center gap-2'>{stars}</div>
      <p className='text-gray-400'>{createdAt}</p>
      <p>{content}</p>
      <div className='flex items-center px-3 py-2 bg-[#f1f1f1]'>
        <img src={pImage} alt={pName} className='w-14' />
        <p>{pName}</p>
      </div>
    </div>
  )
}

export default ProductReview
