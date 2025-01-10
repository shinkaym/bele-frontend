// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import axiosPublic from '../client/public.client'
import { EFieldByValue, ESortOrderValue } from '@/models/enums/option'
import { IApiResponse } from '@/models/interfaces/api'
import { IVariant } from '@/models/interfaces/variant'

const variantApi = {
  async list(params: {
    page: number
    limit: number
    query: string
    field: EFieldByValue
    status: any
    sort: EFieldByValue
    order: ESortOrderValue
  }): Promise<IApiResponse<VariantListResponse>> {
    try {
      const filteredParams = Object.fromEntries(Object.entries(params).filter(([_, value]) => value !== null))
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
}

export default variantApi
