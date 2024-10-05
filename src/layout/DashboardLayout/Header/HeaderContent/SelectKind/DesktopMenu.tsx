import React from 'react'

import Link from 'next/link'

import { ButtonGroup, Button } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { KindType } from 'utils/kind'

interface Props {
  items: KindType[]
  selectedItem: KindType | null
  onSelect: (item: KindType) => void
  changeKindURL: (kindId: string) => string
}

export const DesktopMenu: React.FC<Props> = ({
  items,
  selectedItem,
  onSelect,
  changeKindURL,
}) => {
  const theme = useTheme()

  return (
    <ButtonGroup
      variant="outlined"
      aria-label="outlined button group for selecting statistics type"
      sx={{ flexWrap: 'wrap', justifyContent: 'center' }}
    >
      {items.map((item) => (
        <Link
          key={item.kindId}
          href={changeKindURL(item.kindId)}
          passHref
          legacyBehavior
        >
          <Button
            component="a"
            onClick={() => onSelect(item)}
            sx={{
              backgroundColor:
                selectedItem?.kindId === item.kindId
                  ? theme.palette.primary.light
                  : 'inherit',
              color:
                selectedItem?.kindId === item.kindId
                  ? theme.palette.primary.contrastText
                  : theme.palette.primary.main,
              '&:hover': {
                backgroundColor:
                  selectedItem?.kindId === item.kindId
                    ? theme.palette.primary.main
                    : theme.palette.action.hover,
              },
              margin: '4px',
            }}
          >
            {item.kindTitle}
          </Button>
        </Link>
      ))}
    </ButtonGroup>
  )
}
