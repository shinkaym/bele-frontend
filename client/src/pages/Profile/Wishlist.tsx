import productApi from '@/apis/modules/product.api'
import Pagination from '@/components/common/Pagination'
import ProductGrid from '@/components/common/ProductGrid'
import { PAGINATION_CONFIG } from '@/constants'
import { EToastOption } from '@/models/enum'
import { IApiResponse, IPagination, IProduct } from '@/models/interfaces'
import { UToast } from '@/utils/swal'
import { useEffect, useState } from 'react'

const Wishlist = () => {
  const [products, setProducts] = useState<IProduct[]>([])
  const [pagination, setPagination] = useState<IPagination>({
    currentPage: PAGINATION_CONFIG.DEFAULT_PAGE,
    totalPage: 0
  })
  const [loading, setLoading] = useState(false)

  const fetchApi = async (page: number, limit: number) => {
    setLoading(true)
    try {
      const res: IApiResponse<{ products: IProduct[]; pagination: IPagination }> = await productApi.wishlist({
        page,
        limit
      })
      if (res.data && res.status === 200) {
        setProducts(res.data.products)
        setPagination(res.data.pagination)
      }
    } catch {
      UToast(EToastOption.ERROR, 'Đã có lỗi xảy ra')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchApi(pagination.currentPage, PAGINATION_CONFIG.DEFAULT_WISHLIST_LIMIT)
  }, [pagination.currentPage])

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: page
    }))
  }

  const handleRemoveFromWishlist = () => {
    fetchApi(pagination.currentPage, PAGINATION_CONFIG.DEFAULT_WISHLIST_LIMIT)
  }

  return (
    <>
      {loading && <p>Đang tải dữ liệu...</p>}
      <div className={`grid grid-cols-2 md:grid-cols-3 gap-2 mb-5`}>
        {products.map((p) => (
          <ProductGrid key={p.id} product={p} isShowTym handleClickTym={handleRemoveFromWishlist} />
        ))}
      </div>
      <Pagination
        currentPage={pagination.currentPage}
        totalPage={pagination.totalPage}
        onPageChange={handlePageChange}
      />
    </>
  )
}

export default Wishlist
