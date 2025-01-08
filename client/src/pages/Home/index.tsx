import Banner from '@/components/common/Banner'
import Button from '@/components/common/Button'
import Collection from '@/components/common/Collection'
import ProductGrid from '@/components/common/ProductGrid'
import Services from '@/components/common/Services'
import SlideShow from '@/components/common/SlideShow'
import {
  bannerList,
  LG_BP,
  LG_LIMIT,
  MD_BP,
  MD_LIMIT,
  productData,
  slideImages,
  SM_BP,
  SM_LIMIT,
  XS_LIMIT
} from '@/constants'
import { faArrowLeft, faArrowRight, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import 'react-slideshow-image/dist/styles.css'

function Home() {
  const [limit, setLimit] = useState<number>(5)
  const [tag, setTag] = useState<number>(1)
  const handleChangeTag = (value?: string) => {
    if (value) {
      console.log(value)
      setTag(Number(value))
    }
  }
  const bannerArrowProperty = {
    prevArrow: (
      <button className='lg:ml-8 md:ml-6 sm:ml-4 ml-2 '>
        <FontAwesomeIcon icon={faArrowLeft} className='text-white lg:text-xl md:text-lg sm:text-base text-sm' />
      </button>
    ),
    nextArrow: (
      <button className='lg:mr-8 md:mr-6 sm:mr-4 mr-2'>
        <FontAwesomeIcon icon={faArrowRight} className='text-white lg:text-xl md:text-lg sm:text-base text-sm' />
      </button>
    )
  }

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

  const productArrowProperty = {
    prevArrow: (
      <button className='flex items-center justify-center rounded-full lg:w-10 lg:h-10 md:w-9 md:h-9 sm:w-8 sm:h-8 w-7 h-7 bg-black lg:-ml-10  md:-ml-8 sm:-ml-6 -ml-2 '>
        <FontAwesomeIcon icon={faArrowLeft} className='text-white lg:text-xl md:text-lg sm:text-base text-sm' />
      </button>
    ),
    nextArrow: (
      <button className='flex items-center justify-center rounded-full lg:w-10 lg:h-10 md:w-9 md:h-9 sm:w-8 sm:h-8 w-7 h-7 bg-black lg:-mr-10 md:-mr-8 sm:-mr-6 -mr-2 '>
        <FontAwesomeIcon icon={faArrowRight} className='text-white lg:text-xl md:text-lg sm:text-base text-sm' />
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
      <SlideShow properties={bannerArrowProperty} duration={5000}>
        {slideImages.map((img, i) => (
          <Link key={i} to=''>
            <img src={img.url} alt={img.name} />
          </Link>
        ))}
      </SlideShow>
      <Services className='bg-gray-primary lg:py-8 md:py-6 sm:py-4 py-2 lg:px-14 md:px-12 sm:px-10 px-6 mb-10' />
      <div className='lg:px-14 md:px-12 sm:px-10 px-6 mb-10 space-x-4'>
        <Button
          type='button'
          color='black'
          textColor={`${tag === 1 ? 'white' : 'black'}`}
          variant={`${tag === 1 ? 'primary' : 'outline'}`}
          className={`lg:min-w-48 md:min-w-44 sm:min-w-40 min-w-36 lg:text-lg md:text-base sm:text-sm text-xs py-2 rounded-full ${tag === 1 ? '' : 'hover:bg-black hover:text-white'}`}
          onClick={handleChangeTag}
          value={'1'}
        >
          <span>Sản phẩm mới</span> {tag === 1 && <FontAwesomeIcon icon={faStar} className='ml-2' />}
        </Button>
        <Button
          type='button'
          color='black'
          textColor={`${tag === 2 ? 'white' : 'black'}`}
          className={`lg:min-w-48 md:min-w-44 sm:min-w-40 min-w-36 lg:text-lg md:text-base sm:text-sm text-xs py-2 rounded-full ${tag === 2 ? '' : 'hover:bg-black hover:text-white'}`}
          variant={`${tag === 2 ? 'primary' : 'outline'}`}
          onClick={handleChangeTag}
          value={'2'}
        >
          <span>Bán chạy nhất</span> {tag === 2 && <FontAwesomeIcon icon={faStar} className='ml-2' />}
        </Button>
      </div>
      <div className='lg:px-14 md:px-12 sm:px-10 px-6 mb-10'>
        <SlideShow slidesToScroll={limit} slidesToShow={limit} properties={productArrowProperty} duration={1000000}>
          {productData.map((p) => (
            <ProductGrid className='mx-2' key={p.id} product={p} tag={tag} />
          ))}
        </SlideShow>
      </div>
      <Banner
        title='Đồ thu đông'
        subTitle='Giữ ấm cơ thể bạn'
        url={bannerList.mainBanner.url}
        to='/'
        btnColor='blue-primary'
        btnTextColor='white'
        className='mb-10'
        btnClassName='hover:bg-blue-primary-light'
      />
      <Collection
        title='Sản phẩm giảm giá'
        link={{ to: '/', title: 'Xem Thêm' }}
        className='lg:px-14 md:px-12 sm:px-10 px-6 mb-10'
      >
        <SlideShow slidesToScroll={limit} slidesToShow={limit} properties={productArrowProperty} duration={1000000}>
          {productData.map((p) => (
            <ProductGrid className='mx-2' key={p.id} product={p} tag={3} />
          ))}
        </SlideShow>
      </Collection>
      <div className='grid grid-cols-2 gap-5 mb-10'>
        <Link to={'/'}>
          <img src={bannerList.subBanner[0].url} alt={bannerList.subBanner[0].name} className='w-full object-cover' />
        </Link>
        <Link to={'/'}>
          <img src={bannerList.subBanner[1].url} alt={bannerList.subBanner[1].name} className='w-full object-cover' />
        </Link>
      </div>
    </>
  )
}

export default Home
