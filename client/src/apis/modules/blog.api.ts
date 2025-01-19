import { IApiResponse, IBlog, IBlogListResponse } from '@/models/interfaces'
import axiosPrivate from '../client/private.client'

const blogApi = {
  // Lấy danh sách blogs với phân trang
  async getAll(): Promise<IApiResponse<IBlogListResponse>> {
    try {
      const response = await axiosPrivate.get<IApiResponse<IBlogListResponse>>('/blog', {params: { limit: 2 }})
      return response.data
    } catch (error) {
      console.error('Error in getAll:', error)
      throw error
    }
  },

  // Lấy thông tin chi tiết một blog
  async getById(id: number): Promise<IBlog> {
    try {
      const response = await axiosPrivate.get<{ blog: IBlog }>(`/blog/${id}`)
      return response.data.blog
    } catch (error) {
      console.error(`Error in getById (id: ${id}):`, error)
      throw error
    }
  }
}

export default blogApi
