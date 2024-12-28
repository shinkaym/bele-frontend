import orderApi from '@/apis/modules/order.api'
import Breadcrumb from '@/components/common/Breadcrumbs/Breadcrumb'
import Search from '@/components/common/Forms/Search'
import Loader from '@/components/common/Loader'
import OrderTable from '@/components/common/Tables/OrderTable'
import { IOrder, IOrderListResponse } from '@/models/interfaces/order'
import { IPagination } from '@/models/interfaces/pagination'
import { useEffect, useState } from 'react'
import { orderFieldOptions, orderStatus, sortByOptions, sortOrderOptions } from '@/constants'
import { EFieldByValue, ESortOrderValue } from '@/models/enums/option'
import Pagination from '@/components/common/Pagination'
import SelectFilter from '@/components/common/SelectFilter'
import SelectSort from '@/components/common/SelectSort'
import { EOrderStatus } from '@/models/enums/status'
import { debounce } from 'lodash'

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
  const [selectedField, setSelectedField] = useState<EFieldByValue>(EFieldByValue.ID)
  const [selectedStatus, setSelectedStatus] = useState<string>('')
  const [sortBy, setSortBy] = useState<EFieldByValue>(EFieldByValue.CREATED_AT)
  const [sortOrder, setSortOrder] = useState<ESortOrderValue>(ESortOrderValue.ASC)

  const fetchOrders = async (page: number, limit: number) => {
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

      // const data: IOrderListResponse = await orderApi.getAll(params)
      const data: IOrderListResponse = orderApi.list()
      setOrders(data.data.orders)
      setPagination(data.data.pagination)
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const debouncedSearch = debounce((query: string) => {
    setSearchQuery(query)
  }, 500)

  useEffect(() => {
    console.log('fetching orders...')
    fetchOrders(pagination.currentPage, 5)
  }, [searchQuery, selectedField, selectedStatus, sortBy, sortOrder, pagination.currentPage])

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, currentPage: page }))
  }

  return (
    <>
      <Breadcrumb pageName='Order' />
      <div className='flex flex-col gap-10'>
        <div className='rounded-sm border bg-white px-5 pt-6 pb-2.5 shadow-default dark:bg-boxdark'>
          <div className='flex items-center justify-between mb-6'>
            <Search onSearch={debouncedSearch} />
            <SelectFilter
              label='Status'
              value={selectedStatus}
              options={orderStatus}
              onChange={(value) => setSelectedStatus(value as EOrderStatus)}
            />
            <SelectFilter
              label='Field'
              value={selectedField}
              options={orderFieldOptions}
              onChange={(value) => setSelectedField(value as EFieldByValue)}
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
          {loading ? <Loader /> : <OrderTable orders={orders} />}
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
