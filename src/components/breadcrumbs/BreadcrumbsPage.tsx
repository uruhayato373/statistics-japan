import { useState } from 'react'
import Link from 'next/link'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'

import useURL from 'hooks/useURL'
import { PageType } from 'utils/page'

type Props = {
  pages: PageType[]
  currentPage: PageType
}

function BreadcrumbsPage({ pages, currentPage }: Props) {
  const [selectedItem, setSelectedItem] = useState<PageType>(currentPage)
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const theme = useTheme()

  const { changePageURL } = useURL()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSelect = (item: PageType) => {
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
        {selectedItem.pageTitle}
      </Typography>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: 48 * 4.5,
              width: '20ch',
            },
          },
        }}
      >
        {pages.map((item, index) => (
          <Link
            key={`${item.menuId}-${index}`}
            href={changePageURL(item.pageId)}
            passHref
            legacyBehavior
          >
            <MenuItem
              onClick={() => handleSelect(item)}
              selected={selectedItem.pageId === item.pageId}
              sx={{
                backgroundColor:
                  selectedItem.pageId === item.pageId
                    ? theme.palette.primary.light
                    : 'inherit',
                '&:hover': {
                  backgroundColor:
                    selectedItem.pageId === item.pageId
                      ? theme.palette.primary.main
                      : theme.palette.action.hover,
                },
              }}
            >
              {item.pageTitle}
            </MenuItem>
          </Link>
        ))}
      </Menu>
    </>
  )
}

export default BreadcrumbsPage
