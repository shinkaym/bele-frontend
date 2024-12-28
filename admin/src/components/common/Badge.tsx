import { cn } from '@/lib/utils'

import { ReactNode } from 'react'

interface BadgeProps {
  className?: string
  children: ReactNode
}

const Badge = ({ className, children }: BadgeProps) => {
  return (
    <span className={cn('inline-block px-4 py-2 text-sm font-semibold rounded-full border', className)}>
      {children}
    </span>
  )
}

export default Badge
