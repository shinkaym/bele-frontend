import React, { ForwardedRef, useEffect, useState } from 'react'

interface RadioGroupProps {
  options: {value:string}[]
  name: string // Name attribute to group radios
  selectedValue?: string
  onChange?: (value: string, type?: string) => void
  className?: string
  label?: string
}

const RadioGroup = (
  { options, name, selectedValue, onChange, className, label }: RadioGroupProps,
  ref: ForwardedRef<HTMLDivElement>
) => {
  const [selected, setSelected] = useState<string>(selectedValue || '')

  useEffect(() => {
    setSelected(selectedValue || '')
  }, [selectedValue])

  const handleChange = (value: string) => {
    setSelected(value)
    if (onChange) {
      onChange(value)
    }
  }

  return (
    <div className={className}>
      {label && <label className='mb-2.5 block text-black dark:text-white'>{label}</label>}
      <div ref={ref} className={`${className} flex flex-wrap`}>
        {options.map((option) => (
          <label
            key={name + option?.value}
            htmlFor={name + option?.value}
            className={`flex items-center justify-center lg:px-4 lg:py-3 md:h-9 sm:h-8 h-7 border-2 border-solid lg:text-base md:text-sm text-xs rounded-md hover:bg-blue-primary hover:text-white hover:border-blue-primary cursor-pointer transition-colors ease-linear duration-150 ${
              selected === option?.value
                ? 'bg-blue-primary text-white border-blue-primary'
                : 'bg-zinc-200 text-black border-black'
            }`}
          >
            <div className='absolute'>
              <input
                type='radio'
                id={name + option?.value}
                name={name}
                value={option?.value}
                checked={selected === option?.value}
                onChange={() => handleChange(option?.value)}
                className='sr-only'
              />
            </div>
            {option?.value}
          </label>
        ))}
      </div>
    </div>
  )
}

const ForwardedRadioGroup = React.forwardRef(RadioGroup)
ForwardedRadioGroup.displayName = 'RadioGroup'

export default ForwardedRadioGroup
