import {
  IOrderDeleteResponse,
  IOrderDetailResponse,
  IOrderListResponse,
  IOrderUpdateStatusResponse
} from '@/models/interfaces/order'
import axiosPublic from '../client/public.client'
import { IApiResponse } from '@/models/interfaces/api'
import { IOrderListResponseData } from '@/models/data/orderData'

const orderEndpoints = {
  list: 'order',
  detail: ({ id }: { id: number }) => `order/${id}`,
  delete: ({ id }: { id: number }) => `order/delete/${id}`,
  updateStatus: ({ id }: { id: number }) => `order/update/status/${id}`
}

const orderApi = {
  // async list(): Promise<IApiResponse<IOrderListResponse>> {
  list(): IOrderListResponse {
    try {
      // return await axiosPublic.get(orderEndpoints.list)
      return IOrderListResponseData
    } catch (error) {
      throw error
    }
  },

  async detail({ id }: { id: number }): Promise<IOrderDetailResponse> {
    try {
      return await axiosPublic.get(orderEndpoints.detail({ id }))
    } catch (error) {
      throw error
    }
  },

  async delete({ id }: { id: number }): Promise<IOrderDeleteResponse> {
    try {
      return await axiosPublic.delete(orderEndpoints.delete({ id }))
    } catch (error) {
      throw error
    }
  },

  async updateStatus({ id, status }: { id: number; status: number }): Promise<IOrderUpdateStatusResponse> {
    try {
      return await axiosPublic.patch(orderEndpoints.updateStatus({ id }), { status })
    } catch (error) {
      throw error
    }
  }
}

export default orderApi
