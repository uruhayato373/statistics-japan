import React from 'react'

import Link from 'next/link'

import { Box, Button, Divider } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { KindType } from 'types/contents'

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
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      {items.map((item, index) => (
        <React.Fragment key={item.kindId}>
          {index > 0 && (
            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
          )}
          <Link href={changeKindURL(item.kindId)} passHref legacyBehavior>
            <Button
              component="a"
              onClick={() => onSelect(item)}
              sx={{
                color:
                  selectedItem?.kindId === item.kindId
                    ? theme.palette.primary.main
                    : theme.palette.text.primary,
                fontWeight:
                  selectedItem?.kindId === item.kindId ? 'bold' : 'normal',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: 'transparent',
                  color: theme.palette.primary.main,
                },
                padding: '4px 8px',
              }}
            >
              {item.kindTitle}
            </Button>
          </Link>
        </React.Fragment>
      ))}
    </Box>
  )
}
