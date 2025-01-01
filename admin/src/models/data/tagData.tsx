import { ITagDetailResponse, ITagListResponse } from '../interfaces/tag'

export const tagListResponseData: ITagListResponse = {
  status: 200,
  data: {
    tags: [
      {
        id: 1,
        name: 'John Doe'
      },
      {
        id: 2,
        name: 'Jane Smith'
      },
      {
        id: 3,
        name: 'Alice Brown'
      }
    ],
    pagination: {
      currentPage: 1,
      totalPages: 2,
      totalRecords: 5
    }
  },
  message: 'Data fetched successfully.'
}

export const tagResponseData: ITagDetailResponse = {
  status: 200,
  data: {
    id: 1,
    name: 'John Doe'
  },
  message: 'Data fetched successfully.'
}
