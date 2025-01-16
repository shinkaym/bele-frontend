import { IApiResponse, IPagination, IProduct, IProductDetail } from '@/models/interfaces'
import axiosPublic from '../client/public.client'
import axiosPrivate from '../client/private.client'

const productEndpoints = {
  list: 'Product',
  removeFromWishlist: 'Product',
  detail: (id: string | number) => `product/${id}`,
  hdetail: (slug: string) => `Product/detail/${slug}`,
  wishlist: 'Product/wishlist'
}

const productApi = {
  async list(params: { TagId: number }): Promise<IApiResponse<{ products: IProduct[] }>> {
    return axiosPublic.get(productEndpoints.list, { params: { ...params } })
  },
  async detail(params: { Slug: string }): Promise<IApiResponse<{ product: IProductDetail }>> {
    return axiosPublic.get(productEndpoints.hdetail(params.Slug))
  },
  async wishlist(params: {
    page: number
    limit: number
  }): Promise<IApiResponse<{ products: IProduct[]; pagination: IPagination }>> {
    return axiosPrivate.get(productEndpoints.wishlist, { params })
  },
  async removeFromWishlist(productId: number): Promise<IApiResponse<void>> {
    return axiosPrivate.patch(productEndpoints.removeFromWishlist, { params: { productId, action: 'Remove' } })
  }
}

export default productApi
