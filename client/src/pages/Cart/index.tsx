import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { addToCart, fetchCart, removeFromCart, subToCart } from '@/redux/slices/cart.slice'
import { fetchCustomerInfo } from '@/redux/slices/customer.slice'
import Pagination from '@/components/common/Pagination'
import { IOption } from '@/models/interfaces'
import InputCheckout from '@/components/common/Forms/InputCheckout'
import ForwardedCheckboxGroupCheckout from '@/components/common/Forms/CheckboxGroupCheckout'
import SelectGroupCheckout from '@/components/common/Forms/SelectGroupCheckout'
import { IAddress } from '@/models/interfaces'
import { fetchAddresses } from '@/redux/slices/address.slice'
import { z } from 'zod'
import cartApi from '@/apis/modules/cart.api'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { UToast } from '@/utils/swal'
import { EToastOption } from '@/models/enum'
import { FormattedNumber } from 'react-intl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmarkCircle, faSubtract, faPlus } from '@fortawesome/free-solid-svg-icons'
import { calculateDiscount, calculateSubtotal, calculateTotal } from '@/utils'
import { PAGINATION_CONFIG } from '@/constants'
import Swal from 'sweetalert2'
import ForwardedRadioGroupPayMethod from '@/components/common/Forms/RadioGroupPayMethod'
import TextareaCheckout from '@/components/common/Forms/TextareaCheckout'
import ButtonCustom from '@/components/common/ButtonCustom'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const dynamicFormSchema = (useCustomAddress: boolean, addresses: IAddress[]) => {
  return z.object({
    fullName: z.string().min(1, 'Họ và tên là bắt buộc'),
    phoneNumber: z
      .string()
      .min(1, { message: 'Số điện thoại không được để trống' })
      .regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, { message: 'Số điện thoại không đúng định dạng' }),
    address: useCustomAddress || addresses.length < 1 ? z.string().min(1, 'Địa chỉ là bắt buộc') : z.string().optional()
  })
}

type FormData = z.infer<ReturnType<typeof dynamicFormSchema>>

