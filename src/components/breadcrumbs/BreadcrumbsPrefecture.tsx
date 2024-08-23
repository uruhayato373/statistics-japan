import { useState, useEffect, useRef } from 'react'

import Link from 'next/link'

import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

import useURL from 'hooks/useURL'
import { PrefectureType } from 'utils/prefecture'

type Props = {
  prefectures: PrefectureType[]
  currentPrefecture: PrefectureType
}

function BreadcrumbsPrefecture({ prefectures, currentPrefecture }: Props) {
  const [selectedItem, setSelectedItem] =
    useState<PrefectureType>(currentPrefecture)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const theme = useTheme()
  const menuRef = useRef<HTMLUListElement>(null)

  const { changePrefURL } = useURL()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSelect = (item: PrefectureType) => {
    setSelectedItem(item)
    handleClose()
  }

  useEffect(() => {
    if (anchorEl && menuRef.current) {
      const selectedIndex = prefectures.findIndex(
        (pref) => pref.prefCode === selectedItem.prefCode
      )
      const menuItems = menuRef.current.children
      if (menuItems[selectedIndex]) {
        ;(menuItems[selectedIndex] as HTMLElement).scrollIntoView({
          block: 'nearest',
          inline: 'start',
        })
      }
    }
  }, [anchorEl, selectedItem, prefectures])

  if (!prefectures || !currentPrefecture || !selectedItem) {
    return null
  }

  return (
    <>
      <Typography
        variant="subtitle1"
        sx={{
          textDecoration: 'none',
          cursor: 'pointer',
          '&:hover': {
            color: theme.palette.primary.main,
          },
        }}
        color="text.secondary"
        onClick={handleClick}
      >
        {selectedItem.prefName}
      </Typography>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          ref: menuRef,
        }}
        slotProps={{
          paper: {
            style: {
              maxHeight: 47 * 4.5,
              width: '12ch',
            },
          },
        }}
      >
        {prefectures.map((item) => (
          <Link
            key={item.prefCode}
            href={changePrefURL(item.prefCode)}
            passHref
            legacyBehavior
          >
            <MenuItem
              onClick={() => handleSelect(item)}
              selected={selectedItem.prefCode === item.prefCode}
              sx={{
                backgroundColor:
                  selectedItem.prefCode === item.prefCode
                    ? theme.palette.primary.light
                    : 'inherit',
                '&:hover': {
                  backgroundColor:
                    selectedItem.prefCode === item.prefCode
                      ? theme.palette.primary.main
                      : theme.palette.action.hover,
                },
              }}
            >
              {item.prefName}
            </MenuItem>
          </Link>
        ))}
      </Menu>
    </>
  )
}

export default BreadcrumbsPrefecture
