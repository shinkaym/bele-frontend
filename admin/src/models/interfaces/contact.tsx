import { IPagination } from './pagination'

export interface IContact {
  id: number
  title: string
  message: string
  fullName: string
  email: string
  phoneNumber: string
  status: number
  deleted: boolean
  createdAt: string
}

export interface IContactListResponse {
  status: number
  data: {
    contacts: IContact[]
    pagination: IPagination
  }
  message: string
}

export interface IContactDetailResponse {
  status: number
  data: IContact
  message: string
}

export interface IContactDeleteResponse {
  status: number
  message: string
}

export interface IContactUpdateStatusResponse {
  status: number
  data: {
    id: number
    status: number
  }
  message: string
}