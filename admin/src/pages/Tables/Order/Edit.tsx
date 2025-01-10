import React, { useState, useEffect } from 'react'
import Breadcrumb from '@/components/common/Breadcrumbs/Breadcrumb'
import Button from '@/components/common/Button'
import SelectGroup from '@/components/common/Forms/SelectGroup'
import Loader from '@/components/common/Loader'
import { EOrderStatus } from '@/models/enums/status'
import orderApi from '@/apis/modules/order.api'
import { UToast } from '@/utils/swal'
import { EToastOption } from '@/models/enums/option'
import { useParams } from 'react-router-dom'
import { IOrder } from '@/models/interfaces/order'
import { formatDate } from '@/utils'
import { orderStatus } from '@/constants'

const OrderEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [order, setOrder] = useState<IOrder | null>(null)
  const [status, setStatus] = useState<number | string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        if (id) {
          setIsLoading(true)
          const res = await orderApi.detail({ id: parseInt(id) })
          if (res.status === 200) {
            if (res.data) {
              setOrder(res.data)
              setStatus(res.data.status)
            }
          } else {
            UToast(EToastOption.ERROR, res.message)
          }
        } else {
          UToast(EToastOption.ERROR, 'Order ID is undefined.')
        }
      } catch (error) {
        UToast(EToastOption.ERROR, 'An unexpected error occurred.')
      } finally {
        setIsLoading(false)
      }
    }
    fetchOrder()
  }, [id])

  const handleStatusChange = (value: number) => {
    setStatus(value)
  }

  const handleSave = async () => {
    try {
      if (order) {
        const res = await orderApi.updateStatus({ id: order.id, status: Number(status) })
        if (res.status === 200) {
          UToast(EToastOption.SUCCESS, res.message)
        } else {
          UToast(EToastOption.ERROR, res.message)
        }
      }
    } catch (error) {
      UToast(EToastOption.ERROR, 'An unexpected error occurred.')
    } finally {
      setIsLoading(false)
    }
  }

  const statusOptions = [
    { value: -1, label: EOrderStatus.CANCELED },
    { value: 1, label: EOrderStatus.PENDING_CONFIRMATION },
    { value: 2, label: EOrderStatus.PENDING },
    { value: 3, label: EOrderStatus.DELIVERED },
    { value: 4, label: EOrderStatus.SHIPPED }
  ]

  if (isLoading) {
    return <Loader />
  }

  return isLoading ? (
    <Loader />
  ) : (
    order && (
      <div className='flex flex-col gap-1'>
        <Breadcrumb pageName='Edit Order' parentPageName='Order' parentTo='/tables/order' />
        {/* Order info */}
        <div className='p-4 rounded mb-4'>
          <div className='flex gap-4'>
            <div className='w-1/3 md:w-1/4'>
              <p>
                <strong>Email:</strong>
              </p>
              <p>
                <strong>Name:</strong>
              </p>
              <p>
                <strong>Phone Number:</strong>
              </p>
              <p>
                <strong>Address:</strong>
              </p>
              <p>
                <strong>Note:</strong>
              </p>
              <p>
                <strong>Payment Method:</strong>
              </p>
              <p>
                <strong>Ship Date:</strong>
              </p>
              <p>
                <strong>Receive Date:</strong>
              </p>
              {(order.status === -1 || order.status === 4) && (
                <p>
                  <strong>Status:</strong>
                </p>
              )}
            </div>
            <div className='w-1/3 md:w-1/4'>
              <p className='whitespace-nowrap'>{order.email || '\u00A0'}</p>
              <p className='whitespace-nowrap'>{order.name || '\u00A0'}</p>
              <p className='whitespace-nowrap'>{order.phoneNumber || '\u00A0'}</p>
              <p className='whitespace-nowrap'>{order.address || '\u00A0'}</p>
              <p className='whitespace-nowrap'>{order.note || '\u00A0'}</p>
              <p className='whitespace-nowrap'>{order.payMethod || '\u00A0'}</p>
              <p className='whitespace-nowrap'>{formatDate(order.shipDate) || '\u00A0'}</p>
              <p className='whitespace-nowrap'>{formatDate(order.receiveDate) || '\u00A0'}</p>
              {(order.status === -1 || order.status === 4) && (
                <p className='whitespace-nowrap'>
                  {orderStatus.find((e) => e.value === order.status)?.title || '\u00A0'}
                </p>
              )}
            </div>
            {order.status !== -1 && order.status !== 4 && (
              <div className='w-1/3 md:w-2/4'>
                <SelectGroup
                  className='w-[200px]'
                  options={statusOptions}
                  value={status}
                  onChange={(value) => handleStatusChange(Number(value))}
                />
              </div>
            )}
          </div>
        </div>

        {/* Product list */}
        <div>
          <div className='flex mb-2 px-6'>
            {/* Headers */}
            <div className='w-2/4 md:w-1/3'>
              <div className='flex items-center mb-2'>
                <div className='flex items-center'>
                  <label htmlFor='selectAll' className='cursor-pointer'>
                    PRODUCT
                  </label>
                </div>
              </div>
            </div>
            <div className='w-1/4 md:w-1/3 text-center'>
              <p>QUANTITY</p>
            </div>
            <div className='w-1/4 md:w-1/3 text-right'>
              <p>PRICE</p>
            </div>
          </div>
          <div className='bg-white p-4 rounded shadow overflow-y-auto max-h-550'>
            {order.variants &&
              order.variants.map((product) => (
                <div key={product.id} className='flex items-center justify-between p-2 mb-2 border-b'>
                  {/* Column 1 */}
                  <div className='w-2/4 md:w-1/3 flex items-center gap-3'>
                    <img src={product.thumbnail} alt={product.name} className='bg-boxdark object-cover w-18' />
                    <div>
                      <p className='font-bold text-black'>{product.name}</p>
                      <p className='italic'>
                        {product.attribute[0].Color}/{product.attribute[1].Size}
                      </p>
                    </div>
                  </div>
                  {/* Column 2 */}
                  <div className='w-1/4 md:w-1/3 flex justify-center'>
                    <div className='w-fit flex items-center justify-center rounded-full'>{product.quantity}</div>
                  </div>
                  {/* Column 3 */}
                  <div className='w-1/4 md:w-1/3 text-right'>
                    <p className='mt-1'>{product.price}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Total */}
        <div className='mt-4 w-1/3 ml-auto mr-6'>
          <div className='flex justify-between border-y-2 py-4 mb-4'>
            <div className='flex flex-col gap-1'>
              <p>
                <strong>Subtotal</strong>
              </p>
              <p>
                <strong>Discount</strong>
              </p>
              <p>
                <strong>Shipping Fee</strong>
              </p>
            </div>
            <div className='flex flex-col gap-1'>
              <p className='text-right'>{order.totalMoney}$</p>
              <p className='text-right'>0$</p>
              <p className='text-right'>0$</p>
            </div>
          </div>
          <div className='flex justify-between'>
            <p>
              <strong>Total</strong>
            </p>
            <p className='text-right'>{order.totalMoney}$</p>
          </div>
        </div>

        {/* Button */}
        <div className='grid grid-cols-2 gap-4 mt-10'>
          <Button type='link' to='/tables/order' color='secondary' className='max-h-12'>
            Back
          </Button>
          {order.status !== -1 && order.status !== 4 && (
            <Button type='button' className='max-h-12' onClick={handleSave}>
              Save
            </Button>
          )}
        </div>
      </div>
    )
  )
}

export default OrderEdit
