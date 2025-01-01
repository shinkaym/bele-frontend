import Breadcrumb from '@/components/common/Breadcrumbs/Breadcrumb'
import Button from '@/components/common/Button'
import { DeleteIcon } from '@/components/icons'
import PlusIcon from '@/components/icons/PlusIcon'
import SubIcon from '@/components/icons/SubIcon'
import React, { useState, useEffect } from 'react'
import { z } from 'zod'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Input from '@/components/common/Forms/Input'
import Textarea from '@/components/common/Textarea'
import SelectGroup from '@/components/common/Forms/SelectGroup'
import Loader from '@/components/common/Loader'
import { EOrderStatus } from '@/models/enums/status'
import orderApi from '@/apis/modules/order.api'
import { UToast } from '@/utils/swal'
import { EToastOption } from '@/models/enums/option'
import { useParams } from 'react-router-dom'

const orderSchema = z
  .object({
    id: z.number(),
    email: z.string().min(1, 'Email is required'),
    name: z.string().min(1, 'Name is required'),
    phoneNumber: z.string().min(1, 'Phone Number is required'),
    address: z.string().min(1, 'Address is required'),
    note: z.string().optional(),
    payMethod: z.string().min(1, 'Payment Method is required'),
    shipDate: z.string().min(1, 'Ship Date is required'),
    receiveDate: z.string().min(1, 'Receive Date is required'),
    status: z.number(),
    totalMoney: z.number(),
    products: z
      .array(
        z.object({
          id: z.number(),
          name: z.string(),
          image: z.string(),
          color: z.object({
            id: z.number(),
            name: z.string(),
            value: z.string()
          }),
          size: z.object({
            id: z.number(),
            name: z.string(),
            value: z.string()
          }),
          quantity: z.number(),
          price: z.number()
        })
      )
      .min(1, 'Products list cannot be empty')
  })
  .superRefine(({ shipDate, receiveDate }, ctx) => {
    if (new Date(receiveDate) <= new Date(shipDate)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Receive Date must be greater than Ship Date',
        path: ['receiveDate']
      })
    }
  })

type Order = z.infer<typeof orderSchema>

const OrderEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>()

  const [order, setOrder] = useState<Order | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState<number[]>([])

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<Order>({
    resolver: zodResolver(orderSchema)
  })

  useEffect(() => {
    const fetchOrder = async () => {
      if (id) {
        const response = await orderApi.detail({ id: parseInt(id) })
        const order = response.data
        setOrder(order)
        reset(order)
      } else {
        console.error('Order ID is undefined')
      }
    }
    fetchOrder()
  }, [reset])

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const onSubmit = (data: Order) => {
    setOrder(data)
    setIsEditing(false)
  }

  const handleSave = async () => {
    if (order && order.products.length === 0) {
      alert('Products list cannot be empty')
      return
    }

    try {
      if (order) {
        const transOrder = {
          ...order,
          note: order.note || '',
          products: order.products.map((product) => ({
            ...product,
            color: product.color.id,
            size: product.size.id
          }))
        }
        const response = await orderApi.update({ id: order.id, data: transOrder })
        if (response.status === 200) {
          UToast(EToastOption.SUCCESS, 'Update order successfully!')
          window.location.reload()
        } else UToast(EToastOption.WARNING, 'Update order failure!')
      }
      setIsEditing(false)
    } catch (error) {
      UToast(EToastOption.WARNING, 'Update order failure!')
    }
  }

  const handleQuantityChange = (productId: number, quantity: number) => {
    if (order) {
      const updatedProducts = order.products.map((prod) => (prod.id === productId ? { ...prod, quantity } : prod))
      const updatedTotal = updatedProducts.reduce((total, prod) => total + prod.quantity * prod.price, 0)
      setOrder({
        ...order,
        products: updatedProducts,
        totalMoney: updatedTotal
      })
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (order) {
      if (checked) {
        setSelectedProducts(order.products.map((prod) => prod.id))
      } else {
        setSelectedProducts([])
      }
    }
  }

  const handleProductCheck = (productId: number, checked: boolean) => {
    if (checked) {
      setSelectedProducts([...selectedProducts, productId])
    } else {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId))
    }
  }

  const handleRemoveAll = () => {
    if (order) {
      const updatedProducts = order.products.filter((prod) => !selectedProducts.includes(prod.id))
      const updatedTotal = updatedProducts.reduce((total, prod) => total + prod.quantity * prod.price, 0)
      setOrder({
        ...order,
        products: updatedProducts,
        totalMoney: updatedTotal
      })
      setSelectedProducts([])
    }
  }

  const statusOptions = [
    { value: 1, label: EOrderStatus.PENDING },
    { value: 2, label: EOrderStatus.DELIVERED },
    { value: 3, label: EOrderStatus.SHIPPED },
    { value: 4, label: EOrderStatus.CANCELED }
  ]

  return !order ? (
    <Loader />
  ) : (
    <div className='flex flex-col gap-1'>
      <Breadcrumb pageName='Edit Order' parentPageName='Order' parentTo='/tables/order' />
      {/* Order info */}
      <div className='p-4 rounded mb-4 hover:bg-gray-200 cursor-pointer'>
        <div className='flex gap-4' onClick={handleEditClick}>
          <div className='w-1/2 md:w-1/4'>
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
            <p>
              <strong>Status:</strong>
            </p>
          </div>
          <div className='w-1/2 md:w-3/4'>
            <p>{order.email}</p>
            <p>{order.name}</p>
            <p>{order.phoneNumber}</p>
            <p>{order.address}</p>
            <p>{order.note}</p>
            <p>{order.payMethod}</p>
            <p>{order.shipDate}</p>
            <p>{order.receiveDate}</p>
            <p>{statusOptions.find((option) => option.value === order.status)?.label}</p>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4'>
          <div className='bg-white p-6 rounded shadow w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 overflow-y-auto scrollbar-hidden max-h-550'>
            <h3 className='text-lg font-bold mb-4'>Edit Order</h3>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
              {/* Row 1 */}
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div>
                  <Controller
                    name='name'
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                      <Input {...field} type='text' label='Name' className='mb-6' error={errors.name?.message} />
                    )}
                  />
                </div>
                <div>
                  <Controller
                    name='phoneNumber'
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                      <Input
                        {...field}
                        type='text'
                        label='Phone Number'
                        className='mb-6'
                        error={errors.phoneNumber?.message}
                      />
                    )}
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div>
                <Controller
                  name='address'
                  control={control}
                  defaultValue=''
                  render={({ field }) => (
                    <Input {...field} type='text' label='Address' className='mb-6' error={errors.address?.message} />
                  )}
                />
              </div>

              {/* Row 3 */}
              <div>
                <Controller
                  name='note'
                  control={control}
                  defaultValue=''
                  render={({ field }) => (
                    <Textarea {...field} className='mb-6' error={errors.note?.message} label='Note' />
                  )}
                />
              </div>

              {/* Row 4 */}
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div>
                  <Controller
                    name='shipDate'
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                      <Input
                        {...field}
                        type='date'
                        label='Ship Date'
                        className='mb-6'
                        error={errors.shipDate?.message}
                      />
                    )}
                  />
                </div>
                <div>
                  <Controller
                    name='receiveDate'
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                      <Input
                        {...field}
                        type='date'
                        label='Receive Date'
                        className='mb-6'
                        error={errors.receiveDate?.message}
                      />
                    )}
                  />
                </div>
              </div>

              {/* Row 5 */}
              <div>
                <Controller
                  name='status'
                  control={control}
                  defaultValue={1}
                  render={({ field }) => (
                    <SelectGroup
                      {...field}
                      label='Status'
                      options={statusOptions}
                      value={field.value}
                      onChange={(value) => field.onChange(Number(value))}
                      error={errors.status?.message}
                    />
                  )}
                />
              </div>

              <div className='flex justify-end mt-4 gap-2'>
                <button
                  type='button'
                  className='bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 mt-3 rounded'
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button type='submit' className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 mt-3 rounded'>
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/*Product list */}
      <div>
        <div className='flex mb-2 px-6'>
          {/* Headers */}
          <div className='w-2/4 md:w-1/3'>
            <div className='flex items-center mb-2'>
              <div className='flex items-center'>
                <input
                  id='selectAll'
                  type='checkbox'
                  checked={selectedProducts.length === order.products.length}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className='mr-2'
                />
                <label htmlFor='selectAll' className='cursor-pointer'>
                  ALL <span className='hidden xl:inline'>PRODUCT</span>
                </label>
                <span className='mx-3'>|</span>
                <label className='cursor-pointer' onClick={handleRemoveAll}>
                  REMOVE <span className='hidden xl:inline'>ALL</span>
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
          {order.products.map((product) => (
            <div key={product.id} className='flex items-center justify-between p-2 mb-2 border-b'>
              {/* Column 1 */}
              <div className='w-2/4 md:w-1/3 flex items-center gap-3'>
                <input
                  type='checkbox'
                  checked={selectedProducts.includes(product.id)}
                  onChange={(e) => handleProductCheck(product.id, e.target.checked)}
                />
                <img src={product.image} alt={product.name} className='bg-boxdark object-cover w-18' />
                <div>
                  <p className='font-bold text-black'>{product.name}</p>
                  <p className='italic'>
                    {product.color.name}/{product.size.name}
                  </p>
                  <button
                    className='text-black mt-1 flex items-center gap-1'
                    onClick={() => {
                      setOrder({
                        ...order,
                        products: order.products.filter((p) => p.id !== product.id),
                        totalMoney: order.totalMoney - product.quantity * product.price
                      })
                      setSelectedProducts(selectedProducts.filter((id) => id !== product.id))
                    }}
                  >
                    <DeleteIcon className='w-4 h-4' />
                    Remove
                  </button>
                </div>
              </div>
              {/* Column 2 */}
              <div className='w-1/4 md:w-1/3 flex justify-center'>
                <div className='w-fit flex items-center justify-center border rounded-full'>
                  <button
                    onClick={() => handleQuantityChange(product.id, product.quantity - 1)}
                    className='w-8 h-8 flex items-center justify-center font-medium text-2xl'
                  >
                    <SubIcon className='w-4' />
                  </button>
                  <input
                    type='text'
                    value={product.quantity}
                    onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                    className='w-10 p-2 border-0 outline-none text-center'
                  />
                  <button
                    onClick={() => handleQuantityChange(product.id, product.quantity + 1)}
                    className='w-8 h-8 flex items-center justify-center font-medium text-2xl'
                  >
                    <PlusIcon className='w-4' />
                  </button>
                </div>
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
        <Button type='button' className='max-h-12' onClick={handleSave}>
          Edit
        </Button>
      </div>
    </div>
  )
}

export default OrderEdit
