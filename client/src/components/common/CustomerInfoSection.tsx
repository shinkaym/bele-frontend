import React from 'react'
import ButtonCustom from './ButtonCustom'
import { IOption } from '@/models/interfaces'

interface CustomerInfoSectionProps {
  title: string
  options: IOption[]
  onClick: () => void
}

const CustomerInfoSection: React.FC<CustomerInfoSectionProps> = ({ title, options, onClick }) => {
  return (
    <div className='mb-12 text-base lg:text-lg'>
      <h3 className='font-medium text-3xl tracking-wider mb-3 lg:mb-5'>{title}</h3>
      {options.map((o, i) => (
        <div key={i} className='flex items-center mb-6'>
          <div className='text-gray-500 max-w-[50%] w-[300px]'>{o.label}</div>
          <div className='font-semibold'>{o.value}</div>
        </div>
      ))}
      <ButtonCustom onClick={onClick}>CẬP NHẬT</ButtonCustom>
    </div>
  )
}

export default CustomerInfoSection
