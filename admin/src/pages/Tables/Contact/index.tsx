import { useEffect, useState, useCallback } from 'react'
import contactApi from '@/apis/modules/contact.api'
import Breadcrumb from '@/components/common/Breadcrumbs/Breadcrumb'
import Search from '@/components/common/Forms/Search'
import Loader from '@/components/common/Loader'
import Pagination from '@/components/common/Pagination'
import SelectFilter from '@/components/common/SelectFilter'
import SelectSort from '@/components/common/SelectSort'
import SelectStatusFilter from '@/components/common/SelectStatusFilter'
import ContactTable from '@/components/common/Tables/ContactTable'
import { contactFieldOptions, contactStatus, PAGINATION_CONFIG, sortOrderOptions, contactSortByOptions } from '@/constants'
import { EFieldByValue, ESortOrderValue } from '@/models/enums/option'
import { EContactStatus } from '@/models/enums/status'
import { IContact, IContactListResponse } from '@/models/interfaces/contact'
import { IPagination } from '@/models/interfaces/pagination'
import { UToast } from '@/utils/swal'
import { EToastOption } from '@/models/enums/option'

const ContactPage: React.FC = () => {
  const [contacts, setContacts] = useState<IContact[]>([])
  const [pagination, setPagination] = useState<IPagination>({
    currentPage: PAGINATION_CONFIG.DEFAULT_PAGE,
    totalPage: 0
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedField, setSelectedField] = useState<EFieldByValue>(EFieldByValue.ID)
  const [selectedStatus, setSelectedStatus] = useState<EContactStatus | null>(null)
  const [sortBy, setSortBy] = useState<EFieldByValue>(EFieldByValue.CREATED_AT)
  const [sortOrder, setSortOrder] = useState<ESortOrderValue>(ESortOrderValue.ASC)

  const fetchData = useCallback(
    async (page: number, limit: number) => {
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
        const res = await contactApi.list(params)
        if (res && res.contacts && res.pagination) {
          const { contacts, pagination } = res

          if (Array.isArray(contacts) && pagination) {
            setContacts(contacts)
            setPagination(pagination)
          } else {
            throw new Error('Invalid data structure in API response.')
          }
        } else {
          throw new Error('Unexpected response structure.')
        }
      } catch (error: any) {
        const errorMessage = error.message || 'Failed to fetch data.'
        UToast(EToastOption.ERROR, errorMessage)
      } finally {
        setLoading(false)
      }
    },
    [searchQuery, selectedField, selectedStatus, sortBy, sortOrder]
  )

  const handleSearchSubmit = () => {
    setPagination((prev) => ({ ...prev, currentPage: PAGINATION_CONFIG.DEFAULT_PAGE }))
    fetchData(PAGINATION_CONFIG.DEFAULT_PAGE, PAGINATION_CONFIG.DEFAULT_LIMIT)
  }

  const handlePageChange = useCallback(
    (page: number) => {
      setPagination((prev) => ({ ...prev, currentPage: page }))
      fetchData(page, PAGINATION_CONFIG.DEFAULT_LIMIT)
    },
    [fetchData]
  )

  useEffect(() => {
    fetchData(pagination.currentPage, PAGINATION_CONFIG.DEFAULT_LIMIT)
  }, [fetchData, pagination.currentPage])

  return (
    <>
      <Breadcrumb pageName='Contact' />
      <div className='flex flex-col gap-10'>
        <div className='rounded-sm border bg-white px-5 pt-6 pb-2.5 shadow-default dark:bg-boxdark'>
          <div className='flex items-center justify-between gap-5 mb-6'>
            <Search onSearch={setSearchQuery} onSubmit={handleSearchSubmit} />
            <div className='flex items-center justify-between gap-5'>
              <SelectFilter
                label='Field'
                value={selectedField}
                options={contactFieldOptions}
                onChange={(value) => setSelectedField(value as EFieldByValue)}
              />
              <SelectStatusFilter
                label='Status'
                value={selectedStatus}
                options={contactStatus}
                onChange={(value) => setSelectedStatus(value as EContactStatus | null)}
              />
              <SelectSort
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSortChange={(by, order) => {
                  setSortBy(by)
                  setSortOrder(order)
                }}
                sortByOptions={contactSortByOptions}
                sortOrderOptions={sortOrderOptions}
              />
            </div>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <ContactTable
              contacts={contacts}
              onRefresh={() => fetchData(pagination.currentPage, PAGINATION_CONFIG.DEFAULT_LIMIT)}
            />
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

export default ContactPage
