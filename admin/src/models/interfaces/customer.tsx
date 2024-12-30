import { IPagination } from './pagination'

export interface ICustomer {
  id: number
  fullName: string
  phoneNumber: string
  email: string
  sex: number // 1: Male, 0: Female
  birthday: string
  password: string
  totalSpending: number
  lastOperatingTime: string
  status: number // 1: Active, 0: Inactive
  deleted: number // 0: Not Deleted, 1: Deleted
  createdAt: string
  updatedAt: string
}

export interface ICustomerListResponse {
  status: number
  data: {
    customers: ICustomer[]
    pagination: IPagination
  }
  message: string
}

export interface ICustomerDetailResponse {
  status: number
  data: ICustomer
  message: string
}

export interface ICustomerDeleteResponse {
  status: number
  message: string
}

export interface ICustomerUpdateStatusResponse {
  status: number
  data: {
    id: number | string
    status: number | string
    updatedAt: string
  }
  message: string
}
