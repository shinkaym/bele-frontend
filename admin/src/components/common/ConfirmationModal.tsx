import Overlay from './Overlay'

interface ConfirmationModalProps {
  title: string
  className: string
  onConfirm: () => void
  onCancel: () => void
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ title, className, onConfirm, onCancel }) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <Overlay onClose={onCancel} className='z-40' />
      <div className='bg-white p-6 rounded shadow-lg  z-50'>
        <p>{title}</p>
        <div className='flex space-x-4 mt-4'>
          <button onClick={onConfirm} className={`${className} text-white px-4 py-2 rounded`}>
            Confirm
          </button>
          <button onClick={onCancel} className='bg-gray-500 text-white px-4 py-2 rounded'>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal
