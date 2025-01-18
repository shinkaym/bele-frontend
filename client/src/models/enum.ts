/* eslint-disable no-unused-vars */
export enum EProductStatus {
  ACTIVE = 'ACTIVE',
  UNACTIVE = 'UNACTIVE'
}

export enum EMenuProfileItemId {
  AccountInfo = 'accountInfo',
  OrderHistory = 'orderHistory',
  AddressNotes = 'addressNotes',
  Wishlist = 'wishlist',
  RatingProducts = 'ratingProducts',
  Logout = 'logout'
}

export enum EToastOption {
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error'
}

export enum EOrderStatus {
  UNKNOWN = 'Không xác định',
  PENDING_CONFIRMATION = 'Chờ xác nhận',
  PENDING = 'Đang chuẩn bị',
  DELIVERED = 'Đang giao hàng',
  SHIPPED = 'Đã giao',
  CANCELED = 'Đã huỷ'
}