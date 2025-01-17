import { ICart } from '@/models/interfaces'
import { format, formatDistanceToNow, parseISO } from 'date-fns'
import { vi } from 'date-fns/locale'

export const formatDate = (dateString: string): string => {
  const date = parseISO(dateString)

  return format(date, "'ngày' dd 'tháng' MM 'năm' yyyy")
}

export const calculateSubtotal = (cart: ICart) => {
  return cart.cartItems.reduce((total, item) => {
    return total + item.productPrice * item.quantity
  }, 0)
}

export const calculateDiscount = (cart: ICart) => {
  return cart.cartItems.reduce((total, item) => {
    return total + item.productPrice * (item.discount / 100) * item.quantity
  }, 0)
}

export const calculateTotal = (cart: ICart) => {
  const subtotal = calculateSubtotal(cart)
  const discount = calculateDiscount(cart)
  return subtotal - discount
}

export const formatYouTubeLikeTime = (dateString: string) => {
  const date = new Date(dateString)
  return formatDistanceToNow(date, {
    addSuffix: true,
    locale: vi
  })
}
