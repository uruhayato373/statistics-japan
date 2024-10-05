import React, { useEffect } from 'react'

import { usePathname } from 'next/navigation'

import { useMediaQuery, Theme, Box } from '@mui/material'

import { kind } from 'atoms'
import useURL from 'hooks/useURL'
import { handleKind, KindType } from 'utils/kind'

import { useAtom } from 'jotai'

import { DesktopMenu } from './DesktopMenu'
import { MobileMenu } from './MobileMenu'

export default function SelectKind(): JSX.Element {
  const [selectedItem, setSelectedItem] = useAtom<KindType>(kind)
  const downLG = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))

  const { items, findItem } = handleKind()
  const pathname = usePathname()
  const { changeKindURL } = useURL()

  useEffect(() => {
    const kindId = pathname.split('/')[3]
    const kind = findItem(kindId)
    setSelectedItem(kind)
  }, [pathname, findItem, setSelectedItem])

  const isView = pathname.split('/').length > 2
  if (!isView) {
    return null
  }

  const handleSelect = (item: KindType) => {
    setSelectedItem(item)
  }

  return (
    <Box sx={{ width: '100%', ml: { xs: 2, md: 1 }, overflowX: 'auto' }}>
      {downLG ? (
        <MobileMenu
          items={items}
          selectedItem={selectedItem}
          onSelect={handleSelect}
          changeKindURL={changeKindURL}
        />
      ) : (
        <DesktopMenu
          items={items}
          selectedItem={selectedItem}
          onSelect={handleSelect}
          changeKindURL={changeKindURL}
        />
      )}
    </Box>
  )
}
