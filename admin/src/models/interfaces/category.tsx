export interface ICategory {
  id: number
  name: string
  parentName?: string
  referenceCategory: ICategory | null
  status: number
  slug: string
  createdAt: string
  updatedAt:string
}
