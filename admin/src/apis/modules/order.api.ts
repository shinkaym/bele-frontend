import {
  IOrder,
  IOrderListResponse,
  IOrderUpdateStatusResponse
} from '@/models/interfaces/order'
import axiosPublic from '../client/public.client'
import { IApiResponse } from '@/models/interfaces/api'
import { EFieldByValue, ESortOrderValue } from '@/models/enums/option'

const orderApi = {
  async list(params: {
    page: number
    limit: number
    query: string
    field: EFieldByValue
    status: any
    sort: EFieldByValue
    order: ESortOrderValue
  }): Promise<IApiResponse<IOrderListResponse>> {
    try {
      const filteredParams = Object.fromEntries(Object.entries(params).filter(([_, value]) => value !== null))
      return await axiosPublic.get(`Order`, { params: filteredParams })
    } catch (error) {
      throw error
    }
  },

  async detail({ id }: { id: number }): Promise<IApiResponse<IOrder>> {
    try {
      return await axiosPublic.get(`Order/${id}`)
    } catch (error) {
      throw error
    }
  },

  async delete({ id }: { id: number }): Promise<IApiResponse> {
    try {
      return await axiosPublic.delete(`Order/${id}`)
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
  }): Promise<IApiResponse<IOrderUpdateStatusResponse>> {
    try {
      return await axiosPublic.patch(`Order/${id}`, { status })
    } catch (error) {
      throw error
    }
  },
}

export default orderApi
