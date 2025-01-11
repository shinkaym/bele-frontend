import { IApiResponse, IProduct } from '@/models/interfaces'
import axiosPublic from '../client/public.client'

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const productEndpoints = {
  list: 'Product',
  detail: (id: string | number) => `product/${id}`
}

const productApi = {
  async list(params: { TagId: number }): Promise<IApiResponse<{ products: IProduct[] }>> {
    return axiosPublic.get(productEndpoints.list, { params: { ...params } })
  }
}

export default productApi
