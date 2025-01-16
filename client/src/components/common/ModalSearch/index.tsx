import Overlay from '@/components/common/Overlay'
import { MD_BP } from '@/constants'
import useDebounce from '@/hooks/useDebounce'
import executeAOS from '@/utils/executeAOS'
import { faChevronLeft, faClose, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../Button'
import { IApiResponse, IPagination, IProduct } from '@/models/interfaces'
import searchApi from '@/apis/modules/search.api.'
import productApi from '@/apis/modules/product.api'
import ProductGrid from '../ProductGrid'
import ProductGridSkeleton from '../ProductGridSkeleton'
import Loader from '../Loader'

interface ISearchProps {
  onSearchClose: () => void
}

const ModalSearch: React.FunctionComponent<ISearchProps> = ({ onSearchClose }) => {
  const [searchValue, setSearchValue] = useState('')
  const debouncedSearchValue = useDebounce(searchValue, 500)
  const [limit, setLimit] = useState<number>(4)
  const [result, setResult] = useState<IProduct[]>([])
  const [resultInitial, setResultInitial] = useState<IProduct[]>([])

  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()

  const callBackAos = useCallback(() => {
    executeAOS({})
  }, [])

  useEffect(() => {
    callBackAos()
  }, [callBackAos])

  const updateLimit = () => {
    const width = window.innerWidth
    if (width >= MD_BP) {
      setLimit(4)
    } else {
      setLimit(3)
    }
  }

  const resetSearch = () => {
    setSearchValue('') // Reset dữ liệu
    onSearchClose() // Đóng modal
  }

  const navigateToSearchPage = (value?: string) => {
    if (value) {
      if (!value.trim()) {
        alert('Vui lòng nhập từ khóa tìm kiếm.')
        return
      }
      navigate(`/search?value=${encodeURIComponent(value.trim().toLocaleLowerCase())}`)
    }
    resetSearch()
  }

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      navigateToSearchPage(searchValue)
    }
  }

  const handleClickSearch = () => {
    navigateToSearchPage(searchValue)
  }

  const highlightKeywords = ['Tập Gym', 'Yoga', 'Bóng đá', 'Chạy bộ']

  // Trigger search whenever the debounced value changes
  useEffect(() => {
    if (!debouncedSearchValue?.trim()) {
      setResult([])
      return
    }
    const fetchData = async () => {
      setLoading(true)
      try {
        const res: IApiResponse<{
          searchedProducts: IProduct[]
          pagination: IPagination
        }> = await searchApi.all(debouncedSearchValue, { limit })
        if (res.status === 200 && res.data) {
          setResult(res.data.searchedProducts)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [debouncedSearchValue])

  useEffect(() => {
    updateLimit()

    // Lắng nghe sự thay đổi kích thước màn hình
    window.addEventListener('resize', updateLimit)

    // Cleanup khi component unmount
    return () => {
      window.removeEventListener('resize', updateLimit)
    }
  }, [])

  useEffect(() => {
    const fetchDataInitial = async () => {
      setLoading(true)
      try {
        const res: IApiResponse<{
          products: IProduct[]
        }> = await productApi.list({ TagId: 1 }, { limit })
        if (res.status === 200 && res.data) {
          setResultInitial(res.data.products)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchDataInitial()
  }, [])

  return (
    <>
      <div className='fixed inset-0 z-40' data-aos='fade-down'>
        <div className='w-full lg:h-24 md:h-23 sm:h-22 h-21 z-50 bg-white flex items-center justify-center gap-8'>
          <FontAwesomeIcon
            className='text-zinc-500 lg:hidden lg:text-2xl md:text-xl sm:text-lg text-base font-normal cursor-pointe'
            onClick={onSearchClose}
            icon={faChevronLeft}
          />
          <form
            className='relative flex py-3 px-5 rounded-full bg-zinc-200 overflow-hidden lg:w-[500px] md:w-[450px] sm:w-[400px] w-3/4'
            onSubmit={(e) => {
              e.preventDefault()
              handleClickSearch()
            }}
          >
            <input
              type='search'
              className='w-full outline-none bg-transparent text-zinc-500 text-sm'
              onKeyDown={handleEnter}
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
              placeholder='Tìm kiếm sản phẩm...'
            />
            <FontAwesomeIcon
              className='text-zinc-500 lg:text-2xl md:text-xl sm:text-lg text-base font-normal cursor-pointer ml-4'
              icon={faSearch}
              onClick={handleClickSearch}
            />
          </form>
          <span className='absolute xl:right-1/4 lg:right-1/5 lg: lg:block hidden'>
            <FontAwesomeIcon
              className=' text-zinc-500 lg:text-2xl md:text-xl sm:text-lg text-base font-normal cursor-pointer'
              onClick={onSearchClose}
              icon={faClose}
            />
          </span>
        </div>
        <Overlay onClose={onSearchClose} className='h-screen' position='relative' />
        <div className='absolute lg:top-28 md:top-27 sm:top-26 top-25 lg:w-[1000px] w-full  left-1/2 transform -translate-x-1/2 z-50 bg-white px-5 py-10 lg:px-20 lg:py-12  text-black rounded-lg overflow-y-auto scrollbar-thin scrollbar-thumb-blue-primary scrollbar-track-gray-100'>
          {debouncedSearchValue ? (
            <>
              <div className='mt-5 relative space-y-5'>
                {!loading ? (
                  result.length > 0 ? (
                    <>
                      <span className='text-lg  font-medium'>Sản phẩm</span>
                      <div className={`grid grid-cols-${limit} gap-2 mt-2`}>
                        {result.map((product) => (
                          <ProductGrid key={product.id} product={product} isShowAddCart={false} isShowColor={false} />
                        ))}
                      </div>
                      <div className='flex items-center justify-center'>
                        <Button
                          type='button'
                          color='blue-primary'
                          textColor='white'
                          className='px-10 py-3 rounded-full md:text-sm text-xs font-medium hover:opacity-80'
                          onClick={navigateToSearchPage}
                          value={debouncedSearchValue}
                        >
                          Xem tất cả
                        </Button>
                      </div>
                    </>
                  ) : (
                    <span className='text-sm font-medium'>Không tìm thấy kết quả</span>
                  )
                ) : (
                  <Loader type='inside' />
                )}
              </div>
            </>
          ) : (
            <>
              {' '}
              <div>
                <span className='md:text-base text-sm font-medium'>Từ khoá nổi bật</span>
                <div className='flex flex-wrap items-start gap-2 mt-2'>
                  {highlightKeywords.map((keyword, index) => (
                    <Button
                      key={index}
                      type='button'
                      variant='outline'
                      color='slate-500'
                      textColor='black'
                      className='px-3 py-2 rounded-full md:text-sm text-xs font-medium'
                      onClick={navigateToSearchPage}
                      value={keyword}
                    >
                      {keyword}
                    </Button>
                  ))}
                </div>
              </div>
              <div className='mt-10'>
                <span className='text-sm font-medium'>Sản phẩm mới</span>
                <div className={`grid grid-cols-${limit} gap-2 mt-2 relative`}>
                  {resultInitial.length > 0
                    ? resultInitial.map((product) => (
                        <ProductGrid key={product.id} product={product} isShowAddCart={false} isShowColor={false} />
                      ))
                    : Array.from({ length: limit }).map((_, i) => <ProductGridSkeleton key={i} className='min-h-60' />)}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default ModalSearch
