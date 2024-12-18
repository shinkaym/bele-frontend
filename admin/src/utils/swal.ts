import Swal from 'sweetalert2'
import { EToastOption } from '@/models/enums/option'
import withReactContent from 'sweetalert2-react-content'

export const UToast = (type = EToastOption.SUCCESS, title = ''): void => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer
      toast.onmouseleave = Swal.resumeTimer
    }
  })
  Toast.fire({
    icon: type,
    title: title
  })
}

export const UCaptchaAlert = async (captchaCode = 'ABCD', handleChange: (inputValue: string) => void) => {
  withReactContent(Swal).fire({
    title: `${captchaCode}`,
    input: 'text',
    inputPlaceholder: 'Fill captcha...',
    inputAttributes: {
      autocomplete: 'off', // Tắt tính năng tự động hoàn thành
      maxlength: '4',
    },
    preConfirm: () => {
      const inputValue = Swal.getInput()?.value || ''
      handleChange(inputValue)
    }
  })
}
