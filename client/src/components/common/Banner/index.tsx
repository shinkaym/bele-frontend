import * as React from 'react'
import Button from '../Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

interface IBannerProps {
  title: string
  subTitle?: string
  url: string
  to: string
  btnColor?: string
  btnTextColor?: string
  className?: string
  btnClassName?: string
}

const Banner: React.FunctionComponent<IBannerProps> = ({
  title,
  subTitle,
  to,
  url,
  btnColor = 'white',
  btnTextColor = 'black',
  className = '',
  btnClassName = ''
}) => {
  return (
    <div className={`relative ${className}`}>
      <img src={url} alt={title} className='w-full h-full object-cover' />
      <div className='absolute inset-y-0 z-10 flex flex-col justify-center xl:left-10 lg:left-8 md:left-6 sm:left-4 left-2'>
        <h1 className='text-white font-semibold uppercase xl:text-6xl lg:text-5xl md:text-4xl sm:text-3xl text-xl'>
          {title}
        </h1>
        {subTitle && (
          <p className='opacity-85 text-white font-semibold xl:text-2xl lg:text-xl md:text-lg sm:text-base text-xs md:mt-2 mt-1'>
            {subTitle}
          </p>
        )}
        <div>
          <Button
            type='link'
            to={to}
            color={btnColor}
            textColor={btnTextColor}
            className={`xl:px-10 xl:py-4 lg:px-9 lg:py-3.5 md:px-8 md:py-3 sm:px-7 sm:py-2.5 px-6 py-2 xl:mt-16 lg:mt-12 md:mt-10 sm:mt-8 mt-5 rounded-full inline-block ${btnClassName}`}
          >
            <span className='xl:text-lg lg:text-base md:text-sm sm:text-xs text-2xs'>Discover Now</span>{' '}
            <FontAwesomeIcon
              icon={faArrowRight}
              className='ml-2 xl:text-lg lg:text-base md:text-sm sm:text-xs text-2xs'
            />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Banner
