import discountApi from '@/apis/modules/discount.api'
import Breadcrumb from '@/components/common/Breadcrumbs/Breadcrumb'
import Button from '@/components/common/Button'
import Search from '@/components/common/Forms/Search'
import Loader from '@/components/common/Loader'
import Pagination from '@/components/common/Pagination'
import SelectFilter from '@/components/common/SelectFilter'
import SelectSort from '@/components/common/SelectSort'
import SelectStatusFilter from '@/components/common/SelectStatusFilter'
import DiscountTable from '@/components/common/Tables/DiscountTable'
import { discountFieldOptions, discountSortByOptions, discountStatus, sortOrderOptions } from '@/constants'
import { EFieldByValue, ESortOrderValue, EToastOption } from '@/models/enums/option'
import { EDiscountStatus } from '@/models/enums/status'
import { IApiResponse } from '@/models/interfaces/api'
import { IDiscount, IDiscountListResponse } from '@/models/interfaces/discount'
import { IPagination } from '@/models/interfaces/pagination'
import { UToast } from '@/utils/swal'
import { useEffect, useState } from 'react'

type Props = {}

const DiscountPage = ({}: Props) => {
  const [discounts, setDiscounts] = useState<IDiscount[]>([])
  const [pagination, setPagination] = useState<IPagination>({
    currentPage: 1,
    totalPage: 0,
    
  })
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedField, setSelectedField] = useState<EFieldByValue>(EFieldByValue.NAME)
  const [selectedStatus, setSelectedStatus] = useState<EDiscountStatus | null>(null)
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

      const res: IApiResponse<IDiscountListResponse> = await discountApi.list(params)
      if (res.status === 200) {
        if (res.data) {
          setDiscounts(res.data.discounts)
          setPagination(res.data.pagination)
        }
      } else {
        UToast(EToastOption.ERROR, res.message)
      }
    } catch (error) {
      UToast(EToastOption.ERROR, 'An unexpected error occurred.')
    } finally {
      setLoading(false)
    }
  }

  const search = (query: string) => {
    setSearchQuery(query)
    fetchData(pagination.currentPage, 5)
  }

  useEffect(() => {
    fetchData(pagination.currentPage, 5)
  }, [pagination.currentPage])

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, currentPage: page }))
  }

  return (
    <>
      <Breadcrumb pageName='Discount' />
      <div className='flex flex-col gap-10'>
        <div className='rounded-sm border bg-white px-5 pt-6 pb-2.5 shadow-default dark:bg-boxdark'>
          <div className='flex items-center justify-between gap-5 mb-6'>
            <Search onSearch={search} />
            <div className='flex items-center justify-between gap-5'>
              <SelectFilter
                label='Field'
                value={selectedField}
                options={discountFieldOptions}
                onChange={(value) => setSelectedField(value as EFieldByValue)}
              />
              <SelectStatusFilter
                label='Status'
                value={selectedStatus}
                options={discountStatus}
                onChange={(value) => setSelectedStatus(value as EDiscountStatus | null)}
              />
              <SelectSort
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSortChange={(by, order) => {
                  setSortBy(by)
                  setSortOrder(order)
                }}
                sortByOptions={discountSortByOptions}
                sortOrderOptions={sortOrderOptions}
              />
            </div>
            <Button type='link' to='/tables/discount/add' size='sm'>
              Add
            </Button>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <DiscountTable discounts={discounts} onRefresh={() => fetchData(pagination.currentPage, 5)} />
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

export default DiscountPage
