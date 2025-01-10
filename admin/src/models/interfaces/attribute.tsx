import { IPagination } from './pagination'

export interface IAttributeType {
  id: number | string
  name: string
  createdAt: string
  updatedAt: string
  attributeValues: IAttributeValue | null
  productAttributeTypes: null
}

export interface IAttributeValue {
  id: number
  name: string
  value: string
  attributeTypeName?: string
  attributeTypeId?: number
  attributeType?: null | any
  status: number
  deleted?: boolean
  createdAt: string
  updatedAt: string
  variantAttributeValues?: null | any
}

export interface IAttributeValueListResponse {
  attributeValues: IAttributeValue[]
  pagination: IPagination
}

export interface IAttributeValueDetailResponse {
  attributeValue: IAttributeValue
}

export interface IAttributeValueDeleteResponse {
  status: number
  message: string
}