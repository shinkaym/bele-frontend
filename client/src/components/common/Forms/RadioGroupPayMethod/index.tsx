import React, { ForwardedRef, useEffect, useState } from 'react'

interface RadioGroupPayMethodProps {
  options: {
    value: string
    label: string
    icon: React.ReactNode
  }[]
  name: string // Name attribute to group radios
  selectedValue?: string
  onChange?: (value: string) => void
  className?: string
  layout?: 'vertical' | 'horizontal' // Prop để xác định kiểu hiển thị
  label?: string
}

const RadioGroupPayMethod = (
  { options, name, selectedValue, onChange, className, layout = 'vertical', label }: RadioGroupPayMethodProps,
  ref: ForwardedRef<HTMLDivElement>
) => {
  const [selected, setSelected] = useState<string>(selectedValue || '')

  useEffect(() => {
    setSelected(selectedValue || '')
  }, [selectedValue])

  const handleChange = (value: string) => {
    console.log('🚀 ~ handleChange ~ value:', value)
    setSelected(value)
    if (onChange) {
      onChange(value)
    }
  }

  return (
    <div className={className}>
      {label && <label className='mb-2.5 block text-black dark:text-white text-2xl font-bold'>{label}</label>}
      <div ref={ref} className={`${layout === 'horizontal' ? 'flex flex-wrap' : ''}`}>
        {options.map((option) => (
          <label
            key={name + option?.value}
            htmlFor={name + option?.value.toString()}
            className={`flex cursor-pointer select-none items-center mb-2 border border-slate-300 p-4 py-4 text-sm rounded-lg ${layout === 'horizontal' ? 'mr-6' : ''} ${selected === option?.value.toString() ? 'bg-[#f2f2f2]' : 'hover:bg-[#f2f2f2]'}`}
          >
            <div className='relative'>
              <input
                type='radio'
                id={name + option?.value.toString()}
                name={name}
                value={option?.value.toString()}
                checked={selected === option?.value.toString()}
                onChange={() => handleChange(option?.value.toString())}
                className='sr-only'
              />
              <div
                className={`mr-2 flex h-5 w-5 items-center justify-center rounded-full border ${
                  selected === option?.value.toString() ? 'border-black' : 'border-gray-300'
                }`}
              >
                <span
                  className={`h-2.5 w-2.5 rounded-full bg-transparent ${
                    selected === option?.value.toString() ? '!bg-black' : ''
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

const ForwardedRadioGroupPayMethod = React.forwardRef(RadioGroupPayMethod)
ForwardedRadioGroupPayMethod.displayName = 'RadioGroupPayMethod'

export default ForwardedRadioGroupPayMethod
