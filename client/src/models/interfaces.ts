export interface ICategory {
  id: number
  name: string
  parentName?: string
  referenceCategory: ICategory | null
  status: number
  slug: string
  createdAt: string
  updatedAt: string
}

export interface IDiscount {
  id: number
  name: string
  discount: number
  expireDate: string
  status: number
  createdAt: string
  updatedAt: string
}

export interface IColor {
  id: number
  name: string
  value: string
  thumbnail: string
}

export interface ISize {
  id: number
  name: string
}

export interface IAttributeType {
  id: number
  name: string
}

export interface IVariantAttributeVale {
  colorId: number
  sizeId: number
}

export interface IVariant {
  id: number // ID của sản phẩm
  stock: number
  price: number // Giá sản phẩm
  status: number // Trạng thái sản phẩm (1: hoạt động, 0: không hoạt động)
  updatedAt: string // Trạng thái xóa (0: chưa xóa, 1: đã xóa)
  createdAt: string // Thời gian tạo sản phẩm
  variantAttributeValue: IVariantAttributeVale | null
}

export interface IListVariantAttributeValue {
  color: IColor[]
  size: ISize[]
}

export interface IRateProduct {
  starAvg: number
  count: number
}

export interface ITag {
  id: number
  name: string
}
export interface IProduct {
  id: number // ID của sản phẩm
  name: string // Tên sản phẩm
  category: ICategory
  thumbnail: string
  description: string
  discount: IDiscount | null
  rate: IRateProduct | null
  tag: ITag[]
  basePrice: number // Giá sản phẩm
  slug: string // URL slug của sản phẩm
  view: number // Số lượt xem sản phẩm
  like: number // Số lượt thích sản phẩm
  status: number // Trạng thái sản phẩm (1: hoạt động, 0: không hoạt động)
  updatedAt: string // Trạng thái xóa (0: chưa xóa, 1: đã xóa)
  createdAt: string // Thời gian tạo sản phẩm
  variant: IVariant[]
  variantAttributeTypes: IListVariantAttributeValue | null
}
