import { EToastOption } from '@/models/enum'
import Swal, { SweetAlertOptions } from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export const UToast = (type = EToastOption.SUCCESS, title = ''): void => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1000,
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

export const UInputAlert = async (
  title = 'ABCD',
  inputType: SweetAlertOptions['input'] = 'text',
  handleChange: (inputValue: string) => void,
  attributes?: Record<string, string>
) => {
  withReactContent(Swal).fire({
    title: `${title}`,
    input: inputType,
    inputPlaceholder: 'Fill captcha...',
    inputAttributes: {
      ...attributes
    },
    preConfirm: () => {
      const inputValue = Swal.getInput()?.value || ''
      handleChange(inputValue)
    }
  })
}
