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

import Dot from 'components/@extended/Dot'

import {
  handlerHorizontalActiveItem,
  handlerActiveItem,
  handlerDrawerOpen,
  useGetMenuMaster,
} from 'api/menu'
import { MenuOrientation, ThemeMode } from 'config'
import useConfig from 'hooks/useConfig'
import useURL from 'hooks/useURL'
import { MenuItem } from 'menu-items'

interface Props {
  /**
   * 表示するメニューアイテムの情報
   *
   * @example
   * {id:'weather',
   *  title:'総面積',
   *  type:'item',
   *  url:'/landweather/total-area',
   *  breadcrumbs:false,
   * }
   */
  item: MenuItem
  /**
   * 現在のメニューの階層レベル
   *
   * @example
   *  - 1: About Site
   *  - 2: 総面積、天候・気象、総人口、世帯...(menuId)
   */
  level: number
  /**
   * 親メニューかどうかの判定
   *
   * @example
   *  - true: About Siteなど、childrenを持たないメニュー
   *  - false: 国土・気象、人口・世帯など、childrenを持つメニュー
   */
  isParents?: boolean
}

export default function NavItem({ item, level, isParents = false }: Props) {
  const theme = useTheme()

  /**
   * navURL関数を使用してURLを生成する
   */
  const { navURL } = useURL()
  const [menuId, fieldId] = item.url.split('/').reverse()
  const url = level === 1 ? item.url : navURL(fieldId, menuId)

  const { menuMaster } = useGetMenuMaster()
  const drawerOpen = menuMaster.isDashboardDrawerOpened
  const openItem = menuMaster.openedItem

  const downLG = useMediaQuery(theme.breakpoints.down('lg'))

  const { mode, menuOrientation } = useConfig()

  /**
   * item.targetがtrueの場合、新しいタブでリンクを開く
   */
  let itemTarget = '_self'
  if (item.target) {
    itemTarget = '_blank'
  }

  /**
   * drawerOpenがtrueの場合、アイコンのサイズを1remに設定
   * drawerOpenがfalseの場合、アイコンのサイズを1.25remに設定
   */
  const Icon = item.icon
  const itemIcon = item.icon ? (
    <Icon
      style={{
        fontSize: drawerOpen ? '1rem' : '1.25rem',
        ...(menuOrientation === MenuOrientation.HORIZONTAL &&
          isParents && { fontSize: 20, stroke: '1.5' }),
      }}
    />
  ) : (
    false
  )

  const isSelected = openItem === item.id

  const pathname = usePathname()

  /**
   * 初回レンダリング時に、アクティブアイテムを判定する
   */
  useEffect(() => {
    const pathNameString = pathname.split('/').splice(1, 2).toString()
    const itemUrlString = item.url.split('/').splice(1, 2).toString()
    if (pathNameString === itemUrlString) handlerActiveItem(item.id)
    // eslint-disable-next-line
  }, [pathname])

  const textColor = 'text.primary'
  const iconSelectedColor = drawerOpen ? 'text.primary' : 'primary.main'

  return (
    <>
      <Box sx={{ position: 'relative' }}>
        <ListItemButton
          component={Link}
          href={url}
          target={itemTarget}
          disabled={item.disabled}
          selected={isSelected}
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
          {...(downLG && {
            onClick: () => handlerDrawerOpen(false),
          })}
        >
          {itemIcon && (
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
                      mode === ThemeMode.DARK
                        ? 'primary.900'
                        : 'primary.lighter',
                    '&:hover': {
                      bgcolor:
                        mode === ThemeMode.DARK
                          ? 'primary.darker'
                          : 'primary.lighter',
                    },
                  }),
              }}
            >
              {itemIcon}
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
    </>
  )
}
