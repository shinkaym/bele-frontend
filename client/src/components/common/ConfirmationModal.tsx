import React from 'react'
import Popup from './Popup'
import Button from './Button'

interface ConfirmationModalProps {
  onClose: () => void
  onConfirm: () => void
  title?: string
  description?: string
  confirmButtonText?: string
  cancelButtonText?: string
  confirmButtonColor?: string
  cancelButtonColor?: string
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  onClose,
  onConfirm,
  title = 'Xác nhận',
  description = 'Bạn có chắc chắn muốn thực hiện hành động này?',
  confirmButtonText = 'Xác nhận',
  cancelButtonText = 'Huỷ',
  confirmButtonColor = 'red',
  cancelButtonColor = 'gray'
}) => {
  return (
    <Popup onPopupClose={onClose} className='lg:w-[500px] w-11/12'>
      <h2 className='text-2xl font-semibold mb-4'>{title}</h2>
      <p className='mb-6'>{description}</p>
      <div className='flex justify-end gap-4'>
        <Button
          type='button'
          color={cancelButtonColor}
          textColor='black'
          className='rounded-md py-2 px-4 hover:opacity-85'
          onClick={onClose}
        >
          {cancelButtonText}
        </Button>
        <Button
          type='button'
          color={confirmButtonColor}
          textColor='black'
          className='rounded-md py-2 px-4 hover:opacity-85'
          onClick={onConfirm}
        >
          {confirmButtonText}
        </Button>
      </div>
    </Popup>
  )
}

export default ConfirmationModal
