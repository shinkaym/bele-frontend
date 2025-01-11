import { IApiResponse, ITag } from '@/models/interfaces'
import axiosPublic from '../client/public.client'

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const tagEndpoints = {
  list: 'Tag',
  detail: (id: string | number) => `tag/${id}`
}

const tagApi = {
  async list(): Promise<IApiResponse<{ tags: ITag[] }>> {
    return axiosPublic.get(tagEndpoints.list)
  }
}

export default tagApi
