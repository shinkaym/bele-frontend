import { ReactNode } from 'react'
import { EMenuProfileItemId } from './enum'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

export type TMenuItem = {
  url: string
  title: string
  icon: ReactNode
  onlyIcon?: boolean
}

export type TMenuProfileItem = {
  id: EMenuProfileItemId
  title: string
  icon: IconDefinition
  link: string
}
