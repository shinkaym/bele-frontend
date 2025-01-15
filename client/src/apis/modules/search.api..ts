// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import { IApiResponse, IPagination, IProduct } from '@/models/interfaces'
import axiosPublic from '../client/public.client'

const searchApi = {
  all(
    searchName: string,
    params: {
      page?: number
      limit?: number
    }
  ): Promise<IApiResponse<{ searchedProducts: IProduct[]; pagination: IPagination }>> {
    return axiosPublic.get('Product/search/' + searchName, { params })
  }
}

export default searchApi
