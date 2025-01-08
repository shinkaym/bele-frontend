import ButtonCustom from './ButtonCustom'

const AccountInfo = () => {
  return (
    <div className='md:w-2/3 lg:w-full md:mx-auto lg:mx-0'>
      <h3 className='font-medium text-3xl tracking-wider mb-3 lg:mb-5'>Thông tin tài khoản</h3>
      <div className='mb-12 text-base lg:text-lg'>
        <div className='flex items-center mb-6'>
          <div className='text-gray-500 max-w-[50%] w-[300px]'>Họ và tên</div>
          <div className='font-semibold'>Pham Khoa</div>
        </div>
        <div className='flex items-center mb-6'>
          <div className='text-gray-500 max-w-[50%] w-[300px]'>Số điện thoại</div>
          <div className='font-semibold'>0909691405</div>
        </div>
        <div className='flex items-center mb-6'>
          <div className='text-gray-500 max-w-[50%] w-[300px]'>Giới tính</div>
          <div className='font-semibold'>Nam</div>
        </div>
        <div className='flex items-center mb-6'>
          <div className='text-gray-500 max-w-[50%] w-[300px]'>
            Ngày sinh (<span className='italic text-sm'>ngày/tháng/năm</span>)
          </div>
          <div className='font-semibold'>14/05/2003</div>
        </div>
        <ButtonCustom onClick={() => {}}>CẬP NHẬT</ButtonCustom>
      </div>
      <h3 className='font-medium text-3xl mb-3 lg:mb-5 tracking-wider'>Thông tin đăng nhập</h3>
      <div className='text-base lg:text-lg'>
        <div className='flex items-center mb-6'>
          <div className='text-gray-500 max-w-[50%] w-[300px]'>Email</div>
          <div className='font-semibold'>shinkaym.services@gmail.com</div>
        </div>
        <div className='flex items-center mb-6'>
          <div className='text-gray-500 max-w-[50%] w-[300px]'>Mật khẩu</div>
          <div className='font-semibold'>kho**************</div>
        </div>
        <ButtonCustom onClick={() => {}}>CẬP NHẬT</ButtonCustom>
      </div>
    </div>
  )
}

export default AccountInfo
