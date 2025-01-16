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
  UNKNOWN = 'Unknown',
  PENDING_CONFIRMATION = 'Pending confirmation',
  PENDING = 'Pending',
  DELIVERED = 'Delivered',
  SHIPPED = 'Shipped',
  CANCELED = 'Cancelled'
}