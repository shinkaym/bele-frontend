import { ReactNode } from 'react'
import { EMenuProfileItemId } from './enum'

export type TMenuItem = {
  url: string
  title: string
  icon: ReactNode
  onlyIcon?: boolean
}

export type TMenuProfileItem = {
  id: EMenuProfileItemId
  title: string
  icon: React.ComponentType<{ className?: string }>
}
