import IconPlay from '@/components/icons/IconPlay'
import { EFieldByValue, EFieldByTitle, ESortOrderValue, ESortOrderTitle } from '@/models/enums/option'
import { EOrderStatus, ERateStatus, EEmployeeStatus, EDiscountStatus, ECustomerStatus, EContactStatus, ECategoryStatus } from '@/models/enums/status'
import { IStatus, ITable } from '@/models/interfaces'
import { TMenuItem } from '@/models/types/brand'

export const menuItems: TMenuItem[] = [
  {
    url: '/',
    title: 'Trang chủ',
    icon: <IconPlay className='size-5' />
  }
]

export const sortByOptions: { title: EFieldByTitle; value: EFieldByValue }[] = [
  {
    title: EFieldByTitle.CREATED_AT,
    value: EFieldByValue.CREATED_AT
  }
]

export const employeeSortByOptions: { title: EFieldByTitle; value: EFieldByValue }[] = [
  {
    title: EFieldByTitle.CREATED_AT,
    value: EFieldByValue.CREATED_AT
  },
  {
    title: EFieldByTitle.FULLNAME,
    value: EFieldByValue.FULLNAME
  },
]

export const customerSortByOptions: { title: EFieldByTitle; value: EFieldByValue }[] = [
  {
    title: EFieldByTitle.CREATED_AT,
    value: EFieldByValue.CREATED_AT
  },
  {
    title: EFieldByTitle.FULLNAME,
    value: EFieldByValue.FULLNAME
  },
]

export const discountSortByOptions: { title: EFieldByTitle; value: EFieldByValue }[] = [
  {
    title: EFieldByTitle.CREATED_AT,
    value: EFieldByValue.CREATED_AT
  },
  {
    title: EFieldByTitle.NAME,
    value: EFieldByValue.NAME
  },
  {
    title: EFieldByTitle.DISCOUNT_VALUE,
    value: EFieldByValue.DISCOUNT_VALUE
  },
]

export const orderSortByOptions: { title: EFieldByTitle; value: EFieldByValue }[] = [
  {
    title: EFieldByTitle.CREATED_AT,
    value: EFieldByValue.CREATED_AT
  },
  {
    title: EFieldByTitle.FULLNAME,
    value: EFieldByValue.FULLNAME
  },
]

export const rateSortByOptions: { title: EFieldByTitle; value: EFieldByValue }[] = [
  {
    title: EFieldByTitle.CREATED_AT,
    value: EFieldByValue.CREATED_AT
  },
  {
    title: EFieldByTitle.NAME,
    value: EFieldByValue.NAME
  },
  {
    title: EFieldByTitle.STAR,
    value: EFieldByValue.STAR
  },
]

export const attributeValueSortByOptions: { title: EFieldByTitle; value: EFieldByValue }[] = [
  {
    title: EFieldByTitle.CREATED_AT,
    value: EFieldByValue.CREATED_AT
  },
  {
    title: EFieldByTitle.NAME,
    value: EFieldByValue.NAME
  }
]

export const sortOrderOptions: { title: ESortOrderTitle; value: ESortOrderValue }[] = [
  {
    title: ESortOrderTitle.ASC,
    value: ESortOrderValue.ASC
  },
  {
    title: ESortOrderTitle.DESC,
    value: ESortOrderValue.DESC
  }
]

export const categoryStatus: IStatus[] = [
  {
    title: ECategoryStatus.INACTIVE,
    value: 0,
    className: 'text-orange-600 border-orange-600 bg-orange-200'
  },
  {
    title: ECategoryStatus.ACTIVE,
    value: 1,
    className: 'text-green-600 border-green-600 bg-green-200'
  }
]

export const rateStatus: IStatus[] = [
  {
    title: ERateStatus.INACTIVE,
    value: 0,
    className: 'text-orange-600 border-orange-600 bg-orange-200'
  },
  {
    title: ERateStatus.ACTIVE,
    value: 1,
    className: 'text-green-600 border-green-600 bg-green-200'
  }
]

export const orderStatus: IStatus[] = [
  {
    title: EOrderStatus.PENDING_CONFIRMATION,
    value: 1,
    className: 'text-yellow-600 border-yellow-600 bg-yellow-200'
  },
  {
    title: EOrderStatus.PENDING,
    value: 2,
    className: 'text-orange-600 border-orange-600 bg-orange-200'
  },
  {
    title: EOrderStatus.DELIVERED,
    value: 3,
    className: 'text-blue-600 border-blue-600 bg-blue-200'
  },
  {
    title: EOrderStatus.SHIPPED,
    value: 4,
    className: 'text-green-600 border-green-600 bg-green-200'
  },
  {
    title: EOrderStatus.CANCELED,
    value: -1,
    className: 'text-red-600 border-red-600 bg-red-200'
  }
  
]

