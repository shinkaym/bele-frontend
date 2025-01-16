import { ICategory, IOption } from '@/models/interfaces'
import React, { ForwardedRef, useEffect, useState } from 'react'

interface RadioGroupProps {
  options: ICategory[]
  name: string // Name attribute to group radios
  selectedValue?: string
  onChange?: (value: string,type?:string) => void
  className?: string
  layout?: 'vertical' | 'horizontal' // Prop để xác định kiểu hiển thị
  label?: string
}

const RadioGroup = (
  { options, name, selectedValue, onChange, className, layout = 'vertical', label }: RadioGroupProps,
  ref: ForwardedRef<HTMLDivElement>
) => {
  const [selected, setSelected] = useState<string>(selectedValue || '')

  useEffect(() => {
    setSelected(selectedValue || '')
  }, [selectedValue])

  const handleChange = (value: string, type?: string) => {
    setSelected(value)
    if (onChange) {
      onChange(value,type)
    }
  }

  return (
    <div className={className}>
      {label && <label className='mb-2.5 block text-black dark:text-white'>{label}</label>}
      <div ref={ref} className={`${layout === 'horizontal' ? 'flex flex-wrap' : ''}`}>
        {options.map((option) => (
          <label
            key={name + option?.id}
            htmlFor={name + option?.id.toString()}
            className={`flex cursor-pointer select-none items-center mb-2 text-sm ${
              layout === 'horizontal' ? 'mr-6' : ''
            }`}
          >
            <div className='relative'>
              <input
                type='radio'
                id={name + option?.id.toString()}
                name={name}
                value={option?.id.toString()}
                checked={selected === option?.id.toString()}
                onChange={() => handleChange(option?.id.toString(), option.type)}
                className='sr-only'
              />
              <div
                className={`mr-2 flex h-5 w-5 items-center justify-center rounded-full border ${
                  selected === option?.id.toString() ? 'border-black' : 'border-gray-300'
                }`}
              >
                <span
                  className={`h-2.5 w-2.5 rounded-full bg-transparent ${
                    selected === option?.id.toString() ? '!bg-blue-primary' : ''
                  }`}
                >
                  {' '}
                </span>
              </div>
            </div>
            {option?.name}
          </label>
        ))}
      </div>
    </div>
  )
}

const ForwardedRadioGroup = React.forwardRef(RadioGroup)
ForwardedRadioGroup.displayName = 'RadioGroup'

export default ForwardedRadioGroup
