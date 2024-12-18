export interface ICategory {
  id: number
  name: string
  parentName: string | null
  parentId: number | 0 | string
  status: number
  slug: string
  createdAt: string
  UpdateAt:string
}

export interface ICategoryFormData {
  name: string
  parentId: number | string
  status: number
}
