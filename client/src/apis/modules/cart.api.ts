/* eslint-disable @typescript-eslint/no-explicit-any */
import { IApiResponse, ICart } from '@/models/interfaces'
import axiosPrivate from '../client/private.client'

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars

const cartApi = {
  async list(): Promise<IApiResponse<{ cart: ICart }>> {
    return axiosPrivate.get('Cart')
  },
  async add(data: { variantId: number; quantity: number }): Promise<IApiResponse<{ cart: ICart }>> {
    return axiosPrivate.put('Cart', { ...data })
  },
  async delete(): Promise<IApiResponse<{ cart: ICart }>> {
    return axiosPrivate.delete('Cart')
  },
  async sub(variantId: number): Promise<IApiResponse<{ cart: ICart }>> {
    return axiosPrivate.put('Cart', { variantId, quantity: -1 })
  },
  async checkout(
    payMethod: string,
    data: {
      fullName: string
      phoneNumber: string
      address: string
      note: string
    }
  ): Promise<IApiResponse<string | any>> {
    return axiosPrivate.post(`Checkout/${payMethod}`, data)
  }
}

export default cartApi
