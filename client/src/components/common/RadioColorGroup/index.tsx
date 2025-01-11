import { IVariantColor } from '@/models/interfaces'
import React, { ForwardedRef, useState } from 'react'

interface RadioColorGroupProps {
  options: IVariantColor[]
  name: string // Name attribute to group radios
  onChange?: (value: number) => void
  className?: string
  classNameItems?: string
}

const RadioColorGroup = (
  { options, name, onChange, className = '', classNameItems = '' }: RadioColorGroupProps,
  ref: ForwardedRef<HTMLDivElement>
) => {
  const [selected, setSelected] = useState<number>(options[0].colorId)

  const handleChange = (value: number) => {
    setSelected(value)
    if (onChange) {
      onChange(value)
    }
  }

  return (
    <div className={`${className} py-2`}>
      <div ref={ref} className='flex flex-wrap items-center gap-2'>
        {options.map((option) => (
          <label
            key={name + option?.colorId}
            htmlFor={name + option?.colorId.toString()}
            className={`relative inline-block cursor-pointer rounded-xl 
                ${selected === option?.colorId ? "before:content-[''] before:block before:absolute before:-inset-0.75 before:rounded-xl before:border before:border-gray-600" : ''} 
                ${classNameItems}`}
            style={{ backgroundColor: option.color }}
          >
            <div className='absolute'>
              <input
                type='radio'
                id={name + option?.colorId.toString()}
                name={name}
                value={option?.colorId.toString()}
                checked={selected === option?.colorId}
                onChange={() => handleChange(option?.colorId)}
                className='sr-only'
              />
            </div>
          </label>
        ))}
      </div>
    </div>
  )
}

// Sử dụng forwardRef để bao bọc RadioColorGroup
const ForwardedRadioColorGroup = React.forwardRef(RadioColorGroup)

// Đặt displayName cho component khi sử dụng forwardRef
ForwardedRadioColorGroup.displayName = 'RadioColorGroup'

export default ForwardedRadioColorGroup
