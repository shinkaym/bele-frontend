import Overlay from '@/components/common/Overlay'
import executeAOS from '@/utils/executeAOS'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { PropsWithChildren, useCallback, useEffect } from 'react'

interface IPopupProps {
  onPopupClose: () => void
}

const Popup: React.FunctionComponent<PropsWithChildren<IPopupProps>> = ({ children, onPopupClose }) => {
  const callBackAos = useCallback(() => {
    executeAOS({})
  }, [])

  useEffect(() => {
    callBackAos()
  }, [callBackAos])
  return (
    <div className='fixed inset-0 z-40' data-aos='fade-down'>
      <Overlay onClose={onPopupClose} className='h-screen z-40 overflow-y-visible' position='relative' />
      <div className='shadow-md absolute lg:w-[500px] w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 bg-white p-5 lg:p-10  text-black rounded-lg'>
        {children}
        <button
          onClick={onPopupClose}
          className='absolute -top-5 -right-5 flex items-center justify-center rounded-full h-10 w-10 bg-black text-white z-50 shadow-md hover:h-11 hover:w-11 transition-all ease-linear duration-75 border'
        >
          <FontAwesomeIcon icon={faClose} className='text-lg' />
        </button>
      </div>
    </div>
  )
}

export default Popup
