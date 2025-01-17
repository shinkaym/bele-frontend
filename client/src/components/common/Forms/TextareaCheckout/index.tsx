import React, { ForwardedRef } from 'react'

interface TextareaCheckoutProps {
  label?: string
  name: string
  placeholder?: string
  className?: string
  error?: string
  value?: string | number
  isDisabled?: boolean
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  icon?: React.ReactNode // Thêm icon làm prop
  onIconClick?: () => void // Thêm sự kiện khi click vào icon
}

// Sử dụng React.forwardRef để forward ref vào textarea
const TextareaCheckout = React.forwardRef<HTMLTextAreaElement, TextareaCheckoutProps>(
  (
    {
      label,
      name,
      placeholder,
      className = 'w-full py-3 pl-6 pr-10',
      error,
      value = '',
      onChange,
      isDisabled = false,
      icon,
      onIconClick
    }: TextareaCheckoutProps,
    ref: ForwardedRef<HTMLTextAreaElement>
  ) => {
    return (
      <div>
        <div className='relative'>
          {label && (
            <label htmlFor={name} className='mb-3 block text-black dark:text-white text-sm'>
              {label}
            </label>
          )}
          <textarea
            ref={ref} // Forward ref đến thẻ textarea
            name={name}
            id={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={isDisabled}
            className={`${
              isDisabled ? 'opacity-50' : ''
            } rounded-lg text-sm border border-stroke bg-transparent text-black outline-none focus:border-blue-primary focus-visible:shadow-none ${className}`}
          />
          {/* Icon hiển thị trong ô input */}
          {icon && (
            <span
              className='absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer'
              onClick={onIconClick} // Gọi onIconClick khi icon được nhấn
            >
              {icon}
            </span>
          )}
        </div>
        {error && <p className='text-sm text-red-500 mt-1'>{error}</p>}
      </div>
    )
  }
)

// Đặt displayName để tránh cảnh báo khi dùng React.forwardRef
TextareaCheckout.displayName = 'TextareaCheckout'

export default TextareaCheckout
