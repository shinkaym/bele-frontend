import { IService } from '@/models/interfaces'
import { faTruck, faSuitcase, faArrowRotateRight, faClock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Props {
  className?: string
  service: IService
}

const Services = ({ className, service }: Props) => {
  return (
    <div className={className}>
      <div className='lg:flex lg:items-center lg:justify-between grid lg:grid-cols-4 grid-cols-2 lg:gap-0 gap-4'>
        <div className='flex md:gap-4 gap-2 items-center'>
          <FontAwesomeIcon icon={faTruck} className='text-blue-primary lg:text-3xl md:text-2xl sm:text-xl text-base' />
          <div className='flex flex-col justify-between'>
            <p className='uppercase font-semibold lg:text-sm md:text-xs sm:text-2xs text-3xs'>
              {service.serviceTitle1}
            </p>
            <span className='font-thin xl:text-sm lg:text-xs md:text-2xs sm:text-3xs text-4xs '>
              {service.serviceInfo1}
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
              {service.serviceTitle2}
            </p>
            <span className='font-thin xl:text-sm lg:text-xs md:text-2xs sm:text-3xs text-4xs '>
              {service.serviceInfo2}
            </span>
          </div>
        </div>
        <div className='flex md:gap-4 gap-2 items-center'>
          <FontAwesomeIcon
            icon={faArrowRotateRight}
            className='text-blue-primary lg:text-3xl md:text-2xl sm:text-xl text-base'
          />
          <div className='flex flex-col justify-between'>
            <p className='uppercase font-semibold lg:text-sm md:text-xs sm:text-2xs text-3xs'>
              {service.serviceTitle3}
            </p>
            <span className='font-thin xl:text-sm lg:text-xs md:text-2xs sm:text-3xs text-4xs '>
              {service.serviceInfo3}
            </span>
          </div>
        </div>
        <div className='flex md:gap-4 gap-2 items-center'>
          <FontAwesomeIcon icon={faClock} className='text-blue-primary lg:text-3xl md:text-2xl sm:text-xl text-base' />
          <div className='flex flex-col justify-between'>
            <p className='uppercase font-semibold lg:text-sm md:text-xs sm:text-2xs text-3xs'>
              {service.serviceTitle4}
            </p>
            <span className='font-thin xl:text-sm lg:text-xs md:text-2xs sm:text-3xs text-4xs '>
              {service.serviceInfo4}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Services
