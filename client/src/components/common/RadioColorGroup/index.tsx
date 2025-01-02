import { IColor } from '@/models/interfaces'
import React, { ForwardedRef, useState } from 'react'

interface RadioColorGroupProps {
  options: IColor[]
  name: string // Name attribute to group radios
  onChange?: (value: number) => void
  className?: string
  classNameItems?: string
}

const RadioColorGroup = (
  { options, name, onChange, className = '', classNameItems = '' }: RadioColorGroupProps,
  ref: ForwardedRef<HTMLDivElement>
) => {
  const [selected, setSelected] = useState<number>(options[0].id)

  const handleChange = (value: number) => {
    setSelected(value)
    if (onChange) {
      onChange(value)
    }
  }

  return (
    <div className={className}>
      <div ref={ref} className='space-x-4'>
        {options.map((option) => (
          <label
            key={name + option?.id}
            htmlFor={name + option?.id.toString()}
            className={`relative w-10 h-5 inline-block z-50 cursor-pointer rounded-xl 
                ${selected === option?.id ? "before:content-[''] before:block before:absolute before:-inset-1 before:rounded-xl before:border-2 before:border-black before:p-2" : ''} 
                ${classNameItems}`}
            style={{ backgroundColor: option.value }}
          >
            <div className='absolute'>
              <input
                type='radio'
                id={name + option?.id.toString()}
                name={name}
                value={option?.id.toString()}
                checked={selected === option?.id}
                onChange={() => handleChange(option?.id)}
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
