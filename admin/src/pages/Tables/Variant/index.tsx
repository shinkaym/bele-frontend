import variantApi from '@/apis/modules/variant.api'
import Breadcrumb from '@/components/common/Breadcrumbs/Breadcrumb'
import Button from '@/components/common/Button'
import Loader from '@/components/common/Loader'
import Pagination from '@/components/common/Pagination'
import SelectFilter from '@/components/common/SelectFilter'
import SelectSort from '@/components/common/SelectSort'
import SelectStatusFilter from '@/components/common/SelectStatusFilter'
import VariantTable from '@/components/common/Tables/VariantTable'
import { PAGINATION_CONFIG, sortOrderOptions, variantFieldOptions, variantSortByOptions, variantStatus } from '@/constants'
import { EFieldByValue, ESortOrderValue, EToastOption } from '@/models/enums/option'
import { EVariantStatus } from '@/models/enums/status'
import { IApiResponse } from '@/models/interfaces/api'
import { IPagination } from '@/models/interfaces/pagination'
import { IProduct } from '@/models/interfaces/product'
import { IVariant, IVariantListResponse } from '@/models/interfaces/variant'
import { UToast } from '@/utils/swal'
import { useEffect, useState } from 'react'

const index: React.FC = () => {
  const [variants, setVariants] = useState<IVariant[]>([])
  const [products, setProducts] = useState<IProduct[]>([])
  const [pagination, setPagination] = useState<IPagination>({ currentPage: PAGINATION_CONFIG.DEFAULT_PAGE, totalPage: 0 })
  const [loading, setLoading] = useState(false)
  const [selectedField, setSelectedField] = useState<EFieldByValue>(EFieldByValue.IN_STOCK)
  const [selectedStatus, setSelectedStatus] = useState<EVariantStatus | null>(null)
  const [sortBy, setSortBy] = useState<EFieldByValue>(EFieldByValue.CREATED_AT)
  const [sortOrder, setSortOrder] = useState<ESortOrderValue>(ESortOrderValue.ASC)

  const fetchData = async (page: number, limit: number) => {
    setLoading(true)
    try {
      const params = {
        page,
        limit,
        field: selectedField,
        status: selectedStatus,
        productId: 1,
        sort: sortBy,
        order: sortOrder
      }

      const res: IApiResponse<IVariantListResponse> = await variantApi.list(params)
      if (res.status === 200 && res.data) {
        setVariants(res.data.variants)
        setPagination(res.data.pagination)
      } else {
        UToast(EToastOption.ERROR, res.message)
      }
    } catch (error) {
      UToast(EToastOption.ERROR, 'An unexpected error occurred.')
    } finally {
      setLoading(false)
    }
  }

  // const fetchProducts = async (page: number, limit: number) => {
  //   setLoading(true)
  //   try {
  //     const res: IApiResponse<IProductListResponse> = await productApi.list(
  //       {
  //         page: '',
  //         limit: '',
  //         query: '',
  //         field: 'Name',
  //         status: '',
  //         sort: 'CreatedAt',
  //         order: 'desc'
  //       }
  //     )
  //     if (res.status === 200 && res.data) {
  //       setProducts(res.data.products)
  //     } else {
  //       UToast(EToastOption.ERROR, res.message)
  //     }
  //   } catch (error) {
  //     UToast(EToastOption.ERROR, 'An unexpected error occurred.')
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  const handleSearchSubmit = () => {
    setPagination((prev) => ({ ...prev, currentPage: PAGINATION_CONFIG.DEFAULT_PAGE }))
    fetchData(PAGINATION_CONFIG.DEFAULT_PAGE, PAGINATION_CONFIG.DEFAULT_LIMIT)
  }

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, currentPage: page }))
    fetchData(page, PAGINATION_CONFIG.DEFAULT_LIMIT)
  }

  useEffect(() => {
    fetchData(pagination.currentPage, PAGINATION_CONFIG.DEFAULT_LIMIT)
  }, [])

  return (
    <>
      <Breadcrumb pageName='Variant' />
      <div className='flex flex-col gap-10'>
        <div className='rounded-sm border bg-white px-5 pt-6 pb-2.5 shadow-default dark:bg-boxdark'>
          <div className='flex items-center justify-between gap-5 mb-6'>
            <div className='flex items-center justify-between gap-5'>
              <SelectFilter
                label='Field'
                value={selectedField}
                options={variantFieldOptions}
                onChange={(value) => setSelectedField(value as EFieldByValue)}
              />
              <SelectStatusFilter
                label='Status'
                value={selectedStatus}
                options={variantStatus}
                onChange={(value) => setSelectedStatus(value as EVariantStatus | null)}
              />
              <SelectSort
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSortChange={(by, order) => {
                  setSortBy(by)
                  setSortOrder(order)
                }}
                sortByOptions={variantSortByOptions}
                sortOrderOptions={sortOrderOptions}
              />
            </div>
            <Button type='link' to='/tables/variant/add' size='sm'>
              Add
            </Button>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <VariantTable variants={variants} onRefresh={() => fetchData(pagination.currentPage, PAGINATION_CONFIG.DEFAULT_LIMIT)} />
          )}
          <Pagination
            currentPage={pagination.currentPage}
            totalPage={pagination.totalPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  )
}

export default index
