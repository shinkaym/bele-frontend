import React from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

interface ConfirmationModalProps {
  onChange: (token: string | null) => void
  onCancel: () => void
}

const ReCAPCHAModal: React.FC<ConfirmationModalProps> = ({ onChange, onCancel }) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white p-6 rounded shadow-lg'>
        <ReCAPTCHA sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY} onChange={onChange} />
        <button onClick={onCancel} className='bg-gray-500 text-white px-4 py-2 mt-3 rounded'>
          Cancel
        </button>
      </div>
    </div>
  )
}

export default ReCAPCHAModal
