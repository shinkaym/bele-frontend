import Overlay from '@/components/common/Overlay'
import executeAOS from '@/utils/executeAOS'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { PropsWithChildren, useCallback, useEffect } from 'react'

interface IPopupProps {
  onPopupClose: () => void
  className?: string
}

const Popup: React.FunctionComponent<PropsWithChildren<IPopupProps>> = ({ children, onPopupClose, className }) => {
  const callBackAos = useCallback(() => {
    executeAOS({})
  }, [])

  useEffect(() => {
    callBackAos()
  }, [callBackAos])
  return (
    <div className='fixed inset-0 z-40' data-aos='fade-down'>
      <Overlay onClose={onPopupClose} className='h-screen z-40 overflow-y-visible' position='relative' />
      <div
        className={`shadow-md absolute top-1/2 sm:left-1/2 sm:right-1/2 sm:-translate-x-1/2 left-2 right-2  -translate-y-1/2 z-40 bg-white p-5 lg:p-10  text-black rounded-lg ${
          className ? className : 'lg:w-[500px] md:w-[450px] sm:w-[400px]'
        }`}
      >
        {children}
        <button
          onClick={onPopupClose}
          className='absolute lg:-top-5 lg:-right-5 md:-top-4 md:-right-4  sm:-top-3 sm:-right-3 -top-2 -right-2  flex items-center justify-center rounded-full lg:h-10 lg:w-10 md:h-9 md:w-9 sm:h-8 sm:w-8 h-7 w-7  bg-black text-white z-50 shadow-md hover:lg:h-11 hover:lg:w-11 hover:md:h-10 hover:md:w-10 hover:sm:h-9 hover:sm:w-9 hover:h-8 hover:w-8 transition-all ease-linear duration-75 border'
        >
          <FontAwesomeIcon icon={faClose} className='md:text-lg text-base' />
        </button>
      </div>
    </div>
  )
}

export default Popup
