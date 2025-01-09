import orderApi from '@/apis/modules/order.api'
import Breadcrumb from '@/components/common/Breadcrumbs/Breadcrumb'
import Search from '@/components/common/Forms/Search'
import Loader from '@/components/common/Loader'
import OrderTable from '@/components/common/Tables/OrderTable'
import { IOrder, IOrderListResponse } from '@/models/interfaces/order'
import { IPagination } from '@/models/interfaces/pagination'
import { useEffect, useState } from 'react'
import { orderFieldOptions, orderSortByOptions, orderStatus, sortOrderOptions } from '@/constants'
import { EFieldByValue, ESortOrderValue, EToastOption } from '@/models/enums/option'
import Pagination from '@/components/common/Pagination'
import SelectFilter from '@/components/common/SelectFilter'
import SelectSort from '@/components/common/SelectSort'
import { EOrderStatus } from '@/models/enums/status'
import SelectStatusFilter from '@/components/common/SelectStatusFilter'
import { UToast } from '@/utils/swal'
import { IApiResponse } from '@/models/interfaces/api'

type Props = {}

const index = ({}: Props) => {
  const [orders, setOrders] = useState<IOrder[]>([])
  const [pagination, setPagination] = useState<IPagination>({
    currentPage: 1,
    totalPages: 0,
    totalRecords: 0
  })
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedField, setSelectedField] = useState<EFieldByValue>(EFieldByValue.FULLNAME)
  const [selectedStatus, setSelectedStatus] = useState<EOrderStatus | null>(null)
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
      const res: IApiResponse<IOrderListResponse> = await orderApi.list(params)
      if (res.status === 200) {
        if (res.data) {
          setOrders(res.data.orders)
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
      <Breadcrumb pageName='Order' />
      <div className='flex flex-col gap-10'>
        <div className='rounded-sm border bg-white px-5 pt-6 pb-2.5 shadow-default dark:bg-boxdark'>
          <div className='flex items-center justify-start gap-5 mb-6'>
            <Search onSearch={search} />
            <SelectFilter
              label='Field'
              value={selectedField}
              options={orderFieldOptions}
              onChange={(value) => setSelectedField(value as EFieldByValue)}
            />
            <SelectStatusFilter
              label='Status'
              value={selectedStatus}
              options={orderStatus}
              onChange={(value) => setSelectedStatus(value as EOrderStatus | null)}
            />
            <SelectSort
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSortChange={(by, order) => {
                setSortBy(by)
                setSortOrder(order)
              }}
              sortByOptions={orderSortByOptions}
              sortOrderOptions={sortOrderOptions}
            />
          </div>
          {loading ? <Loader /> : <OrderTable orders={orders} onRefresh={() => fetchData(pagination.currentPage, 5)} />}
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

export default index
