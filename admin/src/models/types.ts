import { ReactNode } from 'react'

export type TMenuItem = {
  url: string
  title: string
  icon: ReactNode
  onlyIcon?: boolean
}
