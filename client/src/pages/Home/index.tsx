import Button from '@/components/common/Button'
import { ProductGird } from '@/components/common/ProductGrid'
import Services from '@/components/common/Services'
import SlideShow from '@/components/common/SlideShow'
import { LG_BP, LG_LIMIT, MD_BP, MD_LIMIT, productData, slideImages, SM_LIMIT, XL_BP, XL_LIMIT } from '@/constants'
import { faArrowLeft, faArrowRight, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import 'react-slideshow-image/dist/styles.css'

function Home() {
  const [limit, setLimit] = useState<number>(5)
  const bannerArrowProperty = {
    prevArrow: (
      <button className='lg:block hidden xl:ml-10 lg:ml-8'>
        <FontAwesomeIcon icon={faArrowLeft} className='text-white xl:text-2xl lg:text-xl' />
      </button>
    ),
    nextArrow: (
      <button className='lg:block hidden xl:mr-10 lg:ml-8'>
        <FontAwesomeIcon icon={faArrowRight} className='text-white xl:text-2xl lg:text-xl' />
      </button>
    )
  }

  const updateLimit = () => {
    const width = window.innerWidth
    if (width >= XL_BP) {
      setLimit(XL_LIMIT) // Nếu màn hình lớn hơn 1200px
    } else if (width >= LG_BP) {
      setLimit(LG_LIMIT) // Nếu màn hình lớn hơn 768px
    } else if (width >= MD_BP) {
      setLimit(MD_LIMIT) // Màn hình nhỏ
    } else {
      setLimit(SM_LIMIT)
    }
  }

  const productArrowProperty = {
    prevArrow: (
      <button className='rounded-full w-10 h-10 bg-black lg:block hidden xl:-ml-12 lg:-ml-4'>
        <FontAwesomeIcon icon={faArrowLeft} className='text-white xl:text-2xl lg:text-xl ' />
      </button>
    ),
    nextArrow: (
      <button className='rounded-full w-10 h-10 bg-black lg:block hidden xl:-mr-12 lg:-mr-4'>
        <FontAwesomeIcon icon={faArrowRight} className='text-white xl:text-2xl lg:text-xl' />
      </button>
    )
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
      <SlideShow properties={bannerArrowProperty}>
        {slideImages.map((img, i) => (
          <Link key={i} to=''>
            <img src={img.url} alt={img.name} />
          </Link>
        ))}
      </SlideShow>
      <Services className='bg-gray-primary lg:py-8 py-4 xl:px-16 lg:px-12 md:px-8 px-4 mb-5' />
      <div className='xl:px-16 lg:px-12 md:px-8 px-4 mb-5 space-x-4'>
        <Button
          type='button'
          color='black'
          textColor='white'
          className='xl:min-w-52 lg:min-w-48 md:min-w-44 min-w-40 py-2 rounded-full'
        >
          <span className='mr-2'> New Products</span> <FontAwesomeIcon icon={faStar} />
        </Button>
        <Button
          type='button'
          color='black'
          textColor='black'
          className='xl:min-w-52 lg:min-w-48 md:min-w-44 min-w-40 py-2 rounded-full'
          variant='outline'
        >
          <span> Sub Products</span>
        </Button>
      </div>
      <div className='xl:px-16 lg:px-12 md:px-8 px-4 mb-5'>
        <SlideShow slidesToScroll={limit} slidesToShow={limit} properties={productArrowProperty} duration={1000000}>
          {productData.map((p) => (
            <ProductGird className='mx-2' key={p.id} product={p} />
          ))}
        </SlideShow>
      </div>
    </>
  )
}

export default Home
