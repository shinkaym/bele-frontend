import { IApiResponse, IPagination, IProduct, IProductDetail, IProductReview } from '@/models/interfaces'
import axiosPublic from '../client/public.client'
import axiosPrivate from '../client/private.client'

const productEndpoints = {
  list: 'Product',
  removeFromWishlist: 'Product',
  detail: (id: string | number) => `product/${id}`,
  hdetail: (slug: string) => `Product/detail/${slug}`,
  wishlist: 'Product/wishlist',
  rated: 'Rate/rated',
  unrated: 'Rate/Not-Rated'
}

const productApi = {
  async list(filter: {
    TagId?: number
    CategoryId?: number
    Color?: string
    Size?: string
    CategoryRefId?:number
  },params:{page?:number;limit?:number}): Promise<IApiResponse<{ products: IProduct[] ; pagination:IPagination }>> {
    return axiosPublic.get(productEndpoints.list, { params: { ...filter,...params } })
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
  async rated(params: {
    page: number
    limit: number
  }): Promise<IApiResponse<{ items: IProductReview[]; pagination: IPagination }>> {
    return axiosPrivate.get(productEndpoints.rated, { params })
  },
  async unrated(params: {
    page: number
    limit: number
  }): Promise<IApiResponse<{ items: IProduct[]; pagination: IPagination }>> {
    return axiosPrivate.get(productEndpoints.unrated, { params })
  },
  async removeFromWishlist(productId: number): Promise<IApiResponse<void>> {
    return axiosPrivate.patch(productEndpoints.removeFromWishlist, { params: { productId, action: 'Remove' } })
  }
}

export default productApi
