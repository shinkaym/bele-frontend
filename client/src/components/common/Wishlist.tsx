import { productData } from '@/constants'
import { Product } from './Product'
import Pagination from './Pagination'
import { useState } from 'react'
import { IPagination } from '@/models/interfaces'

const Wishlist = () => {
  const [pagination, setPagination] = useState<IPagination>({
    currentPage: 1,
    totalPages: 5,
    totalRecords: 50
  })

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, currentPage: page }))
  }
  return (
    <div className='md:w-2/3 lg:w-full md:mx-auto lg:mx-0'>
      <h3 className='font-medium text-3xl tracking-wider mb-3 lg:mb-5'>Danh sách yêu thích</h3>
      <div className='grid xl:grid-cols-3 grid-cols-2 gap-4 mb-10'>
        {productData.map((p) => (
          <div key={p.id}>
            <Product product={p} tag={p.tag.length} />
          </div>
        ))}
      </div>
      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  )
}

export default Wishlist
