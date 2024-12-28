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
}

// Sử dụng hàm mũi tên với React.forwardRef
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { label, name, placeholder, type = 'text', className = '', error, value = '', onChange , isDisabled = false }: InputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <>
        {label && (
          <label htmlFor={name} className='mb-3 block text-black dark:text-white'>
            {label}
          </label>
        )}
        <input
          ref={ref} // Truyền ref vào input
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={isDisabled}
          min={1}
          className={`${type === 'color'?'':` py-3 px-5`} w-full rounded-lg border-[1.5px] border-stroke bg-transparent ${isDisabled ? 'opacity-50' : ''} text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-not-allowed disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${className}`}
        />
        {error && <p className='text-sm text-red-500'>{error}</p>}
      </>
    )
  }
)

// Đặt displayName cho component khi sử dụng React.forwardRef
Input.displayName = 'Input'

export default Input
