import { useEffect, useState } from 'react'
import ButtonCustom from '@/components/common/ButtonCustom'
import Pagination from '@/components/common/Pagination'
import ProductGrid from '@/components/common/ProductGrid'
import { PAGINATION_CONFIG } from '@/constants'
import { EToastOption } from '@/models/enum'
import { IApiResponse, IPagination, IProduct, IProductReview } from '@/models/interfaces'
import { UToast } from '@/utils/swal'
import ProductReview from '@/components/common/ProductReview'
import productApi from '@/apis/modules/product.api'

const RateProduct = () => {
  const [unratedProducts, setUnratedProducts] = useState<IProduct[]>([])
  const [ratedProducts, setRatedProducts] = useState<IProductReview[]>([])
  const [pagination, setPagination] = useState<IPagination>({
    currentPage: PAGINATION_CONFIG.DEFAULT_PAGE,
    totalPage: 0
  })
  const [showRated, setShowRated] = useState(false)
  const [loading, setLoading] = useState(false)

  const fetchUnratedProducts = async (page: number, limit: number) => {
    setLoading(true)
    try {
      const res: IApiResponse<{ items: IProduct[]; pagination: IPagination }> = await productApi.unrated({
        page,
        limit
      })
      if (res.data && res.status === 200) {
        setUnratedProducts(res.data.items)
        setPagination(res.data.pagination)
      }
    } catch {
      UToast(EToastOption.ERROR, 'Đã có lỗi xảy ra')
      setUnratedProducts([])
    } finally {
      setLoading(false)
    }
  }

  const fetchRatedProducts = async (page: number, limit: number) => {
    setLoading(true)
    try {
      const res: IApiResponse<{ items: IProductReview[]; pagination: IPagination }> = await productApi.rated({
        page,
        limit
      })
      if (res.data && res.status === 200) {
        setRatedProducts(res.data.items)
        setPagination(res.data.pagination)
      }
    } catch {
      UToast(EToastOption.ERROR, 'Đã có lỗi xảy ra')
      setRatedProducts([])
    } finally {
      setLoading(false)
    }
  }

  const handleTabChange = (isRated: boolean) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: PAGINATION_CONFIG.DEFAULT_PAGE
    }))
    setShowRated(isRated)
  }

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: page
    }))
  }

  useEffect(() => {
    if (showRated) {
      fetchRatedProducts(pagination.currentPage, PAGINATION_CONFIG.DEFAULT_RATED_LIMIT)
    } else {
      fetchUnratedProducts(pagination.currentPage, PAGINATION_CONFIG.DEFAULT_UNRATED_LIMIT)
    }
  }, [pagination.currentPage, showRated])

  return (
    <div>
      <h3 className='font-medium text-3xl tracking-wider mb-3 lg:mb-5'>Đánh giá sản phẩm</h3>
      {loading && <p>Đang tải dữ liệu...</p>}
      <div className='grid grid-cols-2 max-w-[500px] gap-3 mb-3 md:mb-5'>
        <ButtonCustom inverted={!showRated} onClick={() => handleTabChange(false)}>
          Chưa đánh giá
        </ButtonCustom>
        <ButtonCustom inverted={showRated} onClick={() => handleTabChange(true)}>
          Đã đánh giá
        </ButtonCustom>
      </div>

      <div className={`grid grid-cols-2 md:grid-cols-3 gap-2 mb-5`}>
        {showRated ? (
          <div className='grid grid-cols-1 gap-20 mt-10'>
            {ratedProducts.map((review) => (
              <ProductReview key={review.id} review={review} />
            ))}
          </div>
        ) : (
          unratedProducts.map((p) => <ProductGrid key={p.id} product={p} unrated />)
        )}
      </div>

      {(ratedProducts.length > 0 || unratedProducts.length > 0) && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPage={pagination.totalPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  )
}

export default RateProduct
