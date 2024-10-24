'use client'

import React, { ReactElement, useState, forwardRef } from 'react'

import Link, { LinkProps } from 'next/link'

import FormControl from '@mui/material/FormControl'
import MenuItem, { MenuItemProps } from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'

import { useAtom } from 'jotai'

import { prefecture } from 'atoms'
import useURL from 'hooks/useURL'
import handlePrefecture, { PrefectureType } from 'utils/prefecture'

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

export default function SelectPrefecture(): ReactElement {
  const prefectures = handlePrefecture().fetchItems()

  const [atomPrefecture] = useAtom<PrefectureType>(prefecture)
  const [selectedPrefCode, setSelectedPrefCode] = useState<string>(
    atomPrefecture.prefCode
  )

  const { changePrefURL } = useURL()

  const handleTimeChange = (event: SelectChangeEvent<string>) => {
    const newTime = event.target.value
    setSelectedPrefCode(newTime)
  }

  return (
    <FormControl>
      <Select
        labelId="select-time-label"
        id="select-time"
        value={selectedPrefCode}
        displayEmpty
        onChange={handleTimeChange}
      >
        {prefectures.map((d) => (
          <LinkMenuItem
            key={d.prefCode}
            value={d.prefCode}
            href={changePrefURL(d.prefCode)}
          >
            {d.prefName}
          </LinkMenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
