import { IColor, IProduct } from '@/models/interfaces'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../Button'
import RadioColorGroup from '../RadioColorGroup'
import { IntlProvider, FormattedNumber } from 'react-intl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import Tag from '../Tag'

interface IProductGridProps {
  product: IProduct
  className?: string
  tag?: number
  isShowColor?: boolean
  isShowPrice?: boolean
  isShowAddCart?: boolean
}

const ProductGrid = ({
  product,
  tag,
  className,
  isShowColor = true,
  isShowPrice = true,
  isShowAddCart = true
}: IProductGridProps) => {
  const [colorData, setColorData] = useState<IColor>(product.variantAttributeTypes?.color?.[0] ?? Object)
  const variantDataByColor = product.variant.find((v) => v.variantAttributeValue?.colorId === colorData.id)

  const handleGetColor = (value: number) => {
    const data = product.variantAttributeTypes!.color.find((color) => color.id === value)
    if (data) {
      setColorData(data)
    }
  }
  const handleAddCart = (value?: number) => {
    console.log(value)
  }
  useEffect(() => {}, [])
  return (
    <>
      {Object.keys(product).length > 0 ? (
        <div className={`${className} space-y-1`}>
          <div className='relative group transition-all duration-500 ease-linear overflow-hidden max-h-80'>
            <Link to='/'>
              <img
                src={colorData.thumbnail}
                alt={product.name}
                className={`object-cover rounded-md h-full ${isShowAddCart ? 'group-hover:blur-sm' : ''}`}
              />
              <div className={`absolute left-2 right-2 top-1 ${isShowAddCart ? 'group-hover:blur-sm' : ''}`}>
                <div className={`flex items-center justify-between `}>
                  <div className='flex items-center'>
                    <span className='lg:text-sm md:text-xs sm:text-2xs text-3xs'>{product.rate?.starAvg}</span>
                    <FontAwesomeIcon icon={faStar} className='lg:text-xs md:text-2xs sm:text-3xs text-4xs' />
                    <span className='lg:text-sm md:text-xs sm:text-2xs text-3xs text-blue-primary font-bold'>
                      ({product.rate?.count})
                    </span>
                  </div>
                  {tag ? (
                    <Tag title={product.tag.find((t) => t.id === tag)?.name || ''} />
                  ) : (
                    <Tag title={product.tag[0]?.name || ''} />
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
                  {product?.variant.map((v) => {
                    if (v.variantAttributeValue?.colorId === colorData.id) {
                      return (
                        <Button
                          key={v.id}
                          onClick={handleAddCart}
                          color='white'
                          textColor='black'
                          type='button'
                          value={v.id}
                          className='w-full lg:h-10 md:h-9 sm:h-8 h-7  lg:text-base md:text-sm text-xs rounded-md hover:bg-black hover:text-white'
                        >
                          {
                            product.variantAttributeTypes?.size.find((s) => s.id === v.variantAttributeValue?.sizeId)
                              ?.name
                          }
                        </Button>
                      )
                    }
                  })}
                </div>
              </div>
            )}
          </div>
          {isShowColor && Object.keys(Object(colorData)).length > 0 && (
            <RadioColorGroup
              options={product.variantAttributeTypes?.color || []}
              name={product.name + product.id}
              onChange={handleGetColor}
              classNameItems='lg:w-9 lg:h-5 md:w-8.5 md:h-4.5 sm:w-8 sm:h-4 w-7.5 h-3.5'
            />
          )}
          <p className='max-w-full truncate lg:text-sm md:text-xs sm:text-2xs text-3xs font-normal'>
            <Link to={'/'}>{product.name}</Link>
          </p>

          {isShowPrice && (
            <div className='space-x-2 flex items-center'>
              <IntlProvider locale='vi-VN'>
                {product.discount && (
                  <>
                    <span className='font-semibold lg:text-sm md:text-xs sm:text-2xs text-3xs'>
                      <FormattedNumber
                        value={Math.trunc(variantDataByColor!.price * (1 - product.discount.discount / 100))}
                        style='currency'
                        currency='VND'
                      />
                    </span>
                    <span className='px-1 py-0.5 bg-blue-primary text-white lg:text-xs md:text-2xs sm:text-3xs text-4xs rounded-md font-bold'>
                      -{product.discount.discount}%
                    </span>
                    <span className='font-semibold lg:text-sm md:text-xs sm:text-2xs text-3xs text-gray-text line-through'>
                      <FormattedNumber value={variantDataByColor!.price} style='currency' currency='VND' />
                    </span>
                  </>
                )}
              </IntlProvider>
            </div>
          )}
        </div>
      ) : (
        <div>Hello</div>
      )}
    </>
  )
}

export default ProductGrid