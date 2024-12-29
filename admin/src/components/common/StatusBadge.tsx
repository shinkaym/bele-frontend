import { IStatus } from '@/models/interfaces'

type StatusBadgeProps = {
  status: number
  statusList: IStatus[]
  onClick: () => void
}

const StatusBadge = ({ status, statusList, onClick }: StatusBadgeProps) => {
  const statusInfo = statusList.find((s) => s.value === status)

  return (
    <button
      onClick={onClick}
      className={`inline-block px-3 py-1 text-sm font-semibold rounded-full border ${statusInfo?.className || ''}`}
    >
      {statusInfo?.title}
    </button>
  )
}

export default StatusBadge
