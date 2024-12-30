import { IPagination } from './pagination'

export interface IEmployee {
  id: number
  name: string
  phoneNumber: string
  email: string
  sex: string
  role: string
  status: number
  createdAt: string
  updatedAt: string
  accessToken: string
  refreshToken: string
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
  data: IEmployee[]
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