import productApi from '@/apis/modules/product.api'
import Banner from '@/components/common/Banner'
import Button from '@/components/common/Button'
import Collection from '@/components/common/Collection'
import Loader from '@/components/common/Loader'
import ProductGrid from '@/components/common/ProductGrid'
import Services from '@/components/common/Services'
import SlideShow from '@/components/common/SlideShow'
import { LG_BP, LG_LIMIT, MD_BP, MD_LIMIT, SM_BP, SM_LIMIT, XS_LIMIT } from '@/constants'
import { IApiResponse, IProduct } from '@/models/interfaces'
import { RootState } from '@/redux/store'
import { faArrowLeft, faArrowRight, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { memo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import 'react-slideshow-image/dist/styles.css'

const Home = memo(() => {
  const [limit, setLimit] = useState<number>(5)
  // const [tags,setTags] = useState<ITag[]>([])
  const [tag, setTag] = useState<number>(1)
  const [products, setProducts] = useState<IProduct[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const settings = useSelector((state: RootState) => state.settings.data)
  const handleChangeTag = (value?: string) => {
    if (value) {
      setTag(Number(value))
    }
  }

  useEffect(() => {
    const fetchApi = async () => {
      setLoading(true)
      try {
        const res: IApiResponse<{ products: IProduct[] }> = await productApi.list({ TagId: tag })
        if (res.data && res.status === 200) {
          setProducts(res.data.products)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchApi()
  }, [tag])

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
        <Link to=''>
          <img src={settings?.slideShow.slideshowBanner1} alt={'slideshowBanner1'} />
        </Link>
        <Link to=''>
          <img src={settings?.slideShow.slideshowBanner2} alt={'slideshowBanner2'} />
        </Link>
        <Link to=''>
          <img src={settings?.slideShow.slideshowBanner3} alt={'slideshowBanner3'} />
        </Link>
      </SlideShow>
      <Services
        service={settings?.service || null} 
        className='bg-gray-primary lg:py-8 md:py-6 sm:py-4 py-2 lg:px-14 md:px-12 sm:px-10 px-6 mb-10'
      />
      <div className='lg:px-14 md:px-12 sm:px-10 px-6 mb-10 space-x-4'>
        <Button
          type='button'
          color='black'
          textColor={`${tag === 1 ? 'white' : 'black'}`}
          variant={`${tag === 1 ? 'primary' : 'outline'}`}
          className={`lg:min-w-48 md:min-w-44 sm:min-w-40 min-w-36 lg:text-lg md:text-base sm:text-sm text-xs py-2 rounded-full ${
            tag === 1 ? '' : 'hover:bg-black hover:text-white'
          }`}
          onClick={handleChangeTag}
          value={'1'}
        >
          <span>Sản phẩm mới</span> {tag === 1 && <FontAwesomeIcon icon={faStar} className='ml-2' />}
        </Button>
        <Button
          type='button'
          color='black'
          textColor={`${tag === 3 ? 'white' : 'black'}`}
          className={`lg:min-w-48 md:min-w-44 sm:min-w-40 min-w-36 lg:text-lg md:text-base sm:text-sm text-xs py-2 rounded-full ${
            tag === 2 ? '' : 'hover:bg-black hover:text-white'
          }`}
          variant={`${tag === 3 ? 'primary' : 'outline'}`}
          onClick={handleChangeTag}
          value={'2'}
        >
          <span>Bán chạy nhất</span> {tag === 2 && <FontAwesomeIcon icon={faStar} className='ml-2' />}
        </Button>
      </div>
      <div className='lg:px-14 md:px-12 sm:px-10 px-6 mb-10'>
        {!loading ? (
          products.length > limit + 2 ? (
            <>
              <SlideShow
                slidesToScroll={1}
                slidesToShow={products.length < limit ? products.length : limit}
                properties={productArrowProperty}
                duration={1000000}
              >
                {products.map((p) => (
                  <ProductGrid className='mx-2' key={p.id} product={p} tag={tag} />
                ))}
              </SlideShow>
            </>
          ) : (
            <>
              <div className={`grid grid-cols-${limit} gap-2`}>
                {products.map((p) => (
                  <ProductGrid key={p.id} product={p} tag={tag} />
                ))}
              </div>
            </>
          )
        ) : (
          <Loader />
        )}
      </div>
      <Banner
        title='Đồ thu đông'
        subTitle='Giữ ấm cơ thể bạn'
        url={settings!.banner.mainBanner}
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
        {!loading ? (
          products.length > limit + 2 ? (
            <>
              <SlideShow
                slidesToScroll={1}
                slidesToShow={products.length < limit ? products.length : limit}
                properties={productArrowProperty}
                duration={1000000}
              >
                {products.map((p) => (
                  <ProductGrid className='mx-2' key={p.id} product={p} tag={tag} />
                ))}
              </SlideShow>
            </>
          ) : (
            <>
              <div className={`grid grid-cols-${limit} gap-2`}>
                {products.map((p) => (
                  <ProductGrid key={p.id} product={p} tag={tag} />
                ))}
              </div>
            </>
          )
        ) : (
          <Loader />
        )}
      </Collection>
      <div className='grid grid-cols-2 gap-5 mb-10'>
        <Link to={'/'}>
          <img src={settings?.banner.subBanner1} alt={'subBanner1'} className='w-full object-cover' />
        </Link>
        <Link to={'/'}>
          <img src={settings?.banner.subBanner2} alt={'subBanner2'} className='w-full object-cover' />
        </Link>
      </div>
    </>
  )
})

export default Home
