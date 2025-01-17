import { IOption } from '@/models/interfaces'
import React, { ForwardedRef, useEffect, useState } from 'react'

interface CheckboxGroupCheckoutProps {
  options: IOption[]
  name: string // Name attribute for grouping checkboxes
  selectedValues?: string[] // Selected checkbox values
  onChange?: (values: string[]) => void
  className?: string
  layout?: 'vertical' | 'horizontal' // Display layout
  label?: string
}

const CheckboxGroupCheckout = (
  { options, name, selectedValues = [], onChange, className, layout = 'vertical', label }: CheckboxGroupCheckoutProps,
  ref: ForwardedRef<HTMLDivElement>
) => {
  const [selected, setSelected] = useState<string[]>(selectedValues)

  const handleChange = (value: string) => {
    const newSelected = selected.includes(value)
      ? selected.filter((item) => item !== value) // Remove the value if it's already selected
      : [...selected, value] // Add the value if not selected

    setSelected(newSelected)

    if (onChange) {
      onChange(newSelected)
    }
  }
  useEffect(() => {
    if (selectedValues.length === 0) {
      setSelected([])
    }
  }, [selectedValues])
  return (
    <div className={className}>
      {label && <label className='mb-2.5 block text-black dark:text-white text-sm'>{label}</label>}
      <div ref={ref} className={`${layout === 'horizontal' ? 'flex flex-wrap' : ''}`}>
        {options.map((option) => (
          <label
            key={name + option.value}
            htmlFor={name + option.value.toString()}
            className={`flex cursor-pointer select-none items-center mb-2 text-sm ${layout === 'horizontal' ? 'mr-6' : ''}`}
          >
            <div className='relative'>
              <input
                type='checkbox'
                id={name + option.value.toString()}
                name={name}
                value={option.value.toString()}
                checked={selected.includes(option.value.toString())}
                onChange={() => handleChange(option.value.toString())}
                className='sr-only'
              />
              <div
                className={`mr-2 flex h-5 w-5 items-center justify-center border rounded text-sm ${
                  selected.includes(option.value.toString()) ? 'border-black' : 'border-gray-300'
                }`}
              >
                {selected.includes(option.value.toString()) && (
                  <span className='h-2.5 w-2.5 bg-black rounded-sm'> </span>
                )}
              </div>
            </div>
            {option.label}
          </label>
        ))}
      </div>
    </div>
  )
}

// Use forwardRef to wrap CheckboxGroupCheckout
const ForwardedCheckboxGroupCheckout = React.forwardRef(CheckboxGroupCheckout)

// Set displayName for forwardRef component
ForwardedCheckboxGroupCheckout.displayName = 'CheckboxGroupCheckout'

export default ForwardedCheckboxGroupCheckout
