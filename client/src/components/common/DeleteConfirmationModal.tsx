// DeleteConfirmationModal.tsx
import React from 'react'
import Popup from './Popup'
import Button from './Button'

interface DeleteConfirmationModalProps {
  onClose: () => void
  onConfirm: () => void
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ onClose, onConfirm }) => {
  return (
    <Popup onPopupClose={onClose} className='lg:w-[500px] w-full'>
      <h2 className='text-2xl font-semibold mb-4'>Xác nhận xoá</h2>
      <p className='mb-6'>Bạn có chắc chắn muốn xoá địa chỉ này?</p>
      <div className='flex justify-end gap-4'>
        <Button
          type='button'
          color='gray'
          textColor='black'
          className='rounded-md py-2 px-4 hover:opacity-85'
          onClick={onClose}
        >
          Huỷ
        </Button>
        <Button
          type='button'
          color='red'
          textColor='white'
          className='rounded-md py-2 px-4 hover:opacity-85'
          onClick={onConfirm}
        >
          Xoá
        </Button>
      </div>
    </Popup>
  )
}

export default DeleteConfirmationModal
