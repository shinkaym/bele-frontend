import searchApi from '@/apis/modules/search.api.'
import Input from '@/components/common/Forms/Input'
import Loader from '@/components/common/Loader'
import Pagination from '@/components/common/Pagination'
import ProductGrid from '@/components/common/ProductGrid'
import { LG_BP, LG_LIMIT, MD_BP, MD_LIMIT, SM_BP, SM_LIMIT, XS_LIMIT } from '@/constants'
import useDebounce from '@/hooks/useDebounce'
import { IApiResponse, IPagination, IProduct } from '@/models/interfaces'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import 'react-slideshow-image/dist/styles.css'

function Search() {
  const [limit, setLimit] = useState<number>(10)
  const [result, setResult] = useState<IProduct[]>([])
  const [pagination, setPagination] = useState<IPagination>({ currentPage: 1, totalPage: 0 })
  const [searchParams] = useSearchParams()
  const [searchValue, setSearchValue] = useState<string>(() => searchParams.get('value') || '')
  const debouncedSearchValue = useDebounce(searchValue, 500)
  const [loading, setLoading] = useState<boolean>(false)

  const fetchData = async (value: string, page: number, limit: number) => {
    setLoading(true)
    try {
      const params = {
        page,
        limit
      }
      const res: IApiResponse<{
        searchedProducts: IProduct[]
        pagination: IPagination
      }> = await searchApi.all(value, params)
      if (res.status === 200 && res.data) {
        setResult(res.data.searchedProducts)
        setPagination(res.data.pagination)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, currentPage: page }))
    fetchData(debouncedSearchValue, page, limit)
  }

  useEffect(() => {
    if (!debouncedSearchValue?.trim()) {
      setResult([])
      return
    }

    fetchData(debouncedSearchValue, pagination.currentPage, limit)
  }, [debouncedSearchValue])

  const updateLimit = () => {
    const width = window.innerWidth
    if (width >= LG_BP) {
      setLimit(LG_LIMIT * 2)
    } else if (width >= MD_BP) {
      setLimit(MD_LIMIT * 2)
    } else if (width >= SM_BP) {
      setLimit(SM_LIMIT * 2)
    } else {
      setLimit(XS_LIMIT * 2)
    }
  }

  useEffect(() => {
    updateLimit()

    // Lắng nghe sự thay đổi kích thước màn hình
    window.addEventListener('resize', updateLimit)

    // Cleanup khi component unmount
    return () => {
      window.removeEventListener('resize', updateLimit)
    }
  }, [])

  return (
    <>
      <div className='lg:px-14 md:px-12 sm:px-10 px-6 mb-5 space-x-4 border-b py-8'>
        <div className='flex items-center gap-8'>
          <h1 className='text-3xl font-bold'>Sản phẩm</h1>
          <Input
            type='search'
            name='searchValue'
            onChange={(e) => setSearchValue(e.target.value.trimStart())}
            value={searchValue}
            placeholder='Tìm kiếm sản phẩm'
            className='py-2 px-4 w-[250px]'
          />
        </div>
      </div>
      <div className='lg:px-14 md:px-12 sm:px-10 px-6 space-y-4 pb-10 mb-5 relative'>
        {!loading ? (
          <>
            <h3 className='font-semibold text-xl mb-5'>
              {result.length > 0 ? 'Kết quả tìm kiếm' : 'Không tìm thấy kết quả tìm kiếm'}
            </h3>

            {result.length > 0 ? (
              <div className='grid grid-cols-5 gap-4'>
                {result.map((p) => (
                  <ProductGrid key={p.id} product={p} />
                ))}
              </div>
            ) : null}
          </>
        ) : (
          <Loader type='inside' />
        )}

        {pagination.totalPage > 1 && (
          <Pagination
            currentPage={pagination.currentPage}
            totalPage={pagination.totalPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </>
  )
}

export default Search
