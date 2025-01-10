// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import { IAttributeType, IAttributeValue } from '@/models/interfaces/attribute'
import axiosPublic from '../client/public.client'
import { attributeValueData } from '@/models/data/attributeTypeData'
import { IApiResponse } from '@/models/interfaces/api'
import axiosPrivate from '../client/private.client'

const attributeValueEndpoints = {
  list: 'attribute-value',
  detail: (id: string | number) => `attribute-value/${id}`
}

const attributeApi = {
  getList(): IAttributeValue[] {
    return attributeValueData
    // return axiosPublic.get(attributeValueEndpoints.list)
  },
  getAttrValue(id: number): IAttributeValue | undefined {
    return attributeValueData.find((val) => val.id === id)
    // return axiosPublic.get(attributeValueEndpoints.detail(id))
  },
  async listAttributeTypes(): Promise<IApiResponse<{ attributeTypes: IAttributeType[] }>> {
    return axiosPrivate.get('Attribute')
  },
  async listAttributeValues(params: {
      query: string
      field: string
    }): Promise<IApiResponse<{ attributeValues: IAttributeValue[] }>> {
    return axiosPrivate.get('Attribute/value',{params})
  }
}

export default attributeApi
