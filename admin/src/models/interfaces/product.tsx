export interface IProduct {
  id: number | string // ID của sản phẩm
  name: string // Tên sản phẩm
  categoryId: string | number // Danh mục sản phẩm
  categoryName:string
  thumbnail:string
  description:string
  discountId:number | string
  discountName:number | string
  basePrice: number // Giá sản phẩm
  slug: string // URL slug của sản phẩm
  view: number // Số lượt xem sản phẩm
  like: number // Số lượt thích sản phẩm
  status: number // Trạng thái sản phẩm (1: hoạt động, 0: không hoạt động)
  deleted: number // Trạng thái xóa (0: chưa xóa, 1: đã xóa)
  createdAt: string // Thời gian tạo sản phẩm
  attributeType:string[]
}
