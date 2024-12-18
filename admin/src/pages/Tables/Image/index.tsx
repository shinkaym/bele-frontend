import ImageApi from '@/apis/modules/image.api'
import Breadcrumb from '@/components/common/Breadcrumbs/Breadcrumb'
import Loader from '@/components/common/Loader'
import ImageTable from '@/components/common/Tables/ImageTable'
import { IImage } from '@/models/interfaces/image'
import { useEffect, useState } from 'react'

type Props = {}

function Image({}: Props) {
  const [loading, setLoading] = useState(false)
  const [ImageData, setImageData] = useState<IImage[]>([])
  const handleSearch = (query:string) => {
    console.log(query);
  }

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    try {
      setLoading(true) // Bật trạng thái loading
      // Giả lập fetch từ backend (thay bằng axios hoặc fetch nếu cần)
      timeoutId = setTimeout(() => {
        const data = ImageApi.getAll();
        setImageData(data) // Cập nhật dữ liệu
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
          <Breadcrumb pageName='Image' />

          <div className='flex flex-col gap-10'>
            <ImageTable images={ImageData} onSearch={handleSearch}/>
          </div>
        </>
      )}
    </>
  )
}

export default Image
