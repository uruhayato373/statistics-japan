import { useState } from 'react'

import { useRouter } from 'next/navigation'

import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'

import useURL from 'hooks/useURL'
import { PageType } from 'utils/page'

type Props = {
  pages: PageType[]
  currentPage: PageType
}

function BreadcrumbsPage({ pages, currentPage }: Props) {
  const [selectedItem, setSelectedItem] = useState<PageType>(currentPage)
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const { changePageURL } = useURL()
  const router = useRouter()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSelect = (item: PageType) => {
    setSelectedItem(item)
    const url = changePageURL(item.pageId)
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
        {selectedItem.pageTitle}
      </Typography>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {pages.map((item, index) => (
          <MenuItem
            key={`${item.menuId}-${index}`}
            onClick={() => handleSelect(item)}
          >
            {item.pageTitle}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default BreadcrumbsPage
