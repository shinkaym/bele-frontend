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
  }
}

export default cartApi
