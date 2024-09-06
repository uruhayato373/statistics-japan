import { ForwardRefExoticComponent, RefAttributes } from 'react'

import { ChipProps } from '@mui/material/Chip'

import { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon'

// import doboku from './doboku'
import page from './page'
import social from './social'

export interface MenuItem {
  id: string
  title: string
  type: string
  icon?: ForwardRefExoticComponent<
    Omit<AntdIconProps, 'ref'> & RefAttributes<HTMLSpanElement>
  >
  url?: string
  breadcrumbs?: boolean
  children?: MenuItem[]
  caption?: string
  target?: boolean
  chip?: ChipProps
  disabled?: boolean
}

export interface MenuGroup {
  id: string
  title: string
  icon?: ForwardRefExoticComponent<
    Omit<AntdIconProps, 'ref'> & RefAttributes<HTMLSpanElement>
  >
  url?: string
  type: 'group'
  children?: MenuItem[]
  caption?: string
}

export interface MenuItems {
  items: MenuGroup[]
}

const menuItems: MenuItems = {
  items: [social, page],
}

export default menuItems
