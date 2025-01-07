// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import { IApiResponse } from '@/models/interfaces/api'
import { ICategory } from '@/models/interfaces/category'
import axiosPrivate from '../client/private.client'
import axiosPublic from '../client/public.client'
import { EFieldByValue, ESortOrderValue } from '@/models/enums/option'
import { IPagination } from '@/models/interfaces/pagination'

const categoryEndpoints = {
  list: 'Category',
  detail: (id: string | number) => `category/${id}`
}

const categoryApi = {
  list(params: {
    page: number
    limit: number
    query: string
    field: EFieldByValue
    status: any
    sort: EFieldByValue
    order: ESortOrderValue
  }): Promise<IApiResponse<{ categories: ICategory[] , pagination: IPagination }>> {
    return axiosPrivate.get('Category', { params })
  },
  detail(id: number): Promise<IApiResponse<{ categorie: ICategory }>> {
    return axiosPublic.get(`category/${id}`)
  },
  delete(id: number): Promise<IApiResponse<{ categorie: ICategory }>> {
    return axiosPublic.delete(`category/${id}`)
  },
  updateStatus(id: number, status: number): Promise<IApiResponse<{ categorie: ICategory }>> {
    return axiosPublic.patch(`category/${id}`, { status })
  }
}

export default categoryApi
