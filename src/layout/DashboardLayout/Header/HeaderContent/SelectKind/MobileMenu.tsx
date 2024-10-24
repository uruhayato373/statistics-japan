import React, { useState } from 'react'

import Link from 'next/link'

import { Chip, Grid, Menu, MenuItem } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { KindType } from 'types/contents'

interface Props {
  items: KindType[]
  selectedItem: KindType | null
  onSelect: (item: KindType) => void
  changeKindURL: (kindId: string) => string
}

export const MobileMenu: React.FC<Props> = ({
  items,
  selectedItem,
  onSelect,
  changeKindURL,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const theme = useTheme()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSelect = (item: KindType) => {
    onSelect(item)
    handleClose()
  }

  return (
    <>
      <Grid item>
        <Chip
          label={selectedItem ? selectedItem.kindTitle : 'Select Type'}
          variant="outlined"
          color="primary"
          onClick={handleClick}
        />
      </Grid>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {items.map((item) => (
          <Link
            key={item.kindId}
            href={changeKindURL(item.kindId)}
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
    </>
  )
}
