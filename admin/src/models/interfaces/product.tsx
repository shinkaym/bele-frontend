import { IAttributeType } from "./attribute"
import { ICategory } from "./category"
import { IDiscount } from "./discount"

export interface IProduct {
  id: number | string // ID của sản phẩm
  name: string // Tên sản phẩm
  category:ICategory
  thumbnail:string
  description:string
  discount:IDiscount
  basePrice: number // Giá sản phẩm
  slug: string // URL slug của sản phẩm
  view: number // Số lượt xem sản phẩm
  like: number // Số lượt thích sản phẩm
  status: number // Trạng thái sản phẩm (1: hoạt động, 0: không hoạt động)
  updatedAt: string // Trạng thái xóa (0: chưa xóa, 1: đã xóa)
  createdAt: string // Thời gian tạo sản phẩm
  attributeTypes:IAttributeType[]  
}
