export interface ICategory {
  id: number
  name: string
  referenceCategory: ICategory | null
  status: number
  slug: string
  createdAt: string
  updateAt:string
}
