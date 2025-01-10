/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { useState } from 'react'
import ButtonCustom from './ButtonCustom'
import variantBlackThumbnail from '@/assets/images/product/shirt_black.webp'
import Pagination from './Pagination'
import { IPagination } from '@/models/interfaces'
import NotRatedProducts from './NotRatedProducts'
import RatedProducts from './RatedProducts'

interface Product {
  id: number
  name: string
  image: string
  rating?: number
  review?: string
  date?: string
  sellerResponse?: string
  sellerName?: string
  sellerImage?: string
}

const RatingProducts = () => {
  const [pagination, setPagination] = useState<IPagination>({
    currentPage: PAGINATION_CONFIG.DEFAULT_PAGE,
    totalPage: 5,
    totalRecords: 50
  })

  const [activeTab, setActiveTab] = useState<'notRated' | 'rated'>('notRated')

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, currentPage: page }))
  }
  
  const notRatedProducts: Product[] = [
    { id: 1, name: "Men's Manddddddddddddddddddddd", image: variantBlackThumbnail },
    { id: 2, name: "Men's Manddddddddddddddddddddd", image: variantBlackThumbnail },
    { id: 3, name: "Men's Manddddddddddddddddddddd", image: variantBlackThumbnail }
  ]

  const ratedProducts: Product[] = [
    {
      id: 4,
      name: "Men's Rated Product 1",
      image: variantBlackThumbnail,
      rating: 4,
      review: 'Great product, very comfortable!',
      date: '2023-10-01',
      sellerResponse: "Thank you for your feedback! We're glad you liked it.",
      sellerName: 'Fashion Store',
      sellerImage: 'https://via.placeholder.com/50'
    },
    {
      id: 5,
      name: "Men's Rated Product 2",
      image: variantBlackThumbnail,
      rating: 5,
      review: 'Excellent quality, highly recommended!',
      date: '2023-10-05',
      sellerResponse: 'We appreciate your support!',
      sellerName: 'Fashion Store',
      sellerImage: 'https://via.placeholder.com/50'
    }
  ]

  // const productsToShow = activeTab === 'notRated' ? notRatedProducts : ratedProducts

  return (
    <div className='md:w-2/3 lg:w-full md:mx-auto lg:mx-0'>
      <h3 className='font-medium text-3xl tracking-wider mb-3 lg:mb-5'>Đánh giá và phản hồi</h3>
      <div className='flex gap-4 mb-5'>
        <ButtonCustom inverted={activeTab === 'notRated'} onClick={() => setActiveTab('notRated')}>
          Not rated
        </ButtonCustom>
        <ButtonCustom inverted={activeTab !== 'notRated'} onClick={() => setActiveTab('rated')}>Rated</ButtonCustom>
      </div>
      {activeTab === 'notRated' ? <NotRatedProducts /> : <RatedProducts />}
      <Pagination
        currentPage={pagination.currentPage}
        totalPage={pagination.totalPage}
        onPageChange={handlePageChange}
      />
    </div>
  )
}

export default RatingProducts
