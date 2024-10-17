'use client'

import React, { ReactElement, forwardRef } from 'react'

import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'

import FormControl from '@mui/material/FormControl'
import MenuItem, { MenuItemProps } from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

import useURL from 'hooks/useURL'
import { handlePage } from 'utils/page'

// カスタムLinkMenuItemコンポーネントを作成
const LinkMenuItem = forwardRef<HTMLAnchorElement, MenuItemProps & LinkProps>(
  ({ href, children, ...props }, ref) => (
    <Link href={href} passHref legacyBehavior>
      <MenuItem component="a" ref={ref} {...props}>
        {children}
      </MenuItem>
    </Link>
  )
)

LinkMenuItem.displayName = 'LinkMenuItem'

export default function SelectPage(): ReactElement {
  const pathname = usePathname()
  const [, , menuId, , pageId] = pathname.split('/')

  const pages = handlePage().items(menuId)

  const { changePageURL } = useURL()

  return (
    <FormControl>
      <Select
        labelId="select-page-label"
        id="select-page"
        value={pageId}
        displayEmpty
      >
        {pages.map((d) => (
          <LinkMenuItem
            key={d.pageId}
            value={d.pageId}
            href={changePageURL(d.pageId)}
          >
            {d.pageTitle}
          </LinkMenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
