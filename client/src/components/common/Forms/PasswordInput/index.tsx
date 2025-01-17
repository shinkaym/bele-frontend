import React, { useState, ForwardedRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

interface InputPasswordProps {
  label?: string
  name: string
  placeholder?: string
  className?: string
  error?: string
  value?: string | number
  isDisabled?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordProps>(
  (
    { label, name, placeholder, className = '', error, value = '', onChange, isDisabled = false }: InputPasswordProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const [showPassword, setShowPassword] = useState(false)

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev)
    }

    return (
      <>
        {label && (
          <label htmlFor={name} className='mb-3 block text-black dark:text-white'>
            {label}
          </label>
        )}
        <div className='relative'>
          <input
            ref={ref}
            type={showPassword ? 'text' : 'password'}
            name={name}
            id={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={isDisabled}
            className={`py-3 px-5 w-full rounded-lg border-[1.5px] border-stroke bg-transparent ${
              isDisabled ? 'opacity-50' : ''
            } text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-not-allowed disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${className}`}
          />
          <button
            type='button'
            onClick={togglePasswordVisibility}
            className='absolute inset-y-0 right-0 flex items-center text-sm leading-5 -translate-x-1/2 translate-y-1/2 h-fit'
          >
            {<FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} className='opacity-50 text-xl w-6 h-6' />}
          </button>
        </div>
        {error && <p className='text-sm text-red-500 mt-[-20px]'>{error}</p>}
      </>
    )
  }
)

InputPassword.displayName = 'InputPassword'

export default InputPassword
