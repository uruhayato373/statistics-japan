import React, { useEffect, useState } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useTheme } from '@mui/material/styles'

import { kind } from 'atoms'
import useURL from 'hooks/useURL'
import { handleKind, KindType } from 'utils/kind'

import { useAtom } from 'jotai'

/**
 * 統計の種類を選択するためのドロップダウンメニューを表示するコンポーネント
 * @returns {JSX.Element}
 */
export default function SelectKind(): JSX.Element {
  const [selectedItem, setSelectedItem] = useAtom<KindType>(kind)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const theme = useTheme()

  // 種類のリストを取得
  const { items, findItem } = handleKind()

  // 現在のURLを取得
  const pathname = usePathname()

  // 直接読み込まれた場合の初期値設定
  useEffect(() => {
    const kindId = pathname.split('/')[3]
    const kind = findItem(kindId)
    setSelectedItem(kind)
  }, [pathname, findItem, setSelectedItem])

  // 種類を変更した場合のリダイレクトURLを取得
  const { changeKindURL } = useURL()

  // About Site では非表示
  const isView = pathname.split('/').length > 2
  if (!isView) {
    return null
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSelect = (item: KindType) => {
    setSelectedItem(item)
    handleClose()
  }

  return (
    <Box sx={{ width: '100%', ml: { xs: 2, md: 1 } }}>
      <Grid item>
        <Chip
          label={selectedItem ? selectedItem.kindTitle : 'Select Type'}
          variant="outlined"
          color="primary"
          onClick={handleClick}
          // size="small"
        />
      </Grid>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {items.map((item) => (
          <Link
            key={item.kindId}
            href={changeKindURL(item)}
            passHref
            legacyBehavior
          >
            <MenuItem
              onClick={() => handleSelect(item)}
              selected={selectedItem?.kindId === item.kindId}
              sx={{
                backgroundColor:
                  selectedItem?.kindId === item.kindId
                    ? theme.palette.primary.light
                    : 'inherit',
                '&:hover': {
                  backgroundColor:
                    selectedItem?.kindId === item.kindId
                      ? theme.palette.primary.main
                      : theme.palette.action.hover,
                },
              }}
            >
              {item.kindTitle}
            </MenuItem>
          </Link>
        ))}
      </Menu>
    </Box>
  )
}
