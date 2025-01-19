import { useEffect, useState } from 'react'
import ButtonCustom from '@/components/common/ButtonCustom'
import Pagination from '@/components/common/Pagination'
import ProductGrid from '@/components/common/ProductGrid'
import { mockData, PAGINATION_CONFIG, test } from '@/constants'
import { EToastOption } from '@/models/enum'
import { IApiResponse, IPagination, IProduct, IProduct1, IProductReview } from '@/models/interfaces'
import { UToast } from '@/utils/swal'
import ProductReview from '@/components/common/ProductReview'
import productApi from '@/apis/modules/product.api'

const RateProduct = () => {
  const [unratedProducts, setUnratedProducts] = useState<IProduct1[]>([])
  const [ratedProducts, setRatedProducts] = useState<IProductReview[]>([])
  const [showRated, setShowRated] = useState(false)
  const [loading, setLoading] = useState(false)

  const fetchUnratedProducts = async () => {
    setLoading(true)
    try {
      // const res: IApiResponse<{ products: IProduct[]; pagination: IPagination }> = test
      const res: IApiResponse<{ items: IProduct[] }> = await productApi.unrated()
      if (res.data && res.status === 200) {
        // setUnratedProducts(res.data.products)
        setUnratedProducts(res.data.items)
      }
    } catch {
      UToast(EToastOption.ERROR, 'Đã có lỗi xảy ra')
      setUnratedProducts([])
    } finally {
      setLoading(false)
    }
  }

  const fetchRatedProducts = async () => {
    setLoading(true)
    try {
      // const res: IApiResponse<{ items: IProductReview[]; pagination: IPagination }> = mockData
      const res: IApiResponse<{ items: IProductReview[] }> = await productApi.rated()
      console.log('🚀 ~ fetchRatedProducts ~ res:', res)
      if (res.data && res.status === 200) {
        setRatedProducts(res.data.items)
      }
    } catch {
      UToast(EToastOption.ERROR, 'Đã có lỗi xảy ra')
      setRatedProducts([])
    } finally {
      setLoading(false)
    }
  }

  const handleTabChange = (isRated: boolean) => {
    setShowRated(isRated)
  }

  useEffect(() => {
    if (showRated) {
      console.log('🚀 ~ useEffect ~ showRated:', showRated)
      fetchRatedProducts()
    } else {
      fetchUnratedProducts()
    }
  }, [showRated])

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
          unratedProducts.map((p) => (
            <ProductGrid
              key={p.product.id}
              product={{
                ...p.product,
                orderId: p.orderId
              }}
              unrated
            />
          ))
        )}
      </div>
    </div>
  )
}

export default RateProduct
