import Breadcrumb from '@/components/common/Breadcrumbs/Breadcrumb'
import Loader from '@/components/common/Loader'
import CategoryTable from '@/components/common/Tables/CategoryTable'
import ICategory from '@/models/interfaces/category'
import { useEffect, useState } from 'react'
import categoryApi from '@/apis/modules/categoy.api'

type Props = {}

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
        const data = categoryApi.getAll();
        setCategoryData(data) // Cập nhật dữ liệu
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
