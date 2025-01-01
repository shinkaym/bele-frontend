import React, { ForwardedRef } from 'react'

interface TextareaProps {
  label?: string
  name: string
  placeholder?: string
  className?: string
  error?: string
  value?: string | number
  isDisabled?: boolean
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

// Sử dụng hàm mũi tên với React.forwardRef
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { label, name, placeholder, className = '', error, value = '', onChange, isDisabled = false }: TextareaProps,
    ref: ForwardedRef<HTMLTextAreaElement>
  ) => {
    return (
      <>
        {label && (
          <label htmlFor={name} className='mb-3 block text-black dark:text-white'>
            {label}
          </label>
        )}
        <textarea
          ref={ref} // Truyền ref vào textarea
          name={name}
          id={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={isDisabled}
          className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent ${
            isDisabled ? 'opacity-50' : ''
          } py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-not-allowed disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${className}`}
        />
        {error && <p className='text-sm text-red-500 mt-[-20px]'>{error}</p>}
      </>
    )
  }
)

// Đặt displayName cho component khi sử dụng React.forwardRef
Textarea.displayName = 'Textarea'

export default Textarea