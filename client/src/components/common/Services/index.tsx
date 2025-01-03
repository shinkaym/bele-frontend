import { faTruck, faSuitcase, faArrowRotateRight, faClock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Props {
  className?: string
}

const Services = ({ className }: Props) => {
  return (
    <div className={className}>
      <div className='lg:flex lg:items-center lg:justify-between grid lg:grid-cols-4 grid-cols-2 lg:gap-0 gap-4'>
        <div className='flex md:gap-4 gap-2 items-center'>
          <FontAwesomeIcon icon={faTruck} className='text-blue-primary lg:text-3xl md:text-2xl sm:text-xl text-base' />
          <div className='flex flex-col justify-between'>
            <p className='uppercase font-semibold lg:text-sm md:text-xs sm:text-2xs text-3xs'>Miễn phí giao hàng</p>
            <span className='font-thin xl:text-sm lg:text-xs md:text-2xs sm:text-3xs text-4xs '>
              Đảm bảo chất lượng đã được kiểm tra
            </span>
          </div>
        </div>
        <div className='flex md:gap-4 gap-2 items-center'>
          <FontAwesomeIcon
            icon={faSuitcase}
            className='text-blue-primary lg:text-3xl md:text-2xl sm:text-xl text-base'
          />
          <div className='flex flex-col justify-between'>
            <p className='uppercase font-semibold lg:text-sm md:text-xs sm:text-2xs text-3xs'>
              Thanh toán khi nhận hàng
            </p>
            <span className='font-thin xl:text-sm lg:text-xs md:text-2xs sm:text-3xs text-4xs '>
              Nhanh chóng, an toàn và tiện lợi
            </span>
          </div>
        </div>
        <div className='flex md:gap-4 gap-2 items-center'>
          <FontAwesomeIcon
            icon={faArrowRotateRight}
            className='text-blue-primary lg:text-3xl md:text-2xl sm:text-xl text-base'
          />
          <div className='flex flex-col justify-between'>
            <p className='uppercase font-semibold lg:text-sm md:text-xs sm:text-2xs text-3xs'>Đổi trả trong 45 ngày</p>
            <span className='font-thin xl:text-sm lg:text-xs md:text-2xs sm:text-3xs text-4xs '>
              Cam kết hoàn tiền hoặc đổi sản phẩm dễ dàng
            </span>
          </div>
        </div>
        <div className='flex md:gap-4 gap-2 items-center'>
          <FontAwesomeIcon icon={faClock} className='text-blue-primary lg:text-3xl md:text-2xl sm:text-xl text-base' />
          <div className='flex flex-col justify-between'>
            <p className='uppercase font-semibold lg:text-sm md:text-xs sm:text-2xs text-3xs'>Mở cửa cả tuần</p>
            <span className='font-thin xl:text-sm lg:text-xs md:text-2xs sm:text-3xs text-4xs '>
              Sẵn sàng phục vụ mọi ngày trong tuần
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Services
