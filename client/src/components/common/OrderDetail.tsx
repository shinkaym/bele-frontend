import React from 'react'
import variantBlackThumbnail from '@/assets/images/product/shirt_black.webp'
import ButtonCustom from './ButtonCustom'

interface OrderItem {
  id: string
  name: string
  variant: string
  quantity: number
  price: number
  image: string
}

interface OrderDetails {
  orderDate: string
  recipientName: string
  email: string
  phone: string
  paymentMethod: string
  shippingAddress: string
  items: OrderItem[]
}

const OrderDetail: React.FC = () => {
  const orderDetails: OrderDetails = {
    orderDate: '10:11 04.10.2023',
    recipientName: 'Khoa Pham',
    email: 'khoapham123@gmail.com',
    phone: '0909123654',
    paymentMethod: 'COD',
    shippingAddress: 'Bien Hoa, Dong Nai',
    items: [
      {
        id: '1',
        name: "Men's Polo Shirt",
        variant: 'Brown/ 2XL',
        quantity: 2,
        price: 100,
        image: variantBlackThumbnail
      },
      {
        id: '2',
        name: "Men's Polo Shirt",
        variant: 'Brown/ 2XL',
        quantity: 2,
        price: 100,
        image: variantBlackThumbnail
      },
      {
        id: '3',
        name: "Men's Polo Shirt",
        variant: 'Brown/ 2XL',
        quantity: 2,
        price: 100,
        image: variantBlackThumbnail
      },
      {
        id: '4',
        name: "Men's Polo Shirt",
        variant: 'Brown/ 2XL',
        quantity: 2,
        price: 100,
        image: variantBlackThumbnail
      }
    ]
  }

  const total = orderDetails.items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className='w-full max-w-4xl mx-auto bg-white border border-black rounded-lg'>
      <div className='p-6'>
        <div className='grid gap-4 mb-6'>
          <div className='grid grid-cols-[200px_1fr] gap-1'>
            <div>
              <p className='text-sm font-medium'>Ngày đặt hàng:</p>
              <p className='text-sm font-medium'>Tên người nhận:</p>
              <p className='text-sm font-medium'>Email:</p>
              <p className='text-sm font-medium'>Số điện thoại:</p>
              <p className='text-sm font-medium'>Phương thức thanh toán:</p>
              <p className='text-sm font-medium'>Địa chỉ nhận hàng:</p>
            </div>
            <div>
              <p className='text-sm'>{orderDetails.orderDate}</p>
              <p className='text-sm'>{orderDetails.recipientName}</p>
              <p className='text-sm'>{orderDetails.email}</p>
              <p className='text-sm'>{orderDetails.phone}</p>
              <p className='text-sm'>{orderDetails.paymentMethod}</p>
              <p className='text-sm'>{orderDetails.shippingAddress}</p>
            </div>
          </div>
        </div>

        <table className='w-full'>
          <thead>
            <tr className='bg-black text-white'>
              <th className='text-center'>Sản phẩm</th>
              <th className='text-center'>Số lượng</th>
              <th className='text-center'>Giá tiền</th>
              <th className='text-center'>Tổng giá tiền</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.items.map((item) => (
              <tr key={item.id} className='border-t'>
                <td className='py-4'>
                  <div className='flex items-center gap-4'>
                    <img src={item.image} alt={item.name} width={120} height={120} className='rounded-md' />
                    <div>
                      <div>{item.name}</div>
                      <div className='text-sm text-gray-500'>{item.variant}</div>
                    </div>
                  </div>
                </td>
                <td className='text-center'>{item.quantity}</td>
                <td className='text-center'>${item.price}</td>
                <td className='text-center'>${item.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className='w-full flex justify-end'>
          <div className='flex flex-col items-start'>
            <div className='flex justify-between w-full gap-20'>
              <span>Discount</span>
              <span>$0</span>
            </div>
            <div className='flex justify-between w-full gap-20'>
              <span>Shipping Fee</span>
              <span>Free</span>
            </div>
            <div className='flex justify-between w-full gap-20 text-lg font-medium'>
              <span>Total</span>
              <span>${total}</span>
            </div>
          </div>
        </div>
      </div>
      <div className='flex justify-end p-6'>
        <ButtonCustom inverted>Huỷ đơn hàng</ButtonCustom>
      </div>
    </div>
  )
}

export default OrderDetail
