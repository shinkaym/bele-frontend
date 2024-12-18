import ProductApi from '@/apis/modules/product.api'
import Breadcrumb from '@/components/common/Breadcrumbs/Breadcrumb'
import Loader from '@/components/common/Loader'
import ProductTable from '@/components/common/Tables/ProductTable'
import { IProduct } from '@/models/interfaces/product'
import { useEffect, useState } from 'react'

type Props = {}

function Product({}: Props) {
  const [loading, setLoading] = useState(false)
  const [ProductData, setProductData] = useState<IProduct[]>([])
  const handleSearch = (query:string) => {
    console.log(query);
  }

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    try {
      setLoading(true) // Bật trạng thái loading
      // Giả lập fetch từ backend (thay bằng axios hoặc fetch nếu cần)
      timeoutId = setTimeout(() => {
        const data = ProductApi.getAll();
        setProductData(data) // Cập nhật dữ liệu
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
          <Breadcrumb pageName='Product' />

          <div className='flex flex-col gap-10'>
            <ProductTable Products={ProductData} onSearch={handleSearch}/>
          </div>
        </>
      )}
    </>
  )
}

export default Product
