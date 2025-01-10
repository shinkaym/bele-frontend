import axiosPublic from '@/apis/client/public.client'
import { EToastOption } from '@/models/enums/option'
import { UToast } from '@/utils/swal'
import React from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

interface ConfirmationModalProps {
  onChange: (token: string | null) => void
  onCancel: () => void
}

const ReCAPCHAModal: React.FC<ConfirmationModalProps> = ({ onChange, onCancel }) => {
  const handleRecaptchaChange = async (token: string | null) => {
    if (token) {
      try {
        const res = await axiosPublic.post('/api/verify-recaptcha', { token })

        if (res.status === 200) {
          onChange(token)
        } else {
          UToast(EToastOption.ERROR, 'reCAPTCHA verification failed.')
        }
      } catch (error) {
        UToast(EToastOption.ERROR, 'Error verifying reCAPTCHA.')
      } finally {
        onCancel()
      }
    }
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white p-6 rounded shadow-lg'>
        <ReCAPTCHA sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY} onChange={handleRecaptchaChange} />
        <button onClick={onCancel} className='bg-gray-500 text-white px-4 py-2 mt-3 rounded'>
          Cancel
        </button>
      </div>
    </div>
  )
}

export default ReCAPCHAModal
