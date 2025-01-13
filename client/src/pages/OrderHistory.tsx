import { IconChevronDown } from '../components/icons'
import ButtonCustom from '../components/common/ButtonCustom'
import OrderDetail from '../components/common/OrderDetail'

const OrderHistory = () => {
  return (
    <div className='md:w-2/3 lg:w-full md:mx-auto lg:mx-0'>
      <h3 className='font-medium text-3xl tracking-wider mb-3 lg:mb-5'>Lịch sử đơn hàng</h3>
      <div className='flex flex-col items-center gap-4'>
        <div className='border border-black rounded-lg w-full h-[80px] flex items-center justify-between px-5 cursor-pointer'>
          <div className='flex items-center justify-between gap-3'>
            <h4>ĐƠN HÀNG #12345</h4>
            <ButtonCustom className='h-[30px] md:h-[40px] text-yellow-500 border-yellow-500 hover:text-yellow-500 hover:bg-transparent'>
              Đang giao
            </ButtonCustom>
          </div>
          <div>
            <IconChevronDown className='w-6 h-6' />
          </div>
        </div>
        <div className='border border-black rounded-lg w-full h-[80px] flex items-center justify-between px-5 cursor-pointer'>
          <div className='flex items-center justify-between gap-0 md:gap-3'>
            <h4>ĐƠN HÀNG #12345</h4>
            <ButtonCustom className='h-[30px] md:h-[40px] text-blue-500 border-blue-500 hover:text-blue-500 hover:bg-transparent'>
              Chờ xác nhận
            </ButtonCustom>
          </div>
          <div>
            <IconChevronDown className='w-6 h-6' />
          </div>
        </div>
        <OrderDetail />
      </div>
    </div>
  )
}

export default OrderHistory
