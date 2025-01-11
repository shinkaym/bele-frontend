import { IApiResponse, ICategory } from '@/models/interfaces'
import axiosPublic from '../client/public.client'

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const categoryEndpoints = {
  list: 'category',
  detail: (id: string | number) => `category/${id}`
}

const categoryApi = {
  async list(): Promise<IApiResponse<{ categories: ICategory[] }>> {
    return axiosPublic.get(categoryEndpoints.list)
  }
}

export default categoryApi
