import { IStatus } from '@/models/interfaces'
import React from 'react'

interface StatusModalProps {
  status: number
  statusList: IStatus[]
  modalTitle: string
  onUpdateStatus: (status: number) => void
  onCancel: () => void
}

const StatusModal: React.FC<StatusModalProps> = ({ status, statusList, modalTitle, onUpdateStatus, onCancel }) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white p-6 rounded shadow-lg'>
        <h3 className='text-lg font-medium mb-4'>Change {modalTitle} Status</h3>
        <div className='grid grid-cols-2 gap-4'>
          {statusList
            .filter((s) => s.value !== status)
            .map((s) => (
              <button
                key={s.value}
                className={`s-button ${s.className}`}
                data-value={s.value}
                onClick={() => onUpdateStatus(s.value)}
              >
                {s.title}
              </button>
            ))}
        </div>
        <button
              className='bg-gray-500 text-white px-4 py-2 mt-4 rounded'
              onClick={onCancel}
            >
              Cancel
            </button>
      </div>
    </div>
  )
}

export default StatusModal

