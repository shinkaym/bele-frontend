import React from 'react'
import { ESortOrderValue, ESortOrderTitle, EFieldByTitle, EFieldByValue } from '@/models/enums/option'

interface SortProps {
  sortBy: EFieldByValue
  sortOrder: ESortOrderValue
  onSortChange: (by: EFieldByValue, order: ESortOrderValue) => void
  sortByOptions: { title: EFieldByTitle; value: EFieldByValue }[]
  sortOrderOptions: { title: ESortOrderTitle; value: ESortOrderValue }[]
}

const SelectSort: React.FC<SortProps> = ({ sortBy, sortOrder, onSortChange, sortByOptions, sortOrderOptions }) => {
  return (
    <div className='flex items-center gap-2'>
      <label className='hidden xl:block text-base font-medium text-gray-700'>Sort By:</label>
      <div className='flex items-center gap-2'>
        <select
          className='block w-full rounded-md border border-gray-300 bg-white py-2 px-4 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm'
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as EFieldByValue, sortOrder)}
        >
          {sortByOptions.map((s) => (
            <option key={s.value} value={s.value}>
              {s.title}
            </option>
          ))}
        </select>
        <select
          className='block w-full rounded-md border border-gray-300 bg-white py-2 px-4 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm'
          value={sortOrder}
          onChange={(e) => onSortChange(sortBy, e.target.value as ESortOrderValue)}
        >
          {sortOrderOptions.map((s) => (
            <option key={s.value} value={s.value}>
              {s.title}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default SelectSort
