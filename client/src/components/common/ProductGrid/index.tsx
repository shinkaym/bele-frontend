import variantApi from '@/apis/modules/variant.api'
import { EToastOption } from '@/models/enum'
import { IApiResponse, IProduct, IVariantColor, IVariantProductColor } from '@/models/interfaces'
import { addToCart } from '@/redux/slices/cart.slice'
import { AppDispatch, RootState } from '@/redux/store'
import { UToast } from '@/utils/swal'
import { useEffect, useState } from 'react'
import { FormattedNumber, IntlProvider } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from '../Button'
import Loader from '../Loader'
import RadioColorGroup from '../RadioColorGroup'
import Tag from '../Tag'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import productApi from '@/apis/modules/product.api'

interface IProductGridProps {
  product: IProduct
  className?: string
  tag?: number | null
  isShowColor?: boolean
  isShowPrice?: boolean
  isShowAddCart?: boolean
  isShowTym?: boolean
  handleClickTym?: () => void
}

const ProductGrid = ({
  product,
  tag = null,
  className,
  isShowColor = true,
  isShowPrice = true,
  isShowAddCart = true,
  isShowTym = false,
  handleClickTym
}: IProductGridProps) => {
  const [colorData, setColorData] = useState<IVariantColor>(product.variantColors?.[0] ?? Object)
  const [variantByColor, setVariantByColor] = useState<IVariantProductColor[]>([])
  const { loading, error } = useSelector((state: RootState) => state.cart)
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch<AppDispatch>()
  const handleGetColor = (value: string) => {
    const data = product!.variantColors.find((color) => color.colorId === Number(value))
    if (data) {
      setColorData(data)
    }
  }
  const handleAddCart = async (value?: string) => {
    if (isAuthenticated) {
      const data: { variantId: number; quantity: number } = { variantId: Number(value), quantity: 1 }
      dispatch(addToCart(data))
      if (!error) {
        UToast(EToastOption.SUCCESS, 'Thêm sản phẩm vào giỏ hàng thành công!')
      } else {
        UToast(EToastOption.ERROR, 'Thêm sản phẩm vào giỏ hàng thất bại!')
      }
    } else {
      UToast(EToastOption.WARNING, 'Vui lòng đăng nhập trước khi thêm vào giỏ hàng!')
    }
  }
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res: IApiResponse<{ variants: IVariantProductColor[] }> = await variantApi.detailColor({
          productId: product.id,
          colorId: colorData.colorId
        })
        if (res.data && res.status === 200) {
          setVariantByColor(res.data.variants)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchApi()
  }, [colorData, product.id])

  const handleRemoveFromWishlist = async () => {
    try {
      const res: IApiResponse<void> = await productApi.removeFromWishlist(product.id)
      if (res.status === 200) {
        if (handleClickTym) handleClickTym()
        UToast(EToastOption.SUCCESS, 'Đã xóa sản phẩm khỏi danh sách yêu thích!')
      }
    } catch {
      UToast(EToastOption.ERROR, 'Đã có lỗi xảy ra khi xóa sản phẩm khỏi danh sách yêu thích!')
    }
  }
  return (
    <>
      {Object.keys(product).length > 0 && variantByColor.length > 0 && Object.keys(colorData).length > 0 ? (
        <div className={`${className} space-y-1`}>
          <div className='relative group transition-all duration-500 ease-linear overflow-hidden max-h-80'>
            <Link to={`/product/detail/${product.slug}`}>
              <img
                src={colorData.thumbnail}
                alt={product.name}
                className={`object-cover rounded-md h-full ${isShowAddCart ? 'group-hover:blur-sm' : ''}`}
              />
              <div className={`absolute left-2 right-2 top-1 ${isShowAddCart ? 'group-hover:blur-sm' : ''}`}>
                <div className={`flex items-center justify-between `}>
                  {product.rateAVG.length > 0 && (
                    <div className='flex items-center space-x-0.5'>
                      <span className='lg:text-sm md:text-xs sm:text-2xs text-3xs'>
                        {Math.trunc(product.rateAVG.reduce((acc, cur) => acc + cur, 0) / product.rateAVG.length)}
                      </span>
                      <FontAwesomeIcon icon={faStar} className='lg:text-xs md:text-2xs sm:text-3xs text-4xs' />
                      <span className='lg:text-sm md:text-xs sm:text-2xs text-3xs text-blue-primary font-bold'>
                        ({product.rateAVG.length})
                      </span>
                    </div>
                  )}
                  {product.tags.length > 0 ? (
                    tag ? (
                      <Tag title={product.tags.find((t) => t.id === tag)?.name || ''} />
                    ) : (
                      <Tag title={product.tags[0]?.name || ''} />
                    )
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </Link>
            {isShowAddCart && (
              <div className='absolute -bottom-40 lg:left-5 lg:right-5 md:left-4 md:right-4 sm:left-3 sm:right-3 left-2 right-2 bg-gradient-to-t from-black/10 to-white/40 p-2 rounded-md lg:group-hover:bottom-5 md:group-hover:bottom-4 sm:group-hover:bottom-3 group-hover:bottom-2  z-50 transition-all duration-300 ease-linear'>
                <p className='font-semibold text-black text-center mb-3 lg:text-base md:text-sm text-xs'>
                  Thêm vào giỏ hàng
                </p>
                <div className='grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2'>
                  {variantByColor.map((v) => (
                    <Button
                      key={v.variantId}
                      onClick={handleAddCart}
                      color='white'
                      textColor='black'
                      type='button'
                      value={v.variantId.toString()}
                      className='w-full lg:h-10 md:h-9 sm:h-8 h-7  lg:text-base md:text-sm text-xs rounded-md hover:bg-black hover:text-white'
                    >
                      {v.size}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            {isShowTym && (
              <button
                className='absolute -top-40  lg:right-5  md:right-4  sm:right-3 right-2 bg-transparent p-2 rounded-md lg:group-hover:top-5 md:group-hover:top-4 sm:group-hover:top-3 group-hover:top-2  z-50 transition-all duration-300 ease-linear'
                onClick={handleRemoveFromWishlist}
              >
                <FontAwesomeIcon
                  icon={faHeart}
                  className='w-8 h-8 text-red-500 hover:text-red-600 hover:scale-150 transition-all duration-200 bg-transparent'
                />
              </button>
            )}
          </div>
          {isShowColor && Object.keys(Object(colorData)).length > 0 && (
            <RadioColorGroup
              options={
                product.variantColors.filter(
                  (item, index, self) => self.findIndex((v) => v.colorId === item.colorId) === index
                ).map((item) => ({
                  id: item.colorId.toString(), // Lấy colorId làm id
                  value: item.color, // Lấy colorName làm value (tuỳ thuộc vào cấu trúc dữ liệu)
                })) || []
              }
              selectedValue={colorData.colorId.toString()}
              name={`${product.id}-${colorData.colorId}-${colorData.variantId}`}
              onChange={handleGetColor}
              classNameItems='lg:w-9 lg:h-5 md:w-8.5 md:h-4.5 sm:w-8 sm:h-4 w-7.5 h-3.5'
            />
          )}
          <p className='max-w-full truncate lg:text-sm md:text-xs sm:text-2xs text-3xs font-normal'>
            <Link to={`/product/detail/${product.slug}`}>{product.name}</Link>
          </p>

          {isShowPrice && (
            <div className='space-x-2 flex items-center'>
              <IntlProvider locale='vi-VN'>
                {product.discount && product.discount?.discountValue !== 0 && (
                  <>
                    <span className='font-semibold lg:text-sm md:text-xs sm:text-2xs text-3xs'>
                      <FormattedNumber
                        value={Math.trunc(colorData!.price * (1 - product.discount!.discountValue / 100))}
                        style='currency'
                        currency='VND'
                      />
                    </span>
                    <span className='px-1 py-0.5 bg-blue-primary text-white lg:text-xs md:text-2xs sm:text-3xs text-4xs rounded-md font-bold'>
                      -{product.discount!.discountValue}%
                    </span>
                  </>
                )}
                <span
                  className={`font-semibold lg:text-sm md:text-xs sm:text-2xs text-3xs ${
                    product.discount?.discountValue !== 0 ? 'text-gray-text line-through' : ''
                  }`}
                >
                  <FormattedNumber value={colorData!.price} style='currency' currency='VND' />
                </span>
              </IntlProvider>
            </div>
          )}
          {loading && <Loader type='inside' />}
        </div>
      ) : (
        <div className={`${className} space-y-1 animate-pulse`}>
          <div className='relative group transition-all duration-500 ease-linear overflow-hidden min-h-80 w-full bg-slate-200'></div>
          <div className='flex items-center gap-2'>
            <div className='lg:w-9 lg:h-5 md:w-8.5 md:h-4.5 sm:w-8 sm:h-4 w-7.5 h-3.5 rounded-md bg-slate-200'></div>
            <div className='lg:w-9 lg:h-5 md:w-8.5 md:h-4.5 sm:w-8 sm:h-4 w-7.5 h-3.5 rounded-md bg-slate-200'></div>
            <div className='lg:w-9 lg:h-5 md:w-8.5 md:h-4.5 sm:w-8 sm:h-4 w-7.5 h-3.5 rounded-md bg-slate-200'></div>
          </div>
          <p className='max-w-full truncate lg:text-sm md:text-xs sm:text-2xs text-3xs font-normal bg-slate-200 h-3'></p>
          <div className='bg-slate-200 w-full h-5'></div>
          {loading && <Loader type='inside' />}
        </div>
      )}
    </>
  )
}

export default ProductGrid