const Cart: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)

  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(-1)
    }
  }, [isAuthenticated, navigate])

  const dispatch = useDispatch<AppDispatch>()
  const [searchParams] = useSearchParams()
  const { data: cart, loading: cartLoading } = useSelector((state: RootState) => state.cart)
  const addresses = useSelector((state: RootState) => state.address.addresses)
  const info = useSelector((state: RootState) => state.customer.info)

  const [currentPage, setCurrentPage] = useState(PAGINATION_CONFIG.DEFAULT_PAGE)
  const [itemsPerPage] = useState(PAGINATION_CONFIG.DEFAULT_CART_LIMIT)
  const [note, setNote] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('COD')
  const [useCustomAddress, setUseCustomAddress] = useState(false)
  const [selectedAddressName, setSelectedAddressName] = useState<string | null>(null)

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(dynamicFormSchema(useCustomAddress, addresses)),
    defaultValues: {
      fullName: info?.fullName || '',
      phoneNumber: info?.phoneNumber || '',
      address: ''
    }
  })

  useEffect(() => {
    dispatch(fetchAddresses())
  }, [])

  useEffect(() => {
    if (!useCustomAddress && addresses.length > 0) {
      const selectedAddress = addresses.find((addr) => addr.isDefault)
      if (selectedAddress) {
        setSelectedAddressName(selectedAddress.name)
        reset({
          fullName: selectedAddress.name,
          phoneNumber: selectedAddress.phoneNumber
        })
      } else {
        setSelectedAddressName(addressOptions[0].value)
        reset({
          fullName: addresses[0].name,
          phoneNumber: addresses[0].phoneNumber
        })
      }
    }
  }, [addresses])

  useEffect(() => {
    dispatch(fetchCart())
    dispatch(fetchCustomerInfo())
    dispatch(fetchAddresses())
  }, [dispatch])

  useEffect(() => {
    const status = searchParams.get('status')
    if (status) {
      if (status === '00') {
        UToast(EToastOption.SUCCESS, 'Thanh toán đơn hàng thành công')
        dispatch(removeFromCart())
      } else {
        UToast(EToastOption.SUCCESS, 'Thanh toán đơn hàng thất bại')
      }
    }
  }, [searchParams])

  useEffect(() => {
    if (info) {
      reset({
        fullName: info.fullName || '',
        phoneNumber: info.phoneNumber || '',
        address: ''
      })
    }
  }, [info, reset])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value)
  }

  const handleUseCustomAddressChange = (values: string[]) => {
    setUseCustomAddress(values.includes('customAddress'))
  }

  const handleAddressChange = (value: string) => {
    const selectedAddress = addresses.find((addr) => addr.name === value)
    if (selectedAddress) {
      setSelectedAddressName(selectedAddress.name)
      reset({
        fullName: selectedAddress.name,
        phoneNumber: selectedAddress.phoneNumber
      })
    }
  }

  const onSubmit = async (data: FormData) => {
    try {
      if (cart.cartItems.length === 0) {
        UToast(EToastOption.ERROR, 'Chưa có sản phẩm trong giỏ hàng')
      } else {
        Swal.fire({
          title: 'Xác nhận đặt hàng',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Xác nhận',
          cancelButtonText: 'Hủy',
          reverseButtons: true
        }).then(async (result) => {
          if (result.isConfirmed) {
            const res = await cartApi.checkout(paymentMethod, {
              fullName: data.fullName,
              phoneNumber: data.phoneNumber,
              address: useCustomAddress || addresses.length < 1 ? (data.address ?? '') : (selectedAddressName ?? ''),
              note: note || 'Không có'
            })
            if (res.status === 200) {
              if (res.message === 'Redirect') window.location.href = res.data
              else {
                UToast(EToastOption.SUCCESS, 'Thanh toán đơn hàng thành công')
                dispatch(removeFromCart())
              }
            }
          }
        })
      }
    } catch {
      UToast(EToastOption.ERROR, 'Đã có lỗi xảy ra')
    }
  }

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = cart.cartItems.slice(indexOfFirstItem, indexOfLastItem)

  const paymentMethods: {
    value: string
    label: string
    icon: React.ReactNode
  }[] = [
    { value: 'VNPAY', label: 'Thanh toán VNPAY', icon: <></> },
    { value: 'COD', label: 'Thanh toán khi nhận hàng', icon: <></> }
  ]

  const sortedAddresses = [...addresses].sort((a, b) => {
    if (a.isDefault) return -1
    if (b.isDefault) return 1
    return 0
  })

  const addressOptions: IOption[] = sortedAddresses.map((addr: IAddress) => ({
    value: addr.name,
    label: addr.name
  }))

  const customAddressOption: IOption[] = [{ value: 'customAddress', label: 'Nhập địa chỉ khác' }]

  return (
    <div className='mx-auto px-4 md:px-20 py-1 md:py-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <div className='space-y-6'>
          <h2 className='text-2xl font-bold'>Thông tin đặt hàng</h2>
          <div className='grid grid-cols-2 gap-3'>
            <div className='mb-4 col-span-2 lg:col-span-1'>
              <Controller
                name='fullName'
                control={control}
                render={({ field }) => (
                  <InputCheckout
                    label='Họ và tên'
                    placeholder='Nhập họ và tên...'
                    name='fullName'
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.fullName?.message}
                  />
                )}
              />
            </div>
            <div className='mb-4 col-span-2 lg:col-span-1'>
              <Controller
                name='phoneNumber'
                control={control}
                render={({ field }) => (
                  <InputCheckout
                    label='Số điện thoại'
                    name='phoneNumber'
                    placeholder='Nhập số điện thoại...'
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.phoneNumber?.message}
                  />
                )}
              />
            </div>
            {addresses.length > 0 ? (
              <div className='mb-4 col-span-2'>
                <SelectGroupCheckout
                  options={addressOptions}
                  name='address'
                  selectedValues={selectedAddressName ? [selectedAddressName] : []}
                  onChange={handleAddressChange}
                  layout='vertical'
                  label='Địa chỉ'
                  isDisabled={useCustomAddress}
                />
              </div>
            ) : (
              ''
            )}
            {addresses.length > 0 && (
              <div className='mb-4 col-span-2 lg:col-span-1'>
                <ForwardedCheckboxGroupCheckout
                  options={customAddressOption}
                  name='customAddress'
                  selectedValues={useCustomAddress ? ['customAddress'] : []}
                  onChange={handleUseCustomAddressChange}
                  layout='vertical'
                  label='Địa chỉ'
                />
              </div>
            )}

            {(useCustomAddress || addresses.length < 1) && (
              <div className='bg-[#f1f1f1] col-span-2 p-5 pt-9 rounded-lg'>
                <div className='mb-4 '>
                  <Controller
                    name='address'
                    control={control}
                    render={({ field }) => (
                      <InputCheckout
                        name='address'
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.address?.message}
                        placeholder='Địa chỉ (ví dụ: 103 Vạn Phúc, phường Vạn Phúc)'
                        invert
                      />
                    )}
                  />
                </div>
              </div>
            )}
            <div className='mb-4 col-span-2'>
              <TextareaCheckout
                label='Ghi chú'
                name='note'
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder='Ghi chú thêm (Ví dụ: Giao hàng giờ hành chính)'
              />
            </div>

            <div className='mb-4 col-span-2'>
              <ForwardedRadioGroupPayMethod
                options={paymentMethods}
                name='paymentMethod'
                selectedValue={paymentMethod}
                onChange={handlePaymentMethodChange}
                layout='vertical'
                label='Phương thức thanh toán'
              />
            </div>
          </div>
        </div>

        <div className='space-y-6'>
          <h2 className='text-2xl font-bold'>Giỏ hàng</h2>
          {cartLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              {cart.cartItems.length === 0 ? (
                <p>Chưa có sản phẩm trong giỏ hàng</p>
              ) : (
                <>
                  <button onClick={() => dispatch(removeFromCart())}>Xoá tất cả</button>
                  {currentItems.map((item, i) => (
                    <div key={i} className='border-t-2 p-4'>
                      <li className='grid grid-cols-[auto_1fr]' key={i}>
                        <img src={item.thumbnail} alt={item.productName} className='w-25 object-cover rounded-md' />
                        <div className='pl-4 py-2 flex flex-col items-start justify-between'>
                          <div className='text-sm mb-2'>
                            <p className='text-md font-semibold max-w-full'>{item.productName}</p>
                            <p className='text-sm'>
                              <span>{item.attributes[0].Color}</span> / <span>{item.attributes[1].Size}</span>
                            </p>
                          </div>
                          <div className='flex items-center ml-auto'>
                            <div className='w-fit flex items-center justify-center border rounded-full'>
                              <button
                                onClick={() => dispatch(subToCart(item.variantId))}
                                className='w-8 h-8 flex items-center justify-center font-medium text-2xl'
                              >
                                <FontAwesomeIcon icon={faSubtract} className=' text-sm cursor-pointer' />
                              </button>
                              <input
                                type='text'
                                value={item.quantity}
                                onChange={() => {}}
                                disabled
                                className='w-10 p-2 border-0 outline-none text-center'
                              />
                              <button
                                onClick={() => dispatch(addToCart({ variantId: item.variantId, quantity: 1 }))}
                                className='w-8 h-8 flex items-center justify-center font-medium text-2xl'
                              >
                                <FontAwesomeIcon icon={faPlus} className=' text-sm cursor-pointer' />
                              </button>
                            </div>
                            <div className='ml-3 space-x-2'>
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
                            </div>
                          </div>
                          <div
                            className='flex items-center gap-1 cursor-pointer'
                            onClick={() => dispatch(addToCart({ variantId: item.variantId, quantity: -item.quantity }))}
                          >
                            <FontAwesomeIcon icon={faXmarkCircle} className='text-md' />
                            Xoá
                          </div>
                        </div>
                      </li>
                    </div>
                  ))}
                  <Pagination
                    currentPage={currentPage}
                    totalPage={Math.ceil(cart.cartItems.length / itemsPerPage)}
                    onPageChange={handlePageChange}
                  />
                  <div className='space-y-4 flex flex-col ml-auto max-w-[500px]'>
                    <div className='flex justify-between'>
                      <span>Tạm tính:</span>
                      <span>
                        <FormattedNumber value={calculateSubtotal(cart)} style='currency' currency='VND' />
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span>Giảm giá:</span>
                      <span>
                        <FormattedNumber value={calculateDiscount(cart)} style='currency' currency='VND' />
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span>Phí ship:</span>
                      <span>
                        <FormattedNumber value={0} style='currency' currency='VND' />
                      </span>
                    </div>
                    <div className='flex justify-between font-bold border-t-2 pt-4'>
                      <span>Tổng cộng:</span>
                      <span>
                        <FormattedNumber value={calculateTotal(cart)} style='currency' currency='VND' />
                      </span>
                    </div>
                  </div>
                  <div className='w-full flex justify-end'>
                    <ButtonCustom className='font-normal px-16' inverted onClick={handleSubmit(onSubmit)}>
                      THANH TOÁN
                    </ButtonCustom>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Cart
