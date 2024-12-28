import React, { useState } from 'react'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import ReCAPTCHA from 'react-google-recaptcha'
import { createRoot } from 'react-dom/client'

interface DeleteModalProps {
  itemId: number
  apiCall: (itemId: number) => Promise<any>
  onSuccess: () => void
  onError?: (error: any) => void
}

const DeleteModal: React.FC<DeleteModalProps> = ({ itemId, apiCall, onSuccess, onError }) => {
  console.log('🚀 ~ itemId:', itemId)
  const [captchaValue, setCaptchaValue] = useState<string | null>(null)

  Swal.fire({
    title: 'Xác nhận xoá',
    html: '<div id="recaptcha-container"></div>',
    showCancelButton: true,
    confirmButtonText: 'Xoá',
    cancelButtonText: 'Huỷ',
    didOpen: () => {
      const recaptchaContainer = document.getElementById('recaptcha-container')
      if (recaptchaContainer) {
        const recaptcha = (
          <ReCAPTCHA
            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY || ''}
            onChange={(value) => setCaptchaValue(value)}
          />
        )
        createRoot(recaptchaContainer).render(recaptcha)
      }
    },
    preConfirm: () => {
      if (!captchaValue) {
        Swal.showValidationMessage('Bạn cần xác minh CAPTCHA!')
        return false
      }

      // return fetch(`https://www.google.com/recaptcha/api/siteverify`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      //   body: `secret=${import.meta.env.VITE_RECAPTCHA_SECRET_KEY}&response=${captchaValue}`,
      // })
      //   .then((response) => {
      //     if (!response.ok) throw new Error('Google reCAPTCHA API failed!')
      //     return response.json()
      //   })
      //   .then((data) => {
      //     if (!data.success) {
      //       Swal.showValidationMessage('CAPTCHA không hợp lệ, vui lòng thử lại!')
      //       return false
      //     }
      //     return true
      //   })
      //   .catch(() => {
      //     Swal.showValidationMessage('Lỗi xác thực CAPTCHA, vui lòng thử lại!')
      //     return false
      //   })
    },
  }).then((result) => {
    if (result.isConfirmed) {
      apiCall(itemId)
        .then(() => {
          Swal.fire('Thành công!', 'Đối tượng đã được xoá.', 'success')
          onSuccess()
        })
        .catch((error) => {
          Swal.fire('Thất bại!', 'Có lỗi xảy ra trong quá trình xoá.', 'error')
          if (onError) onError(error)
        })
    }
  })

  return (
    <></>
  )
}

export default DeleteModal
