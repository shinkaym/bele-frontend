import { IPagination } from './pagination'

export interface IAttributeValue {
  id: number
  name: string
  value: string
  attributeTypeId: number
  attributeType: null | any
  status: number
  deleted: boolean
  createdAt: string
  updatedAt: string
  variantAttributeValues: null | any
}

export interface IVariant {
  id: number
  productName: string
  price: number
  stock: number
  thumbnail: string
  status: number
  createdAt: string
  updatedAt: string
  attributeValues: IAttributeValue[]
}

export interface IVariantListResponse {
  variants: IVariant[]
  pagination: IPagination
}

export interface IVariantDetailResponse {
  variant: IVariant
}

export interface IVariantDeleteResponse {
  status: number
  message: string
}