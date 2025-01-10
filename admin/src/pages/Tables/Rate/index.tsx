import Breadcrumb from '@/components/common/Breadcrumbs/Breadcrumb'
import Search from '@/components/common/Forms/Search'
import Loader from '@/components/common/Loader'
import { IPagination } from '@/models/interfaces/pagination'
import { useEffect, useState } from 'react'
import { PAGINATION_CONFIG, rateFieldOptions, rateSortByOptions, rateStatus, sortOrderOptions } from '@/constants'
import { EFieldByValue, ESortOrderValue, EToastOption } from '@/models/enums/option'
import Pagination from '@/components/common/Pagination'
import SelectFilter from '@/components/common/SelectFilter'
import SelectSort from '@/components/common/SelectSort'
import { ERateStatus } from '@/models/enums/status'
import SelectStatusFilter from '@/components/common/SelectStatusFilter'
import { IRate, IRateListResponse } from '@/models/interfaces/rate'
import rateApi from '@/apis/modules/rate.api'
import RateTable from '@/components/common/Tables/RateTable'
import { UToast } from '@/utils/swal'
import { IApiResponse } from '@/models/interfaces/api'

const RatePage: React.FC = () => {
  const [rates, setRates] = useState<IRate[]>([])
  const [pagination, setPagination] = useState<IPagination>({ currentPage: PAGINATION_CONFIG.DEFAULT_PAGE, totalPage: 0 })
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedField, setSelectedField] = useState<EFieldByValue>(EFieldByValue.FULLNAME)
  const [selectedStatus, setSelectedStatus] = useState<ERateStatus | null>(null)
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

      const res: IApiResponse<IRateListResponse> = await rateApi.list(params)
      if (res.status === 200 && res.data) {
        setRates(res.data.rates)
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
      <Breadcrumb pageName='Rate' />
      <div className='flex flex-col gap-10'>
        <div className='rounded-sm border bg-white px-5 pt-6 pb-2.5 shadow-default dark:bg-boxdark'>
          <div className='flex items-center justify-start gap-5 mb-6'>
            <Search onSearch={setSearchQuery} onSubmit={handleSearchSubmit} />
            <SelectFilter
              label='Field'
              value={selectedField}
              options={rateFieldOptions}
              onChange={(value) => setSelectedField(value as EFieldByValue)}
            />
            <SelectStatusFilter
              label='Status'
              value={selectedStatus}
              options={rateStatus}
              onChange={(value) => setSelectedStatus(value as ERateStatus | null)}
            />
            <SelectSort
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSortChange={(by, order) => {
                setSortBy(by)
                setSortOrder(order)
              }}
              sortByOptions={rateSortByOptions}
              sortOrderOptions={sortOrderOptions}
            />
          </div>
          {loading ? <Loader /> : <RateTable rates={rates} onRefresh={() => fetchData(pagination.currentPage, PAGINATION_CONFIG.DEFAULT_LIMIT)} />}
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

export default RatePage
