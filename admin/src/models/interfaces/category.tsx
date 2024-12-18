export interface ICategory {
  id: number
  name: string
  referenceCategory: ICategory | null
  status: number
  slug: string
  createdAt: string
  updateAt:string
}

export interface ICategoryFormData {
  name: string
  parentId: number | string
  status: number
}
