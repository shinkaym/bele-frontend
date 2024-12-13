export interface ICategory {
  id: number
  name: string
  parentName: string | null
  parentId: number | 0 | string
  status: number
  deleted: number
  slug: string
  createdAt: string
}

export interface CategoryFormData {
  name: string
  parentId: number | string
  status: number
}
