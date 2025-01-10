import axiosPublic from '../client/public.client'
import { EFieldByValue, ESortOrderValue } from '@/models/enums/option'
import { IApiResponse } from '@/models/interfaces/api'
import { IVariantDetailResponse, IVariantListResponse } from '@/models/interfaces/variant'

const variantApi = {
  async list(params: {
    page: number
    limit: number
    field: EFieldByValue
    status: any
    productId: number
    sort: EFieldByValue
    order: ESortOrderValue
  }): Promise<IApiResponse<IVariantListResponse>> {
    try {
      const filteredParams = Object.fromEntries(Object.entries(params).filter(([_, value]) => value !== null))
      console.log('🚀 ~ filteredParams:', filteredParams)
      return await axiosPublic.get('Variant', { params: filteredParams })
    } catch (error) {
      throw error
    }
  },
  async detail({ id }: { id: number }): Promise<IApiResponse<IVariantDetailResponse>> {
    try {
      return await axiosPublic.get(`Variant/${id}`)
    } catch (error) {
      throw error
    }
  },

  async delete({ id }: { id: number }): Promise<IApiResponse> {
    try {
      return await axiosPublic.delete(`Variant/${id}`)
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
      return await axiosPublic.patch(`Variant/${id}`, { 
        modifyField: 'Status',
        modifyValue: status.toString()
       })
    } catch (error) {
      throw error
    }
  },
}

export default variantApi
