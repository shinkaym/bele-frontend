import React, { ForwardedRef } from 'react'

interface InputProps {
  label?: string
  name: string
  placeholder?: string
  type?: string
  className?: string
  error?: string
  value?: string | number
  isDisabled?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  icon?: React.ReactNode // Thêm icon làm prop
  onIconClick?: () => void // Thêm sự kiện khi click vào icon
}

// Sử dụng React.forwardRef để forward ref vào input
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      name,
      placeholder,
      type = 'text',
      className = '',
      error,
      value = '',
      onChange,
      isDisabled = false,
      icon,
      onIconClick
    }: InputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div>
        <div className='relative'>
          {label && (
            <label htmlFor={name} className='mb-3 block text-black dark:text-white'>
              {label}
            </label>
          )}
          <input
            ref={ref} // Forward ref đến thẻ input
            type={type}
            name={name}
            id={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={isDisabled}
            min={1}
            className={`${
              isDisabled ? 'opacity-50' : ''
            } w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-blue-primary focus-visible:shadow-none ${className}`}
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
Input.displayName = 'Input'

export default Input
