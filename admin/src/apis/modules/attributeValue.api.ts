// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import { IAttributeValue } from '@/models/interfaces/attribute'
import axiosPublic from '../client/public.client'
import { attributeValueData } from '@/models/data/attributeTypeData'

const attributeValueEndpoints = {
  list: 'attribute-value',
  detail: (id: string | number) => `attribute-value/${id}`
}

const attributeValueApi = {
  getList(): IAttributeValue[] {
    return attributeValueData
    // return axiosPublic.get(attributeValueEndpoints.list)
  },
  getAttrValue(id: number): IAttributeValue | undefined {
    return attributeValueData.find((val) => val.id === id)
    // return axiosPublic.get(attributeValueEndpoints.detail(id))
  }
}

export default attributeValueApi
