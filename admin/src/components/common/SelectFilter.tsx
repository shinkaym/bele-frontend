// components/common/SelectFilter.tsx

import React from 'react'

type Option = {
  value: number | string
  title: string
}

type SelectFilterProps = {
  label: string
  value: number | string | null
  options: Option[]
  onChange: (value: number | string) => void
}

const SelectFilter: React.FC<SelectFilterProps> = ({ label, value, options, onChange }) => {
  return (
    <div className='flex items-center gap-2'>
      <label className='hidden xl:block text-base font-medium text-gray-700 dark:text-white'>{label}: </label>
      <select
        className='block w-full rounded-md border border-gray-300 bg-white py-2 px-4 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm dark:text-black'
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((s) => (
          <option key={s.value} value={s.value}>
            {s.title}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SelectFilter
