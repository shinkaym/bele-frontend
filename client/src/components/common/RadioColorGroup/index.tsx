import React, { ForwardedRef, useEffect, useState } from 'react'

interface RadioColorGroupProps {
  options: { id: string; value: string; optionName?: string }[]
  name: string // Name attribute to group radios
  onChange?: (value: string, name?: string) => void
  className?: string
  classNameItems?: string
  colorOutline?: string
  selectedValue?: string
}

const RadioColorGroup = (
  {
    options,
    name,
    onChange,
    className = '',
    classNameItems = '',
    colorOutline = 'gray-600',
    selectedValue = ''
  }: RadioColorGroupProps,
  ref: ForwardedRef<HTMLDivElement>
) => {
  const [selected, setSelected] = useState<string>(selectedValue || '')

  const handleChange = (value: string, name?: string) => {
    setSelected(value)
    if (onChange) {
      onChange(value, name)
    }
  }

  useEffect(() => {
    setSelected(selectedValue || '')
  }, [selectedValue])
  return (
    <div className={`py-2`}>
      <div ref={ref} className={`flex flex-wrap items-center gap-2 ${className}`}>
        {options.map((option) => (
          <label
            key={name + option?.id}
            htmlFor={name + option?.id.toString()}
            className={`relative flex items-center flex-col space-y-6 cursor-pointer rounded-xl text-center
                ${
                  selected === option?.id
                    ? `before:content-[''] before:block before:absolute  sm:before:-inset-0.75 before:-inset-0.5  before:rounded-xl before:border before:border-${colorOutline}`
                    : ''
                } 
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
                onChange={() => handleChange(option?.id, option?.optionName)}
                className='sr-only'
              />
            </div>
            {option.optionName && <p className='md:text-xs text-2xs'>{option.optionName}</p>}
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
