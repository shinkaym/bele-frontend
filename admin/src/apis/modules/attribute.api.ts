// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import {
  IAttributeType,
  IAttributeValue,
  IAttributeValueDetailResponse,
  IAttributeValueListResponse
} from '@/models/interfaces/attribute'
import axiosPublic from '../client/public.client'
import { attributeValueData } from '@/models/data/attributeTypeData'
import { IApiResponse } from '@/models/interfaces/api'
import axiosPrivate from '../client/private.client'
import { EFieldByValue, ESortOrderValue } from '@/models/enums/option'
import { EAttributeValueStatus } from '@/models/enums/status'

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
    page?: number
    limit?: number
    query?: string
    field?: EFieldByValue
    status?: EAttributeValueStatus | null
    sort?: EFieldByValue
    order?: ESortOrderValue
  }): Promise<IApiResponse<IAttributeValueListResponse>> {
    return axiosPrivate.get('Attribute/value', { params })
  },
  async delete({ id }: { id: number }): Promise<IApiResponse> {
    try {
      return await axiosPublic.delete(`Attribute/value/${id}`)
    } catch (error) {
      throw error
    }
  },
  async add(
    id: number,
    data: { status: number; name: string; attributeTypeId: string | number; value?: string | undefined }
  ): Promise<IApiResponse<IAttributeValueDetailResponse>> {
    try {
      return await axiosPublic.post(`Attribute/value/${id}`, { ...data })
    } catch (error) {
      throw error
    }
  },
  async edit(
    id: number,
    data: { status: number | string; name: string; attributeTypeId: string | number; value?: string | undefined }
  ): Promise<IApiResponse<IAttributeValueDetailResponse>> {
    try {
      return await axiosPublic.put(`Attribute/value/${id}`, { ...data })
    } catch (error) {
      throw error
    }
  },
  async updateStatus({ id, status }: { id: number; status: number }): Promise<IApiResponse> {
    try {
      return await axiosPublic.patch(`Attribute/value/${id}`, status)
    } catch (error) {
      throw error
    }
  },
  async detail({ id }: { id: number }): Promise<IApiResponse<IAttributeValueDetailResponse>> {
    try {
      return await axiosPublic.get(`Attribute/value/${id}`)
    } catch (error) {
      throw error
    }
  }
}

export default attributeApi
