import React, { ForwardedRef } from 'react'

interface OTPInputProps {
  label?: string
  name: string
  length: number
  value: string
  placeholder?: string
  error?: string
  onChange: (value: string) => void
}

// Sử dụng React.forwardRef để forward ref vào OTPInput
const OTPInput = React.forwardRef<HTMLInputElement, OTPInputProps>(
  (
    { label, name, length, value, placeholder, error, onChange }: OTPInputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
      const newValue = e.target.value.replace(/[^0-9]/g, '') // Chỉ cho phép nhập số
      const otpArray = value.split('')

      otpArray[index] = newValue || '' // Cập nhật giá trị tại index
      const updatedOTP = otpArray.join('')

      if (newValue.length > 0 && index < length - 1) {
        const nextInput = document.querySelector<HTMLInputElement>(`#${name}-${index + 1}`)
        nextInput?.focus() // Chuyển focus sang ô tiếp theo
      }

      onChange(updatedOTP) // Gửi giá trị cập nhật về React Hook Form
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
      if (e.key === 'Backspace' && !value[index] && index > 0) {
        const previousInput = document.querySelector<HTMLInputElement>(`#${name}-${index - 1}`)
        previousInput?.focus() // Quay lại ô trước nếu nhấn Backspace
      }
    }

    return (
      <div>
        {label && <label className='block mb-2 text-black dark:text-white'>{label}</label>}
        <div className='flex space-x-2'>
          {Array.from({ length }).map((_, index) => (
            <input
              autoComplete='off'
              key={index}
              id={`${name}-${index}`} // Đặt ID để điều hướng focus
              type='text'
              maxLength={1} // Chỉ cho phép nhập 1 ký tự
              value={value[index] || ''} // Hiển thị ký tự tương ứng
              placeholder={placeholder}
              onChange={(e) => handleInputChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`w-12 h-12 text-center text-lg border rounded-md focus:outline-none ${
                error ? 'border-red-500' : 'border-gray-300'
              }`}
              ref={ref} // Truyền ref vào từng input
            />
          ))}
        </div>
        {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
      </div>
    )
  }
)

// Đặt displayName để tránh cảnh báo khi dùng React.forwardRef
OTPInput.displayName = 'OTPInput'

export default OTPInput
