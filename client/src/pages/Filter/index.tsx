import attributeApi from '@/apis/modules/attribute.api'
import categoryApi from '@/apis/modules/category.api'
import productApi from '@/apis/modules/product.api'
import searchApi from '@/apis/modules/search.api.'
import Input from '@/components/common/Forms/Input'
import RadioButtonGroup from '@/components/common/Forms/RadioButtonGroup'
import RadioGroup from '@/components/common/Forms/RadioGroup'
import Loader from '@/components/common/Loader'
import Pagination from '@/components/common/Pagination'
import ProductGrid from '@/components/common/ProductGrid'
import ProductGridSkeleton from '@/components/common/ProductGridSkeleton'
import RadioColorGroup from '@/components/common/RadioColorGroup'
import useDebounce from '@/hooks/useDebounce'
import { IApiResponse, IAttributeType, IAttributeValue, ICategory, IPagination, IProduct } from '@/models/interfaces'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import 'react-slideshow-image/dist/styles.css'
const limit = 8

function Filter() {
  const [result, setResult] = useState<IProduct[]>([])
  const [pagination, setPagination] = useState<IPagination>({ currentPage: 1, totalPage: 0 })
  const [categorySelected, setCategorySelected] = useState<{ id: number; type?: string }>({
    id: 0, // Giá trị mặc định
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
  const { slug } = useParams()
  const [loading, setLoading] = useState<boolean>(false)
  // const filter: { CategoryId?: number; Color?: string; Size?: string; CategoryRefId?: number } = {
  //   CategoryId: categorySelected.type ? undefined : categorySelected.id,
  //   Color: colorSelected,
  //   Size: sizeSelected
  // }

  const fetchData = async (
    filter: { CategoryId?: number; Color?: string; Size?: string; CategoryRefId?: number },
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
        console.log(res.data.products)
        setResult(res.data.products)
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
        Size: sizeSelected
      },
      page,
      limit
    )
  }
  useEffect(() => {
    const fetchApi = async () => {
      console.log('Call api')
      try {
        const res: IApiResponse<{ categories: ICategory[] }> = await categoryApi.list()
        if (res.data && res.status === 200) {
          let categories: ICategory[] = []
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
              // console.log(categories)
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

  useEffect(() => {
    fetchData(
      {
        CategoryId: categorySelected.type ? undefined : categorySelected.id,
        Color: colorSelected.value,
        Size: sizeSelected,
        CategoryRefId: categorySelected.type ? categorySelected.id : undefined
      },
      pagination.currentPage,
      limit
    )
  }, [colorSelected, sizeSelected, categorySelected])

  

  return (
    <>
      <div className='lg:px-14 md:px-12 sm:px-10 px-6 mb-5 space-x-4 py-8 grid grid-cols-4 gap-4'>
        <div className='space-y-3 relative'>
          <div className='space-y-2'>
            <h1 className='font-semibold text-zinc-500'>Sản phẩm</h1>
            <RadioGroup
              layout='vertical'
              name='category'
              selectedValue={categorySelected.id.toString()}
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
            <h1 className='font-semibold text-zinc-500'>Kích cỡ</h1>
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
            <h1 className='font-semibold text-zinc-500'>Màu sắc</h1>
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
                className='space-x-6 ml-2'
                classNameItems='lg:w-4 lg:h-4'
                onChange={(value, name) => setColorSelected({ value, name })}
              />
            )}
          </div>
        </div>
        <div className='col-span-3'>
          {result.length > 0 && (
            <div className='flex items-center gap-4 mb-6'>
              <h3 className='font-semibold text-sm'>{result.length} Kết quả</h3>
              <div className='flex items-center gap-2'>
                {' '}
                {colorSelected.value && (
                  <button
                    onClick={() => setColorSelected({ value: '', name: undefined })}
                    type='button'
                    className='flex items-center justify-between w-[100px] px-3 py-1.5 bg-zinc-100 border rounded-full'
                  >
                    <span className='text-sm'> {colorSelected.name}</span>
                    <FontAwesomeIcon icon={faClose} className='text-xs' />
                  </button>
                )}
                {sizeSelected && (
                  <button
                    onClick={() => setSizeSelected('')}
                    type='button'
                    className='flex items-center justify-between w-[100px] px-3 py-1.5 bg-zinc-100 border rounded-full'
                  >
                    <span className='text-sm'> {sizeSelected}</span>
                    <FontAwesomeIcon icon={faClose} className='text-xs' />
                  </button>
                )}
              </div>
            </div>
          )}
          <div className='grid grid-cols-4 gap-2'>
            {skeleton ? (
              Array.from({ length: limit }).map((_, i) => <ProductGridSkeleton key={i} />)
            ) : result.length > 0 ? (
              result.map((pro) => <ProductGrid product={pro} key={pro.id} />)
            ) : (
              <p>Không tìm thấy kết quả</p>
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
