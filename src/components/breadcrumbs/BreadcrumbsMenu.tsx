import { useState } from 'react'

import { useRouter } from 'next/navigation'

import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'

import useURL from 'hooks/useURL'
import { MenuType } from 'utils/menu'

type Props = {
  menus: MenuType[]
  currentMenu: MenuType
}

function BreadcrumbsMenu({ menus, currentMenu }: Props) {
  const [selectedItem, setSelectedItem] = useState<MenuType>(currentMenu)
  const [anchorEl, setAnchorEl] = useState(null)

  const { changeMenuURL } = useURL()
  const router = useRouter()

  const handleClick = (event: { currentTarget: unknown }) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSelect = (item: MenuType) => {
    setSelectedItem(item)
    const url = changeMenuURL(item.menuId)
    router.push(url)
    handleClose()
  }

  return (
    <>
      <Typography
        variant={'subtitle1'}
        sx={{
          textDecoration: 'none',
        }}
        color={'text.secondary'}
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
          <MenuItem key={item.menuId} onClick={() => handleSelect(item)}>
            {item.menuTitle}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default BreadcrumbsMenu
