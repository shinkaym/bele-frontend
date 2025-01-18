import attributeApi from '@/apis/modules/attribute.api'
import categoryApi from '@/apis/modules/category.api'
import productApi from '@/apis/modules/product.api'
import RadioButtonGroup from '@/components/common/Forms/RadioButtonGroup'
import RadioGroup from '@/components/common/Forms/RadioGroup'
import RangeSlider from '@/components/common/Forms/RangeSlider'
import Pagination from '@/components/common/Pagination'
import ProductGrid from '@/components/common/ProductGrid'
import ProductGridSkeleton from '@/components/common/ProductGridSkeleton'
import RadioColorGroup from '@/components/common/RadioColorGroup'
import { LG_BP, LG_LIMIT, MD_BP, MD_LIMIT, SM_BP, SM_LIMIT, XS_LIMIT } from '@/constants'
import useDebounce from '@/hooks/useDebounce'
import { IApiResponse, IAttributeValue, ICategory, IPagination, IProduct } from '@/models/interfaces'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import 'react-slideshow-image/dist/styles.css'

function Filter() {
  const [limit, setLimit] = useState<number>(8)
  const [result, setResult] = useState<IProduct[]>([])
  const [pagination, setPagination] = useState<IPagination>({ currentPage: 1, totalPage: 0 })
  const [categorySelected, setCategorySelected] = useState<{ id?: number; type?: string }>({
    id: undefined, // Giá trị mặc định
    type: undefined
  })

  const [colorSelected, setColorSelected] = useState<{ value: string; name?: string }>({
    value: '',
    name: undefined
  })
  const [sizeSelected, setSizeSelected] = useState<string>('')
  const [skeleton, setSkeleton] = useState<boolean>(false)
  const [categories, setCategories] = useState<ICategory[]>([])
  const [colorList, setColorList] = useState<IAttributeValue[]>([])
  const [sizeList, setSizeList] = useState<IAttributeValue[]>([])
  const [maxPrice, setMaxPrice] = useState<number>(0)
  const [rangeValue, setRangeValue] = useState<string>('')
  const { slug } = useParams()
  const debounceRangeValue = useDebounce(rangeValue, 500)
  const [loading, setLoading] = useState<boolean>(false)

  const updateLimit = () => {
    const width = window.innerWidth
    console.log('Set Limit')
    if (width >= LG_BP) {
      setLimit(LG_LIMIT * 2 - 2)
    } else if (width >= MD_BP) {
      setLimit(MD_LIMIT * 2 - 2)
    } else if (width >= SM_BP) {
      setLimit(SM_LIMIT * 2 - 2)
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
  }, [limit])

  const fetchData = async (
    filter: { CategoryId?: number; Color?: string; Size?: string; CategoryRefId?: number; Price: string },
    page: number,
    limit: number
  ) => {
    setSkeleton(true)
    try {
      const params = {
        page,
        limit
      }
      const res: IApiResponse<{
        products: IProduct[]
        pagination: IPagination
      }> = await productApi.list(filter, params)
      if (res.status === 200 && res.data) {
        setResult(res.data.products)
        console.log(res.data)
        setPagination(res.data.pagination)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSkeleton(false)
    }
  }
  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, currentPage: page }))
    fetchData(
      {
        CategoryId: categorySelected.type ? undefined : categorySelected.id,
        Color: colorSelected.value,
        Size: sizeSelected,
        CategoryRefId: categorySelected.type ? categorySelected.id : undefined,
        Price: debounceRangeValue
      },
      page,
      limit
    )
  }

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res: IApiResponse<{ categories: ICategory[] }> = await categoryApi.list()
        if (res.data && res.status === 200) {
          let categories: ICategory[] = []
          setCategorySelected({
            id: undefined,
            type: undefined
          })
          setColorSelected({
            value: '',
            name: undefined
          })
          setSizeSelected('')
          if (!slug) {
            // Nếu không có slug, chỉ lấy dữ liệu cha
            categories = res.data.categories.map(({ id, name, slug }) => ({ id, name, slug, type: 'categoryRef' }))
            setCategories(categories)
            return
          }
          for (const category of res.data.categories) {
            // Nếu slug khớp với cha
            if (category.slug === slug) {
              categories = [
                { id: category.id, name: `Tất cả ${category.name}`, slug: category.slug, type: 'categoryRef' },
                ...(category.referenceCategory || []) // Đảm bảo referenceCategory luôn là mảng
              ]
              setCategorySelected({
                id: category.id,
                type: 'categoryRef'
              })
              setCategories(categories)
              return
            }

            // Nếu slug khớp với bất kỳ con nào
            const matchedChild = category.referenceCategory?.find((child) => child.slug === slug)
            if (matchedChild) {
              categories = [
                { id: category.id, name: `Tất cả ${category.name}`, slug: category.slug, type: 'categoryRef' },
                ...(category.referenceCategory || []) // Đảm bảo referenceCategory luôn là mảng
              ]
              setCategorySelected({
                id: matchedChild.id
              })
              setCategories(categories)
              return
            }
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchApi()
  }, [slug])
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res: IApiResponse<{
          attributeValues: IAttributeValue[]
        }> = await attributeApi.getAll(1)
        if (res.status === 200 && res.data) {
          setColorList(res.data.attributeValues)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchApi()
  }, [])
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res: IApiResponse<{
          maxPrice: number
        }> = await productApi.maxPrice()
        if (res.status === 200 && res.data) {
          setMaxPrice(res.data.maxPrice)
          setRangeValue(`0-${res.data.maxPrice}`)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchApi()
  }, [])
  useEffect(() => {
    fetchData(
      {
        CategoryId: categorySelected.type ? undefined : categorySelected.id,
        Color: colorSelected.value,
        Size: sizeSelected,
        CategoryRefId: categorySelected.type ? categorySelected.id : undefined,
        Price: debounceRangeValue
      },
      pagination.currentPage,
      limit
    )
  }, [colorSelected, sizeSelected, categorySelected, debounceRangeValue])

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res: IApiResponse<{
          attributeValues: IAttributeValue[]
        }> = await attributeApi.getAll(2)
        if (res.status === 200 && res.data) {
          setSizeList(res.data.attributeValues)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchApi()
  }, [])

  return (
    <>
      <div className='lg:px-14 md:px-12 sm:px-10 px-6 mb-5 space-x-4 py-8 grid md:grid-cols-4 grid-cols-6 gap-4'>
        <div className='md:space-y-5 space-y-4 relative md:col-span-1 col-span-2'>
          <div className='space-y-2'>
            <h1 className='font-semibold text-zinc-500 md:text-base text-sm'>Sản phẩm</h1>
            <RadioGroup
              layout='vertical'
              name='category'
              selectedValue={categorySelected.id?.toString()}
              onChange={(value, type) =>
                setCategorySelected({
                  id: Number(value),
                  type
                })
              }
              options={categories}
            />
          </div>
          <div className='space-y-2'>
            <h1 className='font-semibold text-zinc-500  md:text-base text-sm'>Kích cỡ</h1>
            {colorList.length > 0 && (
              <RadioButtonGroup
                selectedValue={sizeSelected}
                name='size'
                options={sizeList.map((color) => ({ value: color.value }))}
                className='space-x-3'
                onChange={(value) => setSizeSelected(value)}
              />
            )}
          </div>
          <div className='space-y-2'>
            <h1 className='font-semibold text-zinc-500  md:text-base text-sm'>Màu sắc</h1>
            {colorList.length > 0 && (
              <RadioColorGroup
                name='color'
                selectedValue={colorSelected.value}
                options={colorList.map((color) => ({
                  id: color.value,
                  value: color.value,
                  optionName: color.name
                }))}
                colorOutline='blue-primary'
                className='md:space-x-6 space-x-4 ml-2'
                classNameItems='md:w-4 md:h-4 w-3 h-3'
                onChange={(value, name) => setColorSelected({ value, name })}
              />
            )}
          </div>
          <div className='space-y-2 pt-5'>
            <h1 className='font-semibold text-zinc-500  md:text-base text-sm mb-6'>Theo giá</h1>
            {maxPrice > 0 && (
              <RangeSlider
                className='ml-2'
                max={maxPrice}
                step={10000}
                value={rangeValue}
                onChange={(value) => setRangeValue(value)}
              />
            )}
          </div>
        </div>
        <div className='md:col-span-3 col-span-4'>
          <div className='sm:flex sm:items-center gap-4 mb-6'>
            {pagination?.totalProduct && pagination.totalProduct > 0 ? (
              <h3 className='sm:mb-0 mb-2 font-semibold md:text-sm text-xs'>{`${pagination.totalProduct} Kết quả`}</h3>
            ) : ''}

            <div className='flex items-center sm:justify-start justify-between gap-2'>
              {' '}
              {colorSelected.value && (
                <button
                  onClick={() => setColorSelected({ value: '', name: undefined })}
                  type='button'
                  className='flex items-center justify-between sm:w-[100px] w-full md:px-3 md:py-1.5 px-2 py-1 md:text-base text-sm bg-zinc-100 border rounded-full'
                >
                  <span className='md:text-sm text-xs'> {colorSelected.name}</span>
                  <FontAwesomeIcon icon={faClose} className='sm:text-xs text-2xs' />
                </button>
              )}
              {sizeSelected && (
                <button
                  onClick={() => setSizeSelected('')}
                  type='button'
                  className='flex items-center justify-between sm:w-[100px] w-full md:px-3 md:py-1.5 px-2 py-1 md:text-base text-sm bg-zinc-100 border rounded-full'
                >
                  <span className='text-sm'> {sizeSelected}</span>
                  <FontAwesomeIcon icon={faClose} className='sm:text-xs text-2xs' />
                </button>
              )}
            </div>
          </div>
          <div className={`grid grid-cols-${limit/2} gap-2`}>
            {skeleton ? (
              Array.from({ length: limit }).map((_, i) => <ProductGridSkeleton key={i} />)
            ) : result.length > 0 ? (
              result.map((pro) => <ProductGrid product={pro} key={pro.id} />)
            ) : (
              <p className='col-span-4 md:text-base sm:text-sm text-xs'>Không tìm thấy kết quả</p>
            )}
          </div>
          {pagination.totalPage > 1 && (
            <Pagination
              currentPage={pagination.currentPage}
              totalPage={pagination.totalPage}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default Filter
