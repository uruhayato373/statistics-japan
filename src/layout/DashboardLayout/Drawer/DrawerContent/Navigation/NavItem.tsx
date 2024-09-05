import { useEffect } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

import {
  handlerActiveItem,
  handlerDrawerOpen,
  useGetMenuMaster,
} from 'api/menu'
import { MenuOrientation, ThemeMode } from 'config'
import useConfig from 'hooks/useConfig'
import useURL from 'hooks/useURL'
import { MenuItem } from 'menu-items'

interface Props {
  item: MenuItem
  level: number
  isParents?: boolean
}

export default function NavItem({ item, level, isParents = false }: Props) {
  const theme = useTheme()
  const { navURL } = useURL()
  const [menuId, fieldId] = item.url.split('/').reverse()
  const url = level === 1 ? item.url : navURL(fieldId, menuId)

  const { menuMaster } = useGetMenuMaster()
  const drawerOpen = menuMaster.isDashboardDrawerOpened
  const openItem = menuMaster.openedItem

  const downLG = useMediaQuery(theme.breakpoints.down('lg'))
  const { mode, menuOrientation } = useConfig()
  const pathname = usePathname()

  const Icon = item.icon
  const isSelected = openItem === item.id

  useEffect(() => {
    const pathNameString = pathname.split('/').splice(1, 2).toString()
    const itemUrlString = item.url.split('/').splice(1, 2).toString()
    if (pathNameString === itemUrlString) handlerActiveItem(item.id)
  }, [pathname, item.id, item.url])

  const textColor = 'text.primary'
  const iconSelectedColor = drawerOpen ? 'text.primary' : 'primary.main'

  const listItemButtonProps = {
    component: Link,
    href: url,
    target: item.target ? '_blank' : '_self',
    disabled: item.disabled,
    selected: isSelected,
    onClick: downLG ? () => handlerDrawerOpen(false) : undefined,
  }

  return (
    <Box sx={{ position: 'relative' }}>
      <ListItemButton
        {...listItemButtonProps}
        sx={{
          zIndex: 1201,
          pl: drawerOpen ? `${level * 28}px` : 1.5,
          py: !drawerOpen && level === 1 ? 1.25 : 1,
          ...(drawerOpen && {
            '&:hover': {
              bgcolor: 'primary.lighter',
            },
            '&.Mui-selected': {
              bgcolor: 'primary.lighter',
              borderRight: '2px solid',
              borderRightColor: 'primary.main',
              color: iconSelectedColor,
              '&:hover': {
                color: iconSelectedColor,
                bgcolor: 'primary.lighter',
              },
            },
          }),
          ...(!drawerOpen && {
            '&:hover': {
              bgcolor: 'transparent',
            },
            '&.Mui-selected': {
              '&:hover': {
                bgcolor: 'transparent',
              },
              bgcolor: 'transparent',
            },
          }),
        }}
      >
        {Icon && (
          <ListItemIcon
            sx={{
              minWidth: 28,
              color: isSelected ? iconSelectedColor : textColor,
              ...(!drawerOpen && {
                borderRadius: 1.5,
                width: 36,
                height: 36,
                alignItems: 'center',
                justifyContent: 'center',
                '&:hover': {
                  bgcolor:
                    mode === ThemeMode.DARK
                      ? 'secondary.light'
                      : 'secondary.lighter',
                },
              }),
              ...(!drawerOpen &&
                isSelected && {
                  bgcolor:
                    mode === ThemeMode.DARK ? 'primary.900' : 'primary.lighter',
                  '&:hover': {
                    bgcolor:
                      mode === ThemeMode.DARK
                        ? 'primary.darker'
                        : 'primary.lighter',
                  },
                }),
            }}
          >
            <Icon
              style={{
                fontSize: drawerOpen ? '1rem' : '1.25rem',
                ...(menuOrientation === MenuOrientation.HORIZONTAL &&
                  isParents && { fontSize: 20, stroke: '1.5' }),
              }}
            />
          </ListItemIcon>
        )}
        {(drawerOpen || (!drawerOpen && level !== 1)) && (
          <ListItemText
            primary={
              <Typography
                variant="h6"
                sx={{ color: isSelected ? iconSelectedColor : textColor }}
              >
                {item.title}
              </Typography>
            }
          />
        )}
        {(drawerOpen || (!drawerOpen && level !== 1)) && item.chip && (
          <Chip
            color={item.chip.color}
            variant={item.chip.variant}
            size={item.chip.size}
            label={item.chip.label}
            avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
          />
        )}
      </ListItemButton>
    </Box>
  )
}
