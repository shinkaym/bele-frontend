import { ICart } from '@/models/interfaces'
import { addToCart } from '@/redux/slices/cart.slice'
import { AppDispatch } from '@/redux/store'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import { FormattedNumber, IntlProvider } from 'react-intl'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

interface ICartDropDownProps {
  cart:ICart
}

const CartDropDown: React.FunctionComponent<ICartDropDownProps> = ({cart}) => {
  const dispatch = useDispatch<AppDispatch>()
  return (
    <>
      <div className='flex items-center justify-between text-sm'>
        <p>
          <span>{cart?.cartItems.length}</span> sản phẩm
        </p>
        <Link to={'/cart'} className='text-blue-primary'>
          Xem tất cả
        </Link>
      </div>
      <ul className='space-y-2 flex-1'>
        {cart.cartItems.map((item) => (
          <li className='flex gap-3'>
            <img src={item.thumbnail} alt={item.productName} className='w-25 object-cover rounded-md' />
            <div className='flex items-center flex-1'>
              <div className='flex justify-between flex-1'>
                <div>
                  <div className='text-sm mb-2'>
                    <p className='font-semibold max-w-full'>{item.productName}</p>
                    <p className='text-xs'>
                      <span>{item.attributes[0].Color}</span> / <span>{item.attributes[1].Size}</span>
                    </p>
                  </div>
                  <div>
                    <div className='space-x-2'>
                      <IntlProvider locale='vi-VN'>
                        <span className='text-lg font-medium'>
                          <FormattedNumber
                            value={
                              item.discount === 0
                                ? item.productPrice
                                : Math.trunc(item.productPrice * (1 - item.discount / 100))
                            }
                            style='currency'
                            currency='VND'
                          />
                        </span>
                        {item.discount === 0 ? (
                          ''
                        ) : (
                          <span
                            className={`font-semibold lg:text-sm md:text-xs sm:text-2xs text-3xs text-gray-text line-through`}
                          >
                            <FormattedNumber value={item.productPrice} style='currency' currency='VND' />
                          </span>
                        )}
                      </IntlProvider>
                    </div>

                    <p className='text-sm'>
                      x<span className='font-medium'>{item.quantity}</span>
                    </p>
                  </div>
                </div>
                <FontAwesomeIcon
                  onClick={() => dispatch(addToCart({variantId:item.productId,quantity:-item.quantity}))}
                  icon={faCircleXmark}
                  className='text-zinc-500 text-lg cursor-pointer'
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className='flex items-center justify-between lg:text-base md:text-sm sm:text-xs text-2xs sticky bottom-0 inset-x-0 bg-white py-4 text-black z-50'>
        <span>Tổng tiền</span>
        <IntlProvider locale='vi-VN'>
          <span className={`font-semibold`}>
            <FormattedNumber value={cart.totalMoney} style='currency' currency='VND' />
          </span>
        </IntlProvider>
      </div>
    </>
  )
}

export default CartDropDown
