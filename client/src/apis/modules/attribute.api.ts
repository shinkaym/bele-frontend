import { IAddress, IApiResponse, IAttributeValue } from '@/models/interfaces'
import axiosPublic from '../client/public.client'

const attributeApi = {
  async getAll(typeId:number): Promise<IApiResponse<{ attributeValues: IAttributeValue[] }>> {
    return axiosPublic.get('/Attribute/value/' + typeId)
  },
}

export default attributeApi
