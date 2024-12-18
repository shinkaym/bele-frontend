import categoryApi from '@/apis/modules/categoy.api'
import Breadcrumb from '@/components/common/Breadcrumbs/Breadcrumb'
import Loader from '@/components/common/Loader'
import CategoryTable from '@/components/common/Tables/CategoryTable'
import { ICategory } from '@/models/interfaces/category'
import { useEffect, useState } from 'react'

type Props = {}

function Category({}: Props) {
  const [loading, setLoading] = useState(false)
  const [categoryList, setCategoryList] = useState<ICategory[]>([])
  const handleSearch = (query: string) => {
    console.log(query)
  }

  useEffect(() => {
    const handleGetCategoryList = async () => {
      setLoading(true) // Bật trạng thái loading
      try {
        const data = await categoryApi.getList();
        setCategoryList(data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching categories:', error)
        setLoading(false)
      }
    }
    handleGetCategoryList()
  }, [])

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Breadcrumb pageName='Category' />

          <div className='flex flex-col gap-10'>
            <CategoryTable categories={categoryList} onSearch={handleSearch} />
          </div>
        </>
      )}
    </>
  )
}

export default Category
