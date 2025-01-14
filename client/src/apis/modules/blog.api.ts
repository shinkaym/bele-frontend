import axiosPrivate from '../client/private.client'
import { IApiResponse, IBlog } from '@/models/interfaces'

const blogEndpoints = {
  getBlogs: 'blogs',
  getBlogById: (id: string) => `blogs/${id}`,
  createBlog: 'blogs',
  updateBlog: (id: string) => `blogs/${id}`,
  deleteBlog: (id: string) => `blogs/${id}`
}

const blogApi = {
  async getBlogs(): Promise<IApiResponse<IBlog[]>> {
    return axiosPrivate.get(blogEndpoints.getBlogs)
  },
  async getBlogById(id: string): Promise<IApiResponse<IBlog>> {
    return axiosPrivate.get(blogEndpoints.getBlogById(id))
  }
}

export default blogApi
