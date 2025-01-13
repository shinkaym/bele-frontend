import React from 'react'
import DatePicker from 'react-datepicker'
import { registerLocale } from 'react-datepicker'
import { vi } from 'date-fns/locale'
import 'react-datepicker/dist/react-datepicker.css'

registerLocale('vi', vi)

interface CustomDatePickerProps {
  label?: string
  name: string
  placeholder?: string
  error?: string
  value?: Date | null
  onChange: (date: Date | null) => void
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ label, name, placeholder, error, value, onChange }) => {
  return (
    <div>
      <div className='relative'>
        {label && (
          <label htmlFor={name} className='mb-3 block text-black dark:text-white'>
            {label}
          </label>
        )}
        <DatePicker
          selected={value}
          onChange={onChange}
          locale='vi'
          dateFormat='dd/MM/yyyy'
          placeholderText={placeholder}
          className={`w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-blue-primary focus-visible:shadow-none ${
            error ? 'border-red-500' : ''
          }`}
        />
      </div>
      {error && <p className='text-sm text-red-500 mt-1'>{error}</p>}
    </div>
  )
}

export default CustomDatePicker
