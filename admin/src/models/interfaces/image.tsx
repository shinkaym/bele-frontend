export interface IImage {
  id: number | string
  imageType: string
  name: string
  url: string
  status: number | string
  deleted: number | string
  createdAt: string
}

export interface IImageFormData {
  name: string
  parentId: number | string
  status: number
}
