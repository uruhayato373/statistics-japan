import { useState } from 'react'
import Link from 'next/link'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'

import useURL from 'hooks/useURL'
import { MenuType } from 'utils/menu'

type Props = {
  menus: MenuType[]
  currentMenu: MenuType
}

function BreadcrumbsMenu({ menus, currentMenu }: Props) {
  const [selectedItem, setSelectedItem] = useState<MenuType>(currentMenu)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const theme = useTheme()

  const { changeMenuURL } = useURL()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSelect = (item: MenuType) => {
    setSelectedItem(item)
    handleClose()
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
        {selectedItem.menuTitle}
      </Typography>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {menus.map((item) => (
          <Link
            key={item.menuId}
            href={changeMenuURL(item.menuId)}
            passHref
            legacyBehavior
          >
            <MenuItem
              onClick={() => handleSelect(item)}
              selected={selectedItem.menuId === item.menuId}
              sx={{
                backgroundColor:
                  selectedItem.menuId === item.menuId
                    ? theme.palette.primary.light
                    : 'inherit',
                '&:hover': {
                  backgroundColor:
                    selectedItem.menuId === item.menuId
                      ? theme.palette.primary.main
                      : theme.palette.action.hover,
                },
              }}
            >
              {item.menuTitle}
            </MenuItem>
          </Link>
        ))}
      </Menu>
    </>
  )
}

export default BreadcrumbsMenu
