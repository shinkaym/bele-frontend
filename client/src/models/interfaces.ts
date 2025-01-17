/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IApiResponse<T> {
  status: number
  message: string
  data?: T
}
export interface ICategory {
  id: number
  name: string
  parentName?: string
  referenceCategory?: ICategory[] | []
  slug: string
  type?: string
}

export interface IDiscount {
  id: number
  name: string
  discountValue: number
  expireDate: string
  status: number
  createdAt: string
  updatedAt: string
}

export interface IAttributeValue {
  id: number
  name: string
  value: string
  attributeType: string | null // Giá trị có thể là chuỗi hoặc null
  status: number // Có thể thay đổi thành enum nếu bạn có danh sách trạng thái cụ thể
  createdAt: string // ISO datetime dưới dạng chuỗi
  updatedAt: string // ISO datetime dưới dạng chuỗi
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
export interface IVariantColor {
  variantId: number
  color: string
  thumbnail: string
  colorId: number
  price: number
}
export interface IProduct {
  id: number // ID của sản phẩm
  name: string // Tên sản phẩm
  orderId?: number
  category: ICategory
  thumbnail: string
  description: string
  discount: IDiscount | null
  rateAVG: number[]
  tags: ITag[]
  basePrice: number // Giá sản phẩm
  slug: string // URL slug của sản phẩm
  view: number // Số lượt xem sản phẩm
  like: number // Số lượt thích sản phẩm
  status: number // Trạng thái sản phẩm (1: hoạt động, 0: không hoạt động)
  updatedAt: string // Trạng thái xóa (0: chưa xóa, 1: đã xóa)
  createdAt: string // Thời gian tạo sản phẩm
  variantColors: IVariantColor[]
  attributeTypes: IAttributeType[]
}

export interface IProductReview {
  id: number
  star: number
  content: string
  createdAt: string
  pId: number
  pName: string
  pImage: string
  slug: string
}

export interface IVariantProductColor {
  variantId: number
  size: string
  thumbnail: string
}

export interface IPagination {
  currentPage: number
  totalPage: number
}

//Setting
export interface ISettingResponse {
  id: number
  mainLogo: string
  sloganLogo: string
  slogan: string
  hotline: string
  email: string
  branchName1: string
  branchAddress1: string
  branchName2: string
  branchAddress2: string
  facebookLink: string
  instagramLink: string
  youtubeLink: string
  mainBanner: string
  subBanner1: string
  subBanner2: string
  slideshowBanner1: string
  slideshowBanner2: string
  slideshowBanner3: string
  description: string
  serviceTitle1: string
  serviceInfo1: string
  serviceTitle2: string
  serviceInfo2: string
  serviceTitle3: string
  serviceInfo3: string
  serviceTitle4: string
  serviceInfo4: string
}

export interface IBanner {
  mainBanner: string
  subBanner1: string
  subBanner2: string
}

export interface ISlideshow {
  slideshowBanner1: string
  slideshowBanner2: string
  slideshowBanner3: string
}

export interface ILogo {
  mainLogo: string
  sloganLogo: string
}

export interface IAddress {
  id: number
  name: string
  address: string
  phoneNumber: string
  isDefault: boolean
}

export interface ISocial {
  facebookLink: string
  instagramLink: string
  youtubeLink: string
}

export interface IService {
  serviceTitle1: string
  serviceInfo1: string
  serviceTitle2: string
  serviceInfo2: string
  serviceTitle3: string
  serviceInfo3: string
  serviceTitle4: string
  serviceInfo4: string
}

export interface IInfo {
  slogan: string
  hotline: string
  email: string
  description: string
}

export interface ISetting {
  banner: IBanner
  slideShow: ISlideshow
  social: ISocial
  address: IAddress
  service: IService
  logo: ILogo
  info: IInfo
}
//End-Setting

export interface ICustomer {
  fullName: string
  phoneNumber: string
  email: string
  sex: 'Nam' | 'Nữ'
  address?: string
  birthday: string
  totalSpending?: number
  createdAt: string
  updatedAt: string
}

export interface IJwt {
  accessToken: string
  expireAccessToken: string // ISO Date string
  refreshToken: string
  expireRefreshToken?: string // ISO Date string
}
export interface ICustomerResponse {
  id: number
  fullName: string
}

export interface ICustomerLogin {
  customer: ICustomerResponse
  jwt: IJwt
}

export interface IError {
  message: string
  status: number
}

export interface IOption {
  value: string
  label: string
}
export interface IBlog {
  id: number
  title: string
  content: string
  author: string
  createdAt: string
  updatedAt: string
  tags: ITag[]
  thumbnail: string
  status: number // 1: published, 0: draft
}

export interface IChangePasswordFormData {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export interface IUpdateInfoFormData {
  name: string
  phone: string
  sex: string
  birthday: string
}

export interface ICartItem {
  productId: number
  variantId: number
  productName: string
  productPrice: number
  thumbnail: string
  attributes: [
    {
      Color: string
    },
    {
      Size: string
    }
  ]
  quantity: number
  discount: number
}
export interface ICart {
  totalMoney: number
  cartItems: ICartItem[]
}

export interface IAddressFormData {
  name: string
  phoneNumber: string
  address: string
  isDefault: boolean
}

export interface IContactAddResponse {
  status: number
  data: {
    title: string
    message: string
    fullName: string
    email: string
    phoneNumber: string
    status: number
    deleted: boolean
    createdAt: string
  }
  message: string
}

//Hoang
export interface IProductDetail {
  id: number
  name: string
  view: number
  like: number
  variants: IVariantDetail[]
  discount: number
  description: string
  rates: IRateDetail[]
}
export interface IVariantDetail {
  id: number
  price: number
  thumbnail: string
  attributes: any
  name: string
  view: number
  like: number
  wishLists: Array<number>
  categoryId: number
  variants: IVariantDetail[]
  discount: number
  description: string
  rates: IRateDetail[]
}
export interface IVariantDetail {
  id: number
  price: number
  stock: number
  thumbnail: string
  attributes: any
}
export interface IRateDetail {
  fullName: string
  star: number
  content: string
  createdAt: string
}
//end

export interface IStatus {
  title: string
  value: number
  className?: string
}

export interface IOrder {
  id: number
  name: string
  phoneNumber: string
  address: string
  note: string
  payMethod: string
  shipDate: string
  receiveDate: string
  createdAt: string
  status: number
  totalMoney: number
  totalDiscount: number
  products: IOrderProduct[]
}

export interface IOrderProduct {
  id: number
  name: string
  slug: string
  image: string
  color: string
  size: string
  quantity: number
  price: number
  disPrice: number
}
export interface IRateAddDetail {
  productId: number
  orderId: number
  star: number
  content: string
}

export interface IModifyProduct {
  modifyField: string
  modifyValue: string
  modifyAction: string
}
//end
