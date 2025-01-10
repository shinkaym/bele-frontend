import { IOrder } from '@/models/interfaces/order';

export function formatDate(timestamp: string | number): string {
  const date = typeof timestamp === 'string' ? new Date(timestamp) : new Date(Number(timestamp));

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

export function calculateTotalDiscount(order: IOrder){
  if (!order || !order.variants) return 0;
  return order.variants.reduce((acc, product) => {
    const discount = product.originalPrice - product.finalPrice;
    return acc + (discount > 0 ? discount * product.quantity : 0);
  }, 0);
};
