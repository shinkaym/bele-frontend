import axiosPublic from '../client/public.client'
import { EFieldByValue, ESortOrderValue } from '@/models/enums/option'
import { IApiResponse } from '@/models/interfaces/api'
import { IProductDetailResponse, IProductListResponse } from '@/models/interfaces/product'

const productApi = {
  async list(params: {
    page: number
    limit: number
    query: string
    field: EFieldByValue
    status: any
    sort: EFieldByValue
    order: ESortOrderValue
  }): Promise<IApiResponse<IProductListResponse>> {
    try {
      const filteredParams = Object.fromEntries(Object.entries(params).filter(([_, value]) => value !== null))
      return await axiosPublic.get('Product', { params: filteredParams })
    } catch (error) {
      throw error
    }
  },
  async detail({ id }: { id: number }): Promise<IApiResponse<IProductDetailResponse>> {
    try {
      return await axiosPublic.get(`Product/${id}`)
    } catch (error) {
      throw error
    }
  },

  async delete({ id }: { id: number }): Promise<IApiResponse> {
    try {
      return await axiosPublic.delete(`Product/${id}`)
    } catch (error) {
      throw error
    }
  },

  async updateStatus({
    id,
    status
  }: {
    id: number
    status: number
  }): Promise<IApiResponse> {
    try {
      return await axiosPublic.patch(`Product/${id}`, { 
        modifyField: 'Status',
        modifyValue: status.toString()
       })
    } catch (error) {
      throw error
    }
  },
}

export default productApi
