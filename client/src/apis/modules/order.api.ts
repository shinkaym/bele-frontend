import { IApiResponse, IOrder } from '@/models/interfaces'
import axiosPrivate from '../client/private.client'

const orderApi = {
  async getAll(status: string | number): Promise<
    IApiResponse<{
      orders: {
        id: number
        status: number
      }
    }>
  > {
    const params = status !== '' ? { status } : {}
    return axiosPrivate.get('Order', { params })
  },
  async getOne(id: number): Promise<IApiResponse<IOrder>> {
    return axiosPrivate.get(`Order/detail/${id}`)
  },
  async cancel(id: number): Promise<IApiResponse<void>> {
    return axiosPrivate.delete(`Checkout/Cancel/${id}`)
  }
}

export default orderApi
