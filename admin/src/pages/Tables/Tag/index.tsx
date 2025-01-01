import tagApi from '@/apis/modules/tag.api'
import Breadcrumb from '@/components/common/Breadcrumbs/Breadcrumb'
import Button from '@/components/common/Button'
import Search from '@/components/common/Forms/Search'
import Loader from '@/components/common/Loader'
import Pagination from '@/components/common/Pagination'
import TagTable from '@/components/common/Tables/TagTable'
import { IPagination } from '@/models/interfaces/pagination'
import { ITag, ITagListResponse } from '@/models/interfaces/tag'
import { debounce } from 'lodash'
import { useEffect, useState } from 'react'


type Props = {}

const index = ({}: Props) => {
  const [tags, setTags] = useState<ITag[]>([])
  const [pagination, setPagination] = useState<IPagination>({
    currentPage: 1,
    totalPages: 0,
    totalRecords: 0
  })
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState<string>('')

  const fetchData = async (page: number, limit: number) => {
    setLoading(true)
    try {
      const params = {
        page,
        limit,
        query: searchQuery,
      }

      // const data: ITagListResponse = await orderApi.getAll(params)
      const data: ITagListResponse = tagApi.list()
      setTags(data.data.tags)
      setPagination(data.data.pagination)
    } catch (error) {
      console.error('Error fetching tags:', error)
    } finally {
      setLoading(false)
    }
  }

  const debouncedSearch = debounce((query: string) => {
    setSearchQuery(query)
  }, 500)

  useEffect(() => {
    console.log('fetching tags...')
    fetchData(pagination.currentPage, 5)
  }, [searchQuery, pagination.currentPage])

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, currentPage: page }))
  }

  return (
    <>
      <Breadcrumb pageName='Tag' />
      <div className='flex flex-col gap-10'>
        <div className='rounded-sm border bg-white px-5 pt-6 pb-2.5 shadow-default dark:bg-boxdark'>
          <div className='flex items-center justify-between gap-5 mb-6'>
            <Search onSearch={debouncedSearch} />
            <div className='flex items-center justify-between gap-5'>
            </div>
            <Button type='link' to='/tables/tag/add' size='sm'>
              Add
            </Button>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <TagTable tags={tags} onRefresh={() => fetchData(pagination.currentPage, 5)} />
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
