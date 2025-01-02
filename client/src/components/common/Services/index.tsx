import { faTruck, faSuitcase, faArrowRotateRight, faClock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Props {
  className?: string
}

const Services = ({ className }: Props) => {
  return (
    <div className={className}>
      <div className='grid lg:grid-cols-4 grid-cols-2 lg:gap-0 gap-4'>
        <div className='flex gap-4 items-center'>
          <FontAwesomeIcon icon={faTruck} className='text-blue-primary xl:text-4xl lg:text-3xl md:text-2xl text-xl' />
          <div className='flex flex-col justify-between'>
            <p className='uppercase font-semibold md:text-base text-sm'>free shipping</p>
            <span className='font-thin text-sm md:inline-block hidden '>Suffered Alteration In Some Form</span>
          </div>
        </div>
        <div className='flex gap-4 items-center'>
          <FontAwesomeIcon
            icon={faSuitcase}
            className='text-blue-primary xl:text-4xl lg:text-3xl md:text-2xl text-xl'
          />
          <div className='flex flex-col justify-between'>
            <p className='uppercase font-semibold md:text-base text-sm'>CASH ON DELIVERY</p>
            <span className='font-thin text-sm md:inline-block hidden'>The Internet Tend To Repeat</span>
          </div>
        </div>
        <div className='flex gap-4 items-center'>
          <FontAwesomeIcon
            icon={faArrowRotateRight}
            className='text-blue-primary xl:text-4xl lg:text-3xl md:text-2xl text-xl'
          />
          <div className='flex flex-col justify-between'>
            <p className='uppercase font-semibold md:text-base text-sm'>45 DAY RETURN</p>
            <span className='font-thin text-sm md:inline-block hidden'>Making It Look Like Readable</span>
          </div>
        </div>
        <div className='flex gap-4 items-center'>
          <FontAwesomeIcon icon={faClock} className='text-blue-primary xl:text-4xl lg:text-3xl md:text-2xl text-xl' />
          <div className='flex flex-col justify-between'>
            <p className='uppercase font-semibold md:text-base text-sm'>OPENING ALL WEEK</p>
            <span className='font-thin text-sm md:inline-block hidden'>8AM - 9PM</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Services
