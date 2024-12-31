import { IPagination } from './pagination'

export interface IEmployee {
  id: number
  name: string
  phoneNumber: string
  password?: string
  email: string
  sex: string
  role: number
  status: number
  createdAt?: string
  updatedAt?: string
}

export interface IEmployeeListResponse {
  status: number
  data: {
    employees: IEmployee[]
    pagination: IPagination
  }
  message: string
}

export interface IEmployeeDetailResponse {
  status: number
  data: IEmployee
  message: string
}

export interface IEmployeeDeleteResponse {
  status: number
  message: string
}

export interface IEmployeeDeleteResponse {
  status: number
  message: string
}

export interface IEmployeeUpdateStatusResponse {
  status: number
  data: {
    id: number,
    status: number,
    updatedAt: string
  }
  message: string
}

export interface IEmployeeAddResponse {
  status: number
  data: {
    name: string,
      phoneNumber: string,
      email: string,
      sex: string,
      role: number,
      password: string,
      status: string
  }
  message: string
}

export interface IEmployeeUpdateResponse {
  status: number
  data: {
    name: string,
      phoneNumber: string,
      email: string,
      sex: string,
      role: number,
      password: string,
      status: string
  }
  message: string
}