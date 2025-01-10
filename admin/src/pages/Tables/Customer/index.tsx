import customerApi from '@/apis/modules/customer.api'
import Breadcrumb from '@/components/common/Breadcrumbs/Breadcrumb'
import Search from '@/components/common/Forms/Search'
import Loader from '@/components/common/Loader'
import Pagination from '@/components/common/Pagination'
import SelectFilter from '@/components/common/SelectFilter'
import SelectSort from '@/components/common/SelectSort'
import SelectStatusFilter from '@/components/common/SelectStatusFilter'
import CustomerTable from '@/components/common/Tables/CustomerTable'
import { customerFieldOptions, customerSortByOptions, customerStatus, PAGINATION_CONFIG, sortOrderOptions } from '@/constants'
import { EFieldByValue, ESortOrderValue, EToastOption } from '@/models/enums/option'
import { ECustomerStatus } from '@/models/enums/status'
import { IApiResponse } from '@/models/interfaces/api'
import { ICustomer, ICustomerListResponse } from '@/models/interfaces/customer'
import { IPagination } from '@/models/interfaces/pagination'
import { UToast } from '@/utils/swal'
import { useEffect, useState } from 'react'

const index: React.FC = () => {
  const [customers, setCustomers] = useState<ICustomer[]>([])
  const [pagination, setPagination] = useState<IPagination>({ currentPage: PAGINATION_CONFIG.DEFAULT_PAGE, totalPage: 0 })
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedField, setSelectedField] = useState<EFieldByValue>(EFieldByValue.FULLNAME)
  const [selectedStatus, setSelectedStatus] = useState<ECustomerStatus | null>(null)
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

      const res: IApiResponse<ICustomerListResponse> = await customerApi.list(params)
      if (res.status === 200 && res.data) {
        setCustomers(res.data.accounts)
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
      <Breadcrumb pageName='Customer' />
      <div className='flex flex-col gap-10'>
        <div className='rounded-sm border bg-white px-5 pt-6 pb-2.5 shadow-default dark:bg-boxdark'>
          <div className='flex items-center justify-between gap-5 mb-6'>
            <Search onSearch={setSearchQuery} onSubmit={handleSearchSubmit} />
            <div className='flex items-center justify-between gap-5'>
              <SelectFilter
                label='Field'
                value={selectedField}
                options={customerFieldOptions}
                onChange={(value) => setSelectedField(value as EFieldByValue)}
              />
              <SelectStatusFilter
                label='Status'
                value={selectedStatus}
                options={customerStatus}
                onChange={(value) => setSelectedStatus(value as ECustomerStatus | null)}
              />
              <SelectSort
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSortChange={(by, order) => {
                  setSortBy(by)
                  setSortOrder(order)
                }}
                sortByOptions={customerSortByOptions}
                sortOrderOptions={sortOrderOptions}
              />
            </div>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <CustomerTable customers={customers} onRefresh={() => fetchData(pagination.currentPage, PAGINATION_CONFIG.DEFAULT_LIMIT)} />
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
