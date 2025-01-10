// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import {
  IAttributeValue,
  IAttributeValueDetailResponse,
  IAttributeValueListResponse
} from '@/models/interfaces/attribute'
import axiosPublic from '../client/public.client'
import { attributeValueData } from '@/models/data/attributeTypeData'
import { EFieldByValue, ESortOrderValue } from '@/models/enums/option'
import { IApiResponse } from '@/models/interfaces/api'

const attributeValueApi = {
  async list(params: {
    page: number
    limit: number
    query: string
    field: EFieldByValue
    status: any
    sort: EFieldByValue
    order: ESortOrderValue
  }): Promise<IApiResponse<IAttributeValueListResponse>> {
    try {
      const filteredParams = Object.fromEntries(Object.entries(params).filter(([_, value]) => value !== null))
      return await axiosPublic.get('Attribute/value', { params: filteredParams })
    } catch (error) {
      throw error
    }
  },

  async detail({ id }: { id: number }): Promise<IApiResponse<IAttributeValueDetailResponse>> {
    try {
      return await axiosPublic.get(`Attribute/${id}`)
    } catch (error) {
      throw error
    }
  },

  async delete({ id }: { id: number }): Promise<IApiResponse> {
    try {
      return await axiosPublic.delete(`Attribute/${id}`)
    } catch (error) {
      throw error
    }
  },

  async updateStatus({ id, status }: { id: number; status: number }): Promise<IApiResponse> {
    try {
      return await axiosPublic.patch(`Attribute/${id}`, status)
    } catch (error) {
      throw error
    }
  }
}

export default attributeValueApi
