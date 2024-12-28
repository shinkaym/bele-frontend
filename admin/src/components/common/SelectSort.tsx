import React from 'react'
import { ESortOrderValue, ESortOrderTitle, EFieldByTitle, EFieldByValue } from '@/models/enums/option'

interface SortProps {
  sortBy: EFieldByValue
  sortOrder: ESortOrderValue
  onSortChange: (by: EFieldByValue, order: ESortOrderValue) => void
  sortByOptions: { title: EFieldByTitle; value: EFieldByValue }[]
  sortOrderOptions: { title: ESortOrderTitle; value: ESortOrderValue }[]
}

const SelectSort: React.FC<SortProps> = ({
  sortBy,
  sortOrder,
  onSortChange,
  sortByOptions,
  sortOrderOptions
}) => {
  return (
    <div>
      <label>Sort By: </label>
      <select value={sortBy} onChange={(e) => onSortChange(e.target.value as EFieldByValue, sortOrder)}>
        {sortByOptions.map((s) => (
          <option key={s.value} value={s.value}>
            {s.title}
          </option>
        ))}
      </select>
      <select value={sortOrder} onChange={(e) => onSortChange(sortBy, e.target.value as ESortOrderValue)}>
        {sortOrderOptions.map((s) => (
          <option key={s.value} value={s.value}>
            {s.title}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SelectSort
