// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import { ICategory } from '@/models/interfaces/category'
import axiosPublic from '../client/public.client'

const categoryEndpoints = {
  list: 'category',
  detail: (id: string | number) => `category/${id}`
}

const categoryApi = {
  getList():Promise<ICategory[]>{
    return axiosPublic.get(categoryEndpoints.list)
  },
  getCat(id: number):Promise<ICategory>{
    return axiosPublic.get(categoryEndpoints.detail(id))
  }
}

export default categoryApi
