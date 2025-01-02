import { IColor, IProduct } from '@/models/interfaces'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../Button'
import RadioColorGroup from '../RadioColorGroup'

interface IProductGirdProps {
  product: IProduct
  className?: string
}

export const ProductGird = ({ product, className }: IProductGirdProps) => {
  const [colorData, setColorData] = useState<IColor>(product.variantAttributeTypes?.color?.[0] ?? Object)

  const handleGetColor = (value: number) => {
    const data = product.variantAttributeTypes!.color.find((color) => color.id === value)
    if (data) {
      setColorData(data)
    }
  }
  console.log(colorData)
  useEffect(() => {}, [])
  return (
    <>
      {Object.keys(product).length > 0 ? (
        <div className={`${className} space-y-3`}>
          <div className='relative group transition-all duration-500 ease-linear overflow-hidden max-h-80'>
            <Link to='/'>
              <img
                src={colorData.thumbnail}
                alt={product.name}
                className='object-cover rounded-md group-hover:blur-sm h-full'
              />
            </Link>
            <div className='absolute -bottom-40 left-5 right-5 bg-gradient-to-t from-black/10 to-white/40 p-2 rounded-md group-hover:bottom-5  z-50 transition-all duration-300 ease-linear'>
              <p className='font-semibold text-black text-center mb-3 md:font-base font-sm'>Quick Add To Cart</p>
              <div className='grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2'>
                {product?.variant.map((v) => {
                  if (v.variantAttributeValue?.colorId === colorData.id) {
                    return (
                      <Button
                        color='white'
                        textColor='black'
                        type='button'
                        className='w-full xl:h-10 lg:h-9 md:h-8 h-7 text-sm rounded-md hover:bg-black hover:text-white'
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
          </div>
          {Object.keys(Object(colorData)).length > 0 && (
            <RadioColorGroup
              options={product.variantAttributeTypes?.color || []}
              name={product.name + product.id}
              onChange={handleGetColor}
            />
          )}
        </div>
      ) : (
        <div>Hello</div>
      )}
    </>
  )
}
