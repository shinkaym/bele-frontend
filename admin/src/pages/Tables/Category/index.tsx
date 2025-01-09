import categoryApi from '@/apis/modules/categoy.api'
import Breadcrumb from '@/components/common/Breadcrumbs/Breadcrumb'
import Search from '@/components/common/Forms/Search'
import Loader from '@/components/common/Loader'
import Pagination from '@/components/common/Pagination'
import SelectFilter from '@/components/common/SelectFilter'
import SelectSort from '@/components/common/SelectSort'
import SelectStatusFilter from '@/components/common/SelectStatusFilter'
import CategoryTable from '@/components/common/Tables/CategoryTable'
import { categoryFieldOptions, categoryStatus, sortByOptions, sortOrderOptions } from '@/constants'
import { EFieldByValue, ESortOrderValue, EToastOption } from '@/models/enums/option'
import { ECategoryStatus } from '@/models/enums/status'
import { IApiResponse } from '@/models/interfaces/api'
import { ICategory } from '@/models/interfaces/category'
import { IPagination } from '@/models/interfaces/pagination'
import { UToast } from '@/utils/swal'
import { useEffect, useState } from 'react'

type Props = {}

function Category({}: Props) {
  const [categories, setCategories] = useState<ICategory[]>([])
  const [pagination, setPagination] = useState<IPagination>({
    currentPage: 1,
    totalPages: 0,
    totalRecords: 0
  })
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedField, setSelectedField] = useState<EFieldByValue>(EFieldByValue.ID)
  const [selectedStatus, setSelectedStatus] = useState<ECategoryStatus | null>(null)
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

      const res: IApiResponse<{ categories: ICategory[]; pagination: IPagination }> = await categoryApi.list(params)
      if (res.status === 200) {
        setCategories(res.data.categories)
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

  const search = (query: string) => {
    setSearchQuery(query)
  }

  useEffect(() => {
    fetchData(pagination.currentPage, 5)
  }, [searchQuery, pagination.currentPage])

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, currentPage: page }))
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Breadcrumb pageName='Order' />
          <div className='flex flex-col gap-10'>
            <div className='rounded-sm border bg-white px-5 pt-6 pb-2.5 shadow-default dark:bg-boxdark'>
              <div className='flex items-center justify-start gap-5 mb-6'>
                <Search onSearch={search} />
                <SelectFilter
                  label='Field'
                  value={selectedField}
                  options={categoryFieldOptions}
                  onChange={(value) => setSelectedField(value as EFieldByValue)}
                />
                <SelectStatusFilter
                  label='Status'
                  value={selectedStatus}
                  options={categoryStatus}
                  onChange={(value) => setSelectedStatus(value as ECategoryStatus | null)}
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
              {loading ? (
                <Loader />
              ) : (
                <CategoryTable categories={categories} onRefresh={() => fetchData(pagination.currentPage, 5)} />
              )}
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Category
