export interface IAttributeType {
  id: number | string
  name: string
  createdAt: string
  updatedAt: string
  attributeValues: IAttributeValue | null
  productAttributeTypes: null
}

export interface IAttributeValue {
  id: number | string
  attributeType: IAttributeType
  name: string
  value: string
  status: number
  createdAt: string
  updatedAt: string
}
