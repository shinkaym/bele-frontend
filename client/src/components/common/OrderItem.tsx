import React, { useState } from 'react'
import { IOrder } from '@/models/interfaces'
import { orderStatus } from '@/constants'
import { FormattedNumber } from 'react-intl'
import ButtonCustom from './ButtonCustom'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

interface OrderItemProps {
  order: IOrder
  onCancelOrder: (orderId: number) => void
}

const OrderItem: React.FC<OrderItemProps> = ({ order, onCancelOrder }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const status = orderStatus.find((s) => s.value === order.status)
  const canCancel = order.status === 1 || order.status === 2

  return (
    <div className='border border-black rounded-lg p-4'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-2'>
          <h2 className='text-lg font-semibold'>Đơn hàng #{order.id}</h2>
          <span className={`text-sm px-2 py-1 rounded-full ${status?.className}`}>{status?.title}</span>
        </div>
        <button onClick={() => setIsExpanded(!isExpanded)} className='text-blue-500 hover:text-blue-700'>
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
              <strong>Ngày giao hàng:</strong> {order.shipDate}
            </p>
            <p>
              <strong>Ngày nhận hàng:</strong> {order.receiveDate}
            </p>
          </div>

          <div className='mt-4 '>
            <div className='grid grid-cols-4 gap-4 font-bold border-b pb-2 text-md text-black'>
              <div className='col-span-2'>Sản phẩm</div>
              <div className='hidden md:block text-center'>Số lượng</div>
              <div className='md:hidden text-center'>SL</div>
              <div className='text-center'>Giá</div>
            </div>

            {order.products.map((product) => (
              <div key={product.id} className='grid grid-cols-4 gap-4 py-2 border-b'>
                <div className='col-span-2'>
                  <Link to={`/product/detail/${product.slug}`} className='flex items-center'>
                    <img src={product.image} alt='' className='w-14 rounded-md' />
                    <div className='flex flex-col justify-between ml-3'>
                      <p className='text-md font-semibold max-w-full'>{product.name}</p>
                      <p className='text-sm'>
                        <span>{product.color}</span> / <span>{product.size}</span>
                      </p>
                    </div>
                  </Link>
                </div>

                <div className='flex items-center w-full justify-center'>
                  <p>{product.quantity}</p>
                </div>

                <div className='flex flex-col items-center'>
                  <p className='line-through text-gray-400'>
                    <FormattedNumber value={product.price} style='currency' currency='VND' />
                  </p>
                  <p className='text-gray-900 font-medium'>
                    <FormattedNumber value={product.disPrice} style='currency' currency='VND' />
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className='flex flex-col gap-3 text-right mt-4'>
            <p>
              <strong>Tạm tính:</strong>{' '}
              <FormattedNumber value={order.totalMoney + order.totalDiscount} style='currency' currency='VND' />
            </p>
            <p>
              <strong>Giảm giá:</strong> <FormattedNumber value={order.totalDiscount} style='currency' currency='VND' />
            </p>
            <p>
              <strong>Tổng cộng:</strong> <FormattedNumber value={order.totalMoney} style='currency' currency='VND' />
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
