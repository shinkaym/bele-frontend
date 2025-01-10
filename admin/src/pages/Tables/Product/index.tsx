import React, { useState, useEffect } from 'react'
import productApi from '@/apis/modules/product.api'
import Breadcrumb from '@/components/common/Breadcrumbs/Breadcrumb'
import Button from '@/components/common/Button'
import Search from '@/components/common/Forms/Search'
import Loader from '@/components/common/Loader'
import Pagination from '@/components/common/Pagination'
import SelectFilter from '@/components/common/SelectFilter'
import SelectSort from '@/components/common/SelectSort'
import SelectStatusFilter from '@/components/common/SelectStatusFilter'
import ProductTable from '@/components/common/Tables/ProductTable'
import { productFieldOptions, productSortByOptions, productStatus, PAGINATION_CONFIG, sortOrderOptions } from '@/constants'
import { EFieldByValue, ESortOrderValue, EToastOption } from '@/models/enums/option'
import { EProductStatus } from '@/models/enums/status'
import { IProduct, IProductListResponse } from '@/models/interfaces/product'
import { IPagination } from '@/models/interfaces/pagination'
import { IApiResponse } from '@/models/interfaces/api'
import { UToast } from '@/utils/swal'

const index: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([])
  const [pagination, setPagination] = useState<IPagination>({ currentPage: PAGINATION_CONFIG.DEFAULT_PAGE, totalPage: 0 })
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedField, setSelectedField] = useState<EFieldByValue>(EFieldByValue.NAME)
  const [selectedStatus, setSelectedStatus] = useState<EProductStatus | null>(null)
  const [sortBy, setSortBy] = useState<EFieldByValue>(EFieldByValue.CREATED_AT)
  const [sortOrder, setSortOrder] = useState<ESortOrderValue>(ESortOrderValue.ASC)

  const fetchData = async (page: number, limit: number) => {
    setLoading(true)
    try {
      const params = {
        page,
        limit,
        query: searchQuery,
        field: selectedField,
        status: selectedStatus,
        sort: sortBy,
        order: sortOrder
      }

      const res: IApiResponse<IProductListResponse> = await productApi.list(params)
      if (res.status === 200 && res.data) {
        setProducts(res.data.products)
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
      <Breadcrumb pageName='Product' />
      <div className='flex flex-col gap-10'>
        <div className='rounded-sm border bg-white px-5 pt-6 pb-2.5 shadow-default dark:bg-boxdark'>
          <div className='flex items-center justify-between gap-5 mb-6'>
            <Search onSearch={setSearchQuery} onSubmit={handleSearchSubmit} />
            <div className='flex items-center justify-between gap-5'>
              <SelectFilter
                label='Field'
                value={selectedField}
                options={productFieldOptions}
                onChange={(value) => setSelectedField(value as EFieldByValue)}
              />
              <SelectStatusFilter
                label='Status'
                value={selectedStatus}
                options={productStatus}
                onChange={(value) => setSelectedStatus(value as EProductStatus | null)}
              />
              <SelectSort
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSortChange={(by, order) => {
                  setSortBy(by)
                  setSortOrder(order)
                }}
                sortByOptions={productSortByOptions}
                sortOrderOptions={sortOrderOptions}
              />
            </div>
            <Button type='link' to='/tables/product/add' size='sm'>
              Add
            </Button>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <ProductTable products={products} onRefresh={() => fetchData(pagination.currentPage, PAGINATION_CONFIG.DEFAULT_LIMIT)} />
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
