import { IPagination } from './pagination'

export interface IOrder {
  id: number
  email: string
  name: string
  phoneNumber: string
  address: string
  note: string
  payMethod: string | number
  totalMoney: number
  shipDate: string
  receiveDate: string
  status: number
  createdAt?: string
  updatedAt?: string
  products?: {
    id: number
    name: string
    image: string
    color: string
    size: string
    quantity: number
    price: number
  }[]
}

export interface IOrderListResponse {
  status: number
  data: {
    orders: IOrder[]
    pagination: IPagination
  }
  message: string
}

export interface IOrderDetailResponse {
  status: number
  data: {
    id: number
    email: string
    name: string
    phoneNumber: string
    address: string
    note: string
    payMethod: string
    totalMoney: number
    shipDate: string
    receiveDate: string
    status: number
    products: {
      id: number
      name: string
      image: string
      color: string
      size: string
      quantity: number
      price: number
    }[]
  }
  message: string
}

export interface IOrderDeleteResponse {
  status: number
  message: string
}

export interface IOrderDeleteResponse {
  status: number
  message: string
}

export interface IOrderUpdateStatusResponse {
  status: number
  data: {
    id: number
    status: number
    updatedAt: string
  }
  message: string
}
