import { IOption } from '@/models/interfaces'
import React from 'react'

interface SelectGroupCheckoutProps {
  value: number | string
  onChange: (value: string) => void
  options: {
    value: string | number
    label: string
  }[]
  error?: string
  label?: string
  className?: string
  isDisabled?: boolean
}

// Bọc component với forwardRef
const SelectGroupCheckout = React.forwardRef<HTMLSelectElement, SelectGroupCheckoutProps>(
  ({ value, onChange, options, label, error, isDisabled = false, className }: SelectGroupCheckoutProps, ref) => {
    return (
      <div className={className}>
        {label && <label className='mb-2.5 block text-black dark:text-white text-sm'>{label}</label>}

        <div className='relative z-20 bg-transparent dark:bg-form-input'>
          <select
            disabled={isDisabled}
            ref={ref}
            value={value} // Đồng bộ giá trị
            onChange={(e) => onChange(e.target.value)} // Truyền giá trị mới cho React Hook Form
            className={`${isDisabled ? 'opacity-50' : ''} relative z-20 w-full appearance-none border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input  rounded-full dark:focus:border-primary text-sm ${
              value ? 'text-black dark:text-white' : ''
            }`}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value} className='text-body dark:text-bodydark text-sm '>
                {option.label}
              </option>
            ))}
          </select>
          {error && <p className='text-sm text-red-500'>{error}</p>}
        </div>
      </div>
    )
  }
)

export default SelectGroupCheckout
