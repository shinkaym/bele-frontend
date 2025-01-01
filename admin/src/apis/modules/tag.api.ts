// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars

import { tagListResponseData, tagResponseData } from '@/models/data/tagData'
import { ITagAddResponse, ITagDeleteResponse, ITagDetailResponse, ITagListResponse, ITagUpdateResponse } from '@/models/interfaces/tag'
import axiosPublic from '../client/public.client'

const tagEndpoints = {
  list: 'tag',
  detail: ({ id }: { id: number }) => `tag/${id}`,
  delete: ({ id }: { id: number }) => `tag/delete/${id}`,
  add: 'tag/add',
  update: ({ id }: { id: number }) => `tag/update/${id}`
}

const tagApi = {
  // async list(): Promise<IApiResponse<ITagListResponse>> {
  list(): ITagListResponse {
    try {
      // return await axiosPublic.get(tagEndpoints.list)
      return tagListResponseData
    } catch (error) {
      throw error
    }
  },

  // async detail({ id }: { id: number }): Promise<ITagDetailResponse> {
  detail({ id }: { id: number }): ITagDetailResponse {
    try {
      // return await axiosPublic.get(tagEndpoints.detail({ id }))
      return tagResponseData
    } catch (error) {
      throw error
    }
  },

  async delete({ id }: { id: number }): Promise<ITagDeleteResponse> {
    try {
      return await axiosPublic.delete(tagEndpoints.delete({ id }))
    } catch (error) {
      throw error
    }
  },

  async add(data: { name: string }): Promise<ITagAddResponse> {
    try {
      const response = await axiosPublic.post(tagEndpoints.add, data)
      return response.data
    } catch (error) {
      throw error
    }
  },

  async update({
    id,
    data
  }: {
    id: number
    data: {
      name: string
    }
  }): Promise<ITagUpdateResponse> {
    try {
      const response = await axiosPublic.put(tagEndpoints.update({ id }), data)
      return response.data
    } catch (error) {
      throw error
    }
  }
}

export default tagApi
