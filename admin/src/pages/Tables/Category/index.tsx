import Breadcrumb from '@/components/common/Breadcrumbs/Breadcrumb'
import Loader from '@/components/common/Loader'
import CategoryTable from '@/components/common/Tables/CategoryTable'
import ICategory from '@/models/types/category'
import { useEffect, useState } from 'react'

type Props = {}

const categories: ICategory[] = [
  {
    id: 1,
    name: 'Electronics',
    parentName: '',
    status: 1,
    deleted: 0,
    slug: 'electronics',
    createdAt: '2023-01-15T00:00:00Z'
  },
  {
    id: 2,
    name: 'Mobile Phones',
    parentName: 'Electronics',
    status: 1,
    deleted: 0,
    slug: 'mobile-phones',
    createdAt: '2023-01-15T00:00:00Z'
  },
  {
    id: 3,
    name: 'Laptops',
    parentName: 'Electronics',
    status: 1,
    deleted: 0,
    slug: 'laptops',
    createdAt: '2023-01-15T00:00:00Z'
  },
  {
    id: 4,
    name: 'Home Appliances',
    parentName: '',
    status: 1,
    deleted: 0,
    slug: 'home-appliances',
    createdAt: '2023-01-15T00:00:00Z'
  },
  {
    id: 5,
    name: 'Kitchen Appliances',
    parentName: 'Home Appliances',
    status: 1,
    deleted: 0,
    slug: 'kitchen-appliances',
    createdAt: '2023-01-15T00:00:00Z'
  }
]

function Category({}: Props) {
  const [loading, setLoading] = useState(false)
  const [categoryData, setCategoryData] = useState<ICategory[]>([])
  const handleSearch = (query:string) => {
    console.log(query);
  }

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    try {
      setLoading(true) // Bật trạng thái loading
      // Giả lập fetch từ backend (thay bằng axios hoặc fetch nếu cần)
      timeoutId = setTimeout(() => {
        setCategoryData(categories) // Cập nhật dữ liệu
        setLoading(false) // Tắt trạng thái loading
      }, 1000)
    } catch (error) {
      console.error('Error fetching categories:', error)
      setLoading(false)
    }
    return () => {
      clearTimeout(timeoutId) // Dọn dẹp timeout khi unmount
    }
  }, [])

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Breadcrumb pageName='Category' />

          <div className='flex flex-col gap-10'>
            <CategoryTable categories={categoryData} onSearch={handleSearch}/>
          </div>
        </>
      )}
    </>
  )
}

export default Category
