import React, { useState } from 'react'
import clsx from 'clsx'
import SearchIcon from '@/components/icons/SearchIcon'

interface SearchProps {
  onSearch: (query: string) => void
  onSubmit: () => void
  size?: 'sm' | 'md' | 'lg'
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  color?: string
}

const Search: React.FC<SearchProps> = ({ onSearch, onSubmit, size = 'md', radius = 'md', color = 'primary' }) => {
  const [query, setQuery] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value
    setQuery(newQuery)
    onSearch(newQuery)
  }

  const handleSearch = () => {
    onSubmit()
  }

  const inputStyles = clsx('flex-grow px-4 py-2 text-gray-700 bg-transparent border-none focus:outline-none', {
    'text-sm': size === 'sm',
    'text-base': size === 'md',
    'text-lg': size === 'lg',
    'rounded-none': radius === 'none',
    'rounded-sm': radius === 'sm',
    'rounded-md': radius === 'md',
    'rounded-lg': radius === 'lg',
    'rounded-full': radius === 'full'
  })

  const buttonStyles = clsx('px-4 py-2 text-white hover:bg-opacity-90 focus:outline-none', {
    'rounded-e-none': radius === 'none',
    'rounded-e-sm': radius === 'sm',
    'rounded-e-md': radius === 'md',
    'rounded-e-lg': radius === 'lg',
    'rounded-e-full': radius === 'full',
    [`bg-${color}`]: color
  })

  return (
    <div className='flex items-center w-full max-w-xs bg-white rounded-lg shadow-md'>
      <input type='search' className={inputStyles} placeholder='Search...' value={query} onChange={handleInputChange} />
      <button onClick={handleSearch} className={buttonStyles}>
        <SearchIcon className='w-6 h-6' />
      </button>
    </div>
  )
}

export default Search
