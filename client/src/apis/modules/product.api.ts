import { IApiResponse, IModifyProduct, IPagination, IProduct,IProductDetail } from '@/models/interfaces'
import axiosPublic from '../client/public.client'
import axiosPrivate from '../client/private.client'

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const productEndpoints = {
  list: 'Product',
  detail: (id: string | number) => `product/${id}`,
  hdetail:(slug: string) => `Product/detail/${slug}`,
  updateWishList:(id:number)=>`Product/wishlist/${id}`,
  modifyProduct:(id:number)=>`Product/${id}`
}

const productApi = {
  async list(filter: {
    TagId?: number
    CategoryId?: number
    Color?: string
    Size?: string
  },params:{page?:number;limit?:number}): Promise<IApiResponse<{ products: IProduct[] ; pagination:IPagination }>> {
    return axiosPublic.get(productEndpoints.list, { params: { ...filter,...params } })
  },
  async detail(params:{Slug:string}):Promise<IApiResponse<{ product: IProductDetail }>> {
    return axiosPublic.get(productEndpoints.hdetail(params.Slug))
  },

  async updateWishList(params:{id:number,actionWishList:string}):Promise<IApiResponse<{}>>{
    return axiosPrivate.patch(productEndpoints.updateWishList(params.id),null,{params:{actionWishList:params.actionWishList}})
  },
  async modifyProduct(params:{id:number},data:IModifyProduct):Promise<IApiResponse<{}>>{
    return axiosPublic.patch(productEndpoints.modifyProduct(params.id),{...data},{})
  }
}

export default productApi
