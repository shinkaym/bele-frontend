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
import { discountFieldOptions, discountStatus, sortByOptions, sortOrderOptions } from '@/constants'
import { EFieldByValue, ESortOrderValue, EToastOption } from '@/models/enums/option'
import { EDiscountStatus } from '@/models/enums/status'
import { IDiscount } from '@/models/interfaces/discount'
import { IPagination } from '@/models/interfaces/pagination'
import { UToast } from '@/utils/swal'
import { debounce } from 'lodash'
import { useEffect, useState } from 'react'

type Props = {}

const DiscountPage = ({}: Props) => {
  const [discounts, setDiscounts] = useState<IDiscount[]>([])
  const [pagination, setPagination] = useState<IPagination>({
    currentPage: 1,
    totalPages: 0,
    totalRecords: 0
  })
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedField, setSelectedField] = useState<EFieldByValue>(EFieldByValue.ID)
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

      // Fetch discount data
      const res = discountApi.getList()
      if (res.status === 200) {
        setDiscounts(res.data.discounts)
        setPagination({
          currentPage: page,
          totalPages: res.data.pagination.totalPages,
          totalRecords: res.data.pagination.totalRecords
        })
        UToast(EToastOption.SUCCESS, res.message)
      } else {
        UToast(EToastOption.ERROR, res.message)
      }
    } catch (error) {
      UToast(EToastOption.ERROR, 'An unexpected error occurred.')
    } finally {
      setLoading(false)
    }
  }

  const debouncedSearch = debounce((query: string) => {
    setSearchQuery(query)
  }, 500)

  useEffect(() => {
    fetchData(pagination.currentPage, 5)
  }, [searchQuery, selectedField, selectedStatus, sortBy, sortOrder, pagination.currentPage])

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, currentPage: page }))
  }

  return (
    <>
      <Breadcrumb pageName='Discount' />
      <div className='flex flex-col gap-10'>
        <div className='rounded-sm border bg-white px-5 pt-6 pb-2.5 shadow-default dark:bg-boxdark'>
          <div className='flex items-center justify-between gap-5 mb-6'>
            <Search onSearch={debouncedSearch} />
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
                sortByOptions={sortByOptions}
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
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  )
}

export default DiscountPage
