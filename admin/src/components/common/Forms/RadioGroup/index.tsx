import React, { ForwardedRef, useState } from 'react'
import {IOptions} from '@/models/interfaces/options'

interface RadioGroupProps {
  options: IOptions[]
  name: string // Name attribute to group radios
  selectedValue?: string
  onChange?: (value: string) => void
  className?: string
  layout?: 'vertical' | 'horizontal' // Prop để xác định kiểu hiển thị
  label?: string
}

const RadioGroup = (
  { options, name, selectedValue, onChange, className, layout = 'vertical', label }: RadioGroupProps,
  ref: ForwardedRef<HTMLDivElement>
) => {
  const [selected, setSelected] = useState<string>(selectedValue || '')

  const handleChange = (value: string) => {
    setSelected(value)
    if (onChange) {
      onChange(value)
    }
  }

  return (
    <div className={className}>
      {label && <label className='mb-2.5 block text-black dark:text-white'>{label}</label>}
      <div ref={ref} className={`${layout === 'horizontal' ? 'flex flex-wrap' : ''}`}>
        {options.map((option) => (
          <label
            key={option?.value}
            htmlFor={option?.value.toString()}
            className={`flex cursor-pointer select-none items-center mb-2 ${layout === 'horizontal' ? 'mr-6' : ''}`}
          >
            <div className='relative'>
              <input
                type='radio'
                id={option?.value.toString()}
                name={name}
                value={option?.value.toString()}
                checked={selected === option?.value.toString()}
                onChange={() => handleChange(option?.value.toString())}
                className='sr-only'
              />
              <div
                className={`mr-2 flex h-5 w-5 items-center justify-center rounded-full border ${
                  selected === option?.value.toString() ? 'border-primary' : 'border-gray-300'
                }`}
              >
                <span
                  className={`h-2.5 w-2.5 rounded-full bg-transparent ${
                    selected === option?.value.toString() ? '!bg-primary' : ''
                  }`}
                >
                  {' '}
                </span>
              </div>
            </div>
            {option?.label}
          </label>
        ))}
      </div>
    </div>
  )
}

// Sử dụng forwardRef để bao bọc RadioGroup
const ForwardedRadioGroup = React.forwardRef(RadioGroup)

// Đặt displayName cho component khi sử dụng forwardRef
ForwardedRadioGroup.displayName = 'RadioGroup'

export default ForwardedRadioGroup
