import React, { useEffect, useState } from 'react'
import { IOrder } from '@/models/interfaces'
import OrderItem from '@/components/common/OrderItem'
import orderApi from '@/apis/modules/order.api'
import { UToast } from '@/utils/swal'
import { EToastOption } from '@/models/enum'
import Swal from 'sweetalert2'
// import { mockOrders } from '@/constants'

const OrderHistoryPage: React.FC = () => {
  const [orders, setOrders] = useState<IOrder[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const res = await orderApi.getAll()
      const orderList: Array<{ id: number; status: number }> = Array.isArray(res.data?.orders) ? res.data.orders : []

      const detailedOrders = await Promise.all(
        orderList.map(async (order: { id: number; status: number }) => {
          const detailRes = await orderApi.getOne(order.id)
          console.log('🚀 ~ orderList.map ~ detailRes:', detailRes)
          return detailRes.data
        })
      )

      setOrders(detailedOrders.filter((order): order is IOrder => order !== undefined))
      // setOrders(mockOrders)
    } catch {
      UToast(EToastOption.ERROR, 'Đã có lỗi xảy ra')
    } finally {
      setLoading(false)
    }
  }

  const handleCancelOrder = async (orderId: number) => {
    Swal.fire({
      title: 'Bạn có chắc chắn?',
      text: 'Hành động này không thể hoàn tác!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy',
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await orderApi.cancel(orderId)
          UToast(EToastOption.SUCCESS, 'Đã huỷ đơn hàng thành công')
          fetchOrders()
        } catch {
          UToast(EToastOption.ERROR, 'Đã có lỗi xảy ra')
        }
      }
    })
  }

  if (loading) {
    return <p>Đang tải dữ liệu...</p>
  }

  return (
    <div>
      <h3 className='font-medium text-3xl tracking-wider mb-3 lg:mb-5'>Lịch sử đơn hàng</h3>
      {orders.length === 0 ? (
        <p>Không có đơn hàng nào.</p>
      ) : (
        <div className='space-y-4'>
          {orders.map((order) => (
            <OrderItem key={order.id} order={order} onCancelOrder={handleCancelOrder} />
          ))}
        </div>
      )}
    </div>
  )
}

export default OrderHistoryPage
