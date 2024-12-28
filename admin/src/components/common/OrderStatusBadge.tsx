// OrderStatusBadge.tsx
import { orderStatus } from '@/constants'

type OrderStatusBadgeProps = {
  status: number
  onClick: () => void
}

const OrderStatusBadge = ({ status, onClick }: OrderStatusBadgeProps) => {
  const statusInfo = orderStatus.find(s => s.value === status)
  
  return (
    <button onClick={onClick} className={`inline-block px-3 py-1 text-sm font-semibold rounded-full border ${statusInfo?.className || ''}`}>
      {statusInfo?.title}
    </button>
  )
}

export default OrderStatusBadge
