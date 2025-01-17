import { IApiResponse, IOrder } from '@/models/interfaces'
import axiosPrivate from '../client/private.client'

const orderApi = {
  async getAll(): Promise<
    IApiResponse<{
      orders: {
        id: number
        status: number
      }
    }>
  > {
    return axiosPrivate.get('Order')
  },
  async getOne(id: number): Promise<IApiResponse<IOrder>> {
    return axiosPrivate.get(`Order/${id}`)
  },
  async cancel(id: number): Promise<IApiResponse<void>> {
    return axiosPrivate.patch(`Checkout/Cancel/${id}`)
  }
}

export default orderApi
