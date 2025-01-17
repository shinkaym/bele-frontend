import React, { useState } from 'react'
import InputRange from 'react-input-range'
import 'react-input-range/lib/css/index.css' // Ensure CSS is imported

interface RangeProps {
  label?: string
  min?: number
  max?: number
  step?: number
  value?: string // Value in the format "min-max"
  onChange?: (value: string) => void
  className?: string
}

const RangeSlider: React.FC<RangeProps> = ({
  label,
  min = 0,
  max = 100,
  step = 1,
  value = `${min}-${max}`,
  className,
  onChange
}) => {
  const [range, setRange] = useState({
    min: parseInt(value.split('-')[0]),
    max: parseInt(value.split('-')[1])
  })

  const handleChange = (value: number | { min: number; max: number }) => {
    if (typeof value === 'object') {
      setRange(value) // Update range state
      if (onChange) {
        onChange(`${value.min}-${value.max}`) // Use the new value directly
      }
    } else {
      setRange((prevRange) => ({
        ...prevRange,
        min: value
      }))
      if (onChange) {
        onChange(`${value}-${range.max}`)
      }
    }
  }

  return (
    <div>
      {label && <label className='mb-3 block text-black'>{label}</label>}
      <div className={`relative ${className}`}>
        <InputRange
          maxValue={max}
          minValue={min}
          step={step}
          value={{ min: range.min, max: range.max }} // Provide an object with min and max
          onChange={handleChange} // Handle updates to the range
        />
        <div className='sm:block hidden text-center mt-2 md:text-sm text-xs text-gray-700'>
          {range.min} - {range.max}
        </div>
      </div>
    </div>
  )
}

export default RangeSlider
