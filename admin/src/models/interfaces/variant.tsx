import { IProduct } from "./product"

export interface IVariantAttributeVale{
    color?:{
        id:number | string,
        name:string,
        value:string
    },
    size?:{
        id:number | string,
        name:string
    }
}

export interface IVariant {
    id: number | string // ID của sản phẩm
    product: IProduct
    thumbnail:string
    stock:number
    price: number // Giá sản phẩm
    status: number | string // Trạng thái sản phẩm (1: hoạt động, 0: không hoạt động)
    updatedAt: string // Trạng thái xóa (0: chưa xóa, 1: đã xóa)
    createdAt: string // Thời gian tạo sản phẩm
    variantAttributeValue:IVariantAttributeVale | null
  }