import ProductGrid from '@/components/common/ProductGrid'
import { LG_BP, LG_LIMIT, MD_BP, MD_LIMIT, productData, SM_BP, SM_LIMIT, XS_LIMIT } from '@/constants'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import 'react-slideshow-image/dist/styles.css'

function Search() {
  const [limit, setLimit] = useState<number>(5)
  const [searchParams] = useSearchParams()

  const value = searchParams.get('value')
  // const tag = searchParams.get('tag')
  // const sort = searchParams.get('sort')

  useEffect(() => {
    console.log('Search value:', value) // Kiểm tra giá trị
  }, [value])
  const updateLimit = () => {
    const width = window.innerWidth
    if (width >= LG_BP) {
      setLimit(LG_LIMIT)
    } else if (width >= MD_BP) {
      setLimit(MD_LIMIT)
    } else if (width >= SM_BP) {
      setLimit(SM_LIMIT)
    } else {
      setLimit(XS_LIMIT)
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
      <div className='lg:px-14 md:px-12 sm:px-10 px-6 mb-10 space-x-4'></div>
      <div className='lg:px-14 md:px-12 sm:px-10 px-6 mb-10 grid grid-cols-5 gap-4'>
        {productData.map((p) => (
          <ProductGrid key={p.id} product={p} tag={1} />
        ))}
      </div>
    </>
  )
}

export default Search