export const employeeStatus: IStatus[] = [
  {
    title: EEmployeeStatus.INACTIVE,
    value: 0,
    className: 'text-orange-600 border-orange-600 bg-orange-200'
  },
  {
    title: EEmployeeStatus.ACTIVE,
    value: 1,
    className: 'text-green-600 border-green-600 bg-green-200'
  },
 
 
 
 
 
]

export const discountStatus: IStatus[] = [
  {
    title: EDiscountStatus.INACTIVE,
    value: 0,
    className: 'text-orange-600 border-orange-600 bg-orange-200'
  },
  {
    title: EDiscountStatus.ACTIVE,
    value: 1,
    className: 'text-green-600 border-green-600 bg-green-200'
  },
 
 
 
 
 
]

export const customerStatus: IStatus[] = [
  {
    title: ECustomerStatus.ACTIVE,
    value: 1,
    className: 'text-green-600 border-green-600 bg-green-200'
  },
  {
    title: ECustomerStatus.INACTIVE,
    value: 0,
    className: 'text-orange-600 border-orange-600 bg-orange-200'
  }
]

export const contactStatus: IStatus[] = [
  {
    title: EContactStatus.INACTIVE,
    value: 0,
    className: 'text-orange-600 border-orange-600 bg-orange-200'
  },
  {
    title: EContactStatus.ACTIVE,
    value: 1,
    className: 'text-green-600 border-green-600 bg-green-200'
  }
]

export const orderFieldOptions: { title: EFieldByTitle; value: EFieldByValue }[] = [
  {
    title: EFieldByTitle.FULLNAME,
    value: EFieldByValue.FULLNAME
  },
  {
    title: EFieldByTitle.PHONE_NUMBER,
    value: EFieldByValue.PHONE_NUMBER
  },
]

export const categoryFieldOptions: { title: EFieldByTitle; value: EFieldByValue }[] = [
  {
    title: EFieldByTitle.ID,
    value: EFieldByValue.ID
  }
]

export const employeeFieldOptions: { title: EFieldByTitle; value: EFieldByValue }[] = [
  {
    title: EFieldByTitle.FULLNAME,
    value: EFieldByValue.FULLNAME
  },
  {
    title: EFieldByTitle.EMAIL,
    value: EFieldByValue.EMAIL
  },
  {
    title: EFieldByTitle.PHONE_NUMBER,
    value: EFieldByValue.PHONE_NUMBER
  },
]

export const rateFieldOptions: { title: EFieldByTitle; value: EFieldByValue }[] = [
  {
    title: EFieldByTitle.FULLNAME,
    value: EFieldByValue.FULLNAME
  }
]

export const discountFieldOptions: { title: EFieldByTitle; value: EFieldByValue }[] = [
  {
    title: EFieldByTitle.NAME,
    value: EFieldByValue.NAME
  }
]

export const customerFieldOptions: { title: EFieldByTitle; value: EFieldByValue }[] = [
  {
    title: EFieldByTitle.FULLNAME,
    value: EFieldByValue.FULLNAME
  },
  {
    title: EFieldByTitle.EMAIL,
    value: EFieldByValue.EMAIL
  },
  {
    title: EFieldByTitle.PHONE_NUMBER,
    value: EFieldByValue.PHONE_NUMBER
  },
]

export const contactFieldOptions: { title: EFieldByTitle; value: EFieldByValue }[] = [
  {
    title: EFieldByTitle.ID,
    value: EFieldByValue.ID
  }
]

export const attributeValueFieldOptions: { title: EFieldByTitle; value: EFieldByValue }[] = [
  {
    title: EFieldByTitle.ID,
    value: EFieldByValue.ID
  }
]

export const orderTableHeaders: ITable[] = [
  { title: 'Id', value: 1, className: 'min-w-[20px] text-center' },
  { title: 'Email', value: 2, className: 'min-w-[80px]' },
  { title: 'Name', value: 3, className: 'min-w-[80px]' },
  { title: 'Phone Number', value: 4, className: 'min-w-[80px]' },
  { title: 'Address', value: 5, className: 'min-w-[80px]' },
  { title: 'Note', value: 6, className: 'min-w-[80px]' },
  { title: 'Pay Method', value: 7, className: 'min-w-[80px]' },
  { title: 'Total', value: 8, className: 'min-w-[80px]' },
  { title: 'Ship Date', value: 9, className: 'min-w-[80px]' },
  { title: 'Receive Date', value: 10, className: 'min-w-[80px]' },
  { title: 'Status', value: 11, className: 'min-w-[80px] text-center' },
  { title: 'Created At', value: 12, className: 'min-w-[80px]' },
  { title: 'Action', value: 14, className: 'min-w-[80px] text-center' }
]

