import { IconStar } from '../icons'
import ButtonCustom from './ButtonCustom'

const AddressNotes = () => {
  return (
    <div className='md:w-2/3 lg:w-full md:mx-auto lg:mx-0'>
      <div className='flex items-center justify-between pb-8 border-b'>
        <h3 className='font-medium text-3xl tracking-wider'>Địa chỉ của tôi</h3>
        <ButtonCustom onClick={() => {}} inverted>
          THÊM ĐỊA CHỈ MỚI
        </ButtonCustom>
      </div>
      <h4 className='py-5 text-2xl'>Sổ địa chỉ</h4>
      <div>
        {/* address */}
        <div className='flex justify-between mb-6 pb-6 border-b'>
          <div className='flex-1'>
            <div className='flex items-center gap-2 mb-2'>
              Khoa Pham
              <div className='text-xs border border-black px-2 py-1 rounded-full flex items-center gap-1'>
                <IconStar className='w-3 h-3' />
                Mặc định
              </div>
            </div>
            <div className='text-gray-500 text-md'>
              0909691405
              <br />
              DS PTT, Quang Minh, Mê Linh, Hà Nội, Huyện Mê Linh, Hà Nội
            </div>
          </div>
          <div className='flex flex-col'>
            <div className='flex items-start justify-end flex-1'>
              <button className='text-[#2f5acf] hover:text-black'>Cập nhật</button>
              <button className='text-[#2f5acf] hover:text-black ml-4 pl-4 border-l'>Xoá</button>
            </div>
          </div>
        </div>
        {/* address */}
        <div className='flex justify-between mb-6 pb-6 border-b'>
          <div className='flex-1'>
            <div className='flex items-center gap-2 mb-2'>Khoa Pham</div>
            <div className='text-gray-500 text-md'>
              0909691405
              <br />
              DS PTT, Quang Minh, Mê Linh, Hà Nội, Huyện Mê Linh, Hà Nội
            </div>
          </div>
          <div className='flex flex-col'>
            <div className='flex items-start justify-end flex-1'>
              <button className='text-[#2f5acf] hover:text-black'>Cập nhật</button>
              <button className='text-[#2f5acf] hover:text-black ml-4 pl-4 border-l'>Xoá</button>
            </div>
            <ButtonCustom className='h-[34px] font-normal lg:text-sm'>Đặt làm mặc định</ButtonCustom>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddressNotes
