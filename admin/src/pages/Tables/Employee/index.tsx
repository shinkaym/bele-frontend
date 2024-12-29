import employeeApi from '@/apis/modules/employee.api'
import Breadcrumb from '@/components/common/Breadcrumbs/Breadcrumb'
import Button from '@/components/common/Button'
import Search from '@/components/common/Forms/Search'
import Loader from '@/components/common/Loader'
import Pagination from '@/components/common/Pagination'
import SelectFilter from '@/components/common/SelectFilter'
import SelectSort from '@/components/common/SelectSort'
import SelectStatusFilter from '@/components/common/SelectStatusFilter'
import EmployeeTable from '@/components/common/Tables/EmployeeTable'
import { employeeFieldOptions, employeeStatus, sortByOptions, sortOrderOptions } from '@/constants'
import { EFieldByValue, ESortOrderValue } from '@/models/enums/option'
import { EEmployeeStatus } from '@/models/enums/status'
import { IEmployee, IEmployeeListResponse } from '@/models/interfaces/employee'
import { IPagination } from '@/models/interfaces/pagination'
import { debounce } from 'lodash'
import { useEffect, useState } from 'react'

type Props = {}

const index = ({}: Props) => {
  const [employees, setEmployees] = useState<IEmployee[]>([])
  const [pagination, setPagination] = useState<IPagination>({
    currentPage: 1,
    totalPages: 0,
    totalRecords: 0
  })
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedField, setSelectedField] = useState<EFieldByValue>(EFieldByValue.ID)
  const [selectedStatus, setSelectedStatus] = useState<EEmployeeStatus | null>(null)
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

      // const data: IEmployeeListResponse = await orderApi.getAll(params)
      const data: IEmployeeListResponse = employeeApi.list()
      setEmployees(data.data.employees)
      setPagination(data.data.pagination)
    } catch (error) {
      console.error('Error fetching employees:', error)
    } finally {
      setLoading(false)
    }
  }

  const debouncedSearch = debounce((query: string) => {
    setSearchQuery(query)
  }, 500)

  useEffect(() => {
    console.log('fetching employees...')
    fetchData(pagination.currentPage, 5)
  }, [searchQuery, selectedField, selectedStatus, sortBy, sortOrder, pagination.currentPage])

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, currentPage: page }))
  }

  return (
    <>
      <Breadcrumb pageName='Employee' />
      <div className='flex flex-col gap-10'>
        <div className='rounded-sm border bg-white px-5 pt-6 pb-2.5 shadow-default dark:bg-boxdark'>
          <div className='flex items-center justify-between gap-5 mb-6'>
            <Search onSearch={debouncedSearch} />
            <div className='flex items-center justify-between gap-5'>
              <SelectFilter
                label='Field'
                value={selectedField}
                options={employeeFieldOptions}
                onChange={(value) => setSelectedField(value as EFieldByValue)}
              />
              <SelectStatusFilter
                label='Status'
                value={selectedStatus}
                options={employeeStatus}
                onChange={(value) => setSelectedStatus(value as EEmployeeStatus | null)}
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
            <Button type='link' to='/tables/employee/add' size='sm'>
              Add
            </Button>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <EmployeeTable employees={employees} onRefresh={() => fetchData(pagination.currentPage, 5)} />
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

export default index