export const employeeTableHeaders: ITable[] = [
  { title: 'Id', value: 1, className: 'min-w-[20px] text-center' },
  { title: 'Name', value: 2, className: 'min-w-[80px]' },
  { title: 'Phone Number', value: 3, className: 'min-w-[80px]' },
  { title: 'Email', value: 4, className: 'min-w-[80px]' },
  { title: 'Sex', value: 5, className: 'min-w-[80px]' },
  { title: 'Role', value: 6, className: 'min-w-[80px]' },
  { title: 'Status', value: 7, className: 'min-w-[80px] text-center' },
  { title: 'Created At', value: 8, className: 'min-w-[80px]' },
  { title: 'Updated At', value: 9, className: 'min-w-[80px]' },
  { title: 'Action', value: 10, className: 'min-w-[80px] text-center' }
]

export const rateTableHeaders: ITable[] = [
  { title: 'Id', value: 1, className: 'min-w-[20px] text-center' },
  { title: 'Product', value: 2, className: 'min-w-[200px]' },
  { title: 'Name', value: 3, className: 'min-w-[80px]' },
  { title: 'Star', value: 4, className: 'min-w-[80px] text-center' },
  { title: 'Content', value: 5, className: 'min-w-[80px]' },
  { title: 'Reply', value: 6, className: 'min-w-[150px] text-center' },
  { title: 'Status', value: 7, className: 'min-w-[100px] text-center' },
  { title: 'Created At', value: 8, className: 'min-w-[80px]' },
  { title: 'Action', value: 10, className: 'min-w-[80px] text-center' }
]

export const discountTableHeaders: ITable[] = [
  { title: 'Id', value: 1, className: 'min-w-[20px] text-center' },
  { title: 'Name', value: 2, className: 'min-w-[150px]' },
  { title: 'Discount', value: 3, className: 'min-w-[80px] text-center' },
  { title: 'Expire Date', value: 4, className: 'min-w-[150px]' },
  { title: 'Status', value: 5, className: 'min-w-[80px] text-center' },
  { title: 'Created At', value: 6, className: 'min-w-[150px]' },
  { title: 'Updated At', value: 7, className: 'min-w-[150px]' },
  { title: 'Action', value: 8, className: 'min-w-[80px] text-center' }
]

export const customerTableHeaders: ITable[] = [
  { title: 'Id', value: 1, className: 'min-w-[20px] text-center' },
  { title: 'Name', value: 2, className: 'min-w-[150px]' },
  { title: 'Phone Number', value: 3, className: 'min-w-[150px]' },
  { title: 'Email', value: 4, className: 'min-w-[150px]' },
  { title: 'Sex', value: 5, className: 'min-w-[80px] text-center' },
  { title: 'Birthday', value: 6, className: 'min-w-[150px]' },
  { title: 'Total Spending', value: 7, className: 'min-w-[150px] text-center' },
  { title: 'Status', value: 9, className: 'min-w-[100px] text-center' },
  { title: 'Created At', value: 10, className: 'min-w-[150px]' },
  { title: 'Updated At', value: 11, className: 'min-w-[150px]' },
  { title: 'Action', value: 12, className: 'min-w-[80px] text-center' }
]

export const tagTableHeaders: ITable[] = [
  { title: 'Id', value: 1, className: 'min-w-[20px] text-center' },
  { title: 'Name', value: 2, className: 'min-w-[150px]' },
  { title: 'Action', value: 3, className: 'min-w-[80px] text-center' }
]

export const contactTableHeaders: ITable[] = [
  { title: 'Id', value: 1, className: 'min-w-[20px] text-center' },
  { title: 'Title', value: 2, className: 'min-w-[150px]' },
  { title: 'Message', value: 3, className: 'min-w-[200px]' },
  { title: 'Full Name', value: 4, className: 'min-w-[150px]' },
  { title: 'Email', value: 5, className: 'min-w-[150px]' },
  { title: 'Phone Number', value: 6, className: 'min-w-[150px]' },
  { title: 'Status', value: 7, className: 'min-w-[100px] text-center' },
  { title: 'Created At', value: 8, className: 'min-w-[150px]' },
  { title: 'Action', value: 9, className: 'min-w-[80px] text-center' }
]

export const PAGINATION_CONFIG = {
  DEFAULT_LIMIT: 5,
  DEFAULT_PAGE: 1,
};