import { IApiResponse, IProduct,IProductDetail } from '@/models/interfaces'
import axiosPublic from '../client/public.client'

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const productEndpoints = {
  list: 'Product',
  detail: (id: string | number) => `product/${id}`,
  hdetail:(slug: string) => `Product/detail/${slug}`,
}

const productApi = {
  async list(params: { TagId: number }): Promise<IApiResponse<{ products: IProduct[] }>> {
    return axiosPublic.get(productEndpoints.list, { params: { ...params } })
  },
  async detail(params:{Slug:string}):Promise<IApiResponse<{ product: IProductDetail }>> {
    return axiosPublic.get(productEndpoints.hdetail(params.Slug))
  }
}

export default productApi
