import React, { useState } from 'react'
import { IOrder } from '@/models/interfaces'
import { orderStatus } from '@/constants'
import { FormattedNumber } from 'react-intl'
import ButtonCustom from './ButtonCustom'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { formatDate } from '@/utils'

interface OrderItemProps {
  order: IOrder
  onCancelOrder: (orderId: number) => void
}

const OrderItem: React.FC<OrderItemProps> = ({ order, onCancelOrder }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const status = orderStatus.find((s) => s.value === order.status)
  const canCancel = order.status === 1 || order.status === 2

  const calculateSubtotal = () => {
    return order.variants.reduce((total, item) => {
      return total + item.price * item.quantity
    }, 0)
  }

  const calculateDiscount = () => {
    return order.variants.reduce((total, item) => {
      return total + item.price * (item.discount / 100) * item.quantity
    }, 0)
  }

  const calculateTotal = () => {
    const subtotal = calculateSubtotal()
    const discount = calculateDiscount()
    return subtotal - discount
  }

  return (
    <div className='border border-black rounded-lg p-4 cursor-pointer' onClick={() => setIsExpanded(!isExpanded)}>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-2'>
          <h2 className='text-lg font-semibold'>Đơn hàng #{order.id}</h2>
          <span className={`text-sm px-2 py-1 rounded-full ${status?.className}`}>{status?.title}</span>
        </div>
        <button className='text-blue-500 hover:text-blue-700'>
          {isExpanded ? (
            <FontAwesomeIcon icon={faChevronUp} className='text-black' />
          ) : (
            <FontAwesomeIcon icon={faChevronDown} className='text-black' />
          )}
        </button>
      </div>

      {isExpanded && (
        <div className='mt-4'>
          <div className='space-y-2 mb-12'>
            <p>
              <strong>Tên:</strong> {order.name}
            </p>
            <p>
              <strong>Số điện thoại:</strong> {order.phoneNumber}
            </p>
            <p>
              <strong>Địa chỉ:</strong> {order.address}
            </p>
            <p>
              <strong>Ghi chú:</strong> {order.note || 'Không có'}
            </p>
            <p>
              <strong>Phương thức thanh toán:</strong> {order.payMethod}
            </p>
            <p>
              <strong>Ngày giao hàng:</strong> {order.status > 2 ? formatDate(order.shipDate) : 'Chưa có'}
            </p>
            <p>
              <strong>Ngày nhận hàng:</strong> {order.status > 2 ? formatDate(order.receiveDate) : 'Chưa có'}
            </p>
          </div>

          <div className='mt-4 '>
            <div className='grid grid-cols-4 gap-4 font-bold border-b pb-2 text-md text-black'>
              <div className='col-span-2'>Sản phẩm</div>
              <div className='hidden md:block text-center'>Số lượng</div>
              <div className='md:hidden text-center'>SL</div>
              <div className='text-center'>Giá</div>
            </div>

            {order.variants.map((product) => (
              <div key={product.id} className='grid grid-cols-4 gap-4 py-2 border-b'>
                <div className='col-span-2'>
                  <Link to={`/product/detail/${product.slug}`} className='flex items-center'>
                    <img src={product.thumbnail} alt='' className='w-14 rounded-md' />
                    <div className='flex flex-col justify-between ml-3'>
                      <p className='text-md font-semibold max-w-full'>{product.name}</p>
                      <p className='text-sm'>
                        <span>{product.attribute[0].Color}</span> / <span>{product.attribute[1].Size}</span>
                      </p>
                    </div>
                  </Link>
                </div>

                <div className='flex items-center w-full justify-center'>
                  <p>{product.quantity}</p>
                </div>

                <div className='flex flex-col items-center w-full justify-center'>
                  <p className='text-gray-900 font-medium'>
                    {product.discount > 0 ? (
                      <FormattedNumber
                        value={product.price * (1 - 1 / product.discount)}
                        style='currency'
                        currency='VND'
                      />
                    ) : (
                      <FormattedNumber value={product.price} style='currency' currency='VND' />
                    )}
                  </p>
                  <p className='line-through text-gray-400'>
                    {product.discount > 0 && <FormattedNumber value={product.price} style='currency' currency='VND' />}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className='flex flex-col gap-3 text-right mt-4'>
            <p>
              <strong>Tạm tính:</strong> <FormattedNumber value={calculateSubtotal()} style='currency' currency='VND' />
            </p>
            <p>
              <strong>Giảm giá:</strong> <FormattedNumber value={calculateDiscount()} style='currency' currency='VND' />
            </p>
            <p>
              <strong>Tổng cộng:</strong> <FormattedNumber value={calculateTotal()} style='currency' currency='VND' />
            </p>
          </div>

          {canCancel && (
            <ButtonCustom onClick={() => onCancelOrder(order.id)} className='ml-auto mt-5'>
              Huỷ đơn hàng
            </ButtonCustom>
          )}
        </div>
      )}
    </div>
  )
}

export default OrderItem
