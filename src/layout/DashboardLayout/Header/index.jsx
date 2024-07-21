import { useMemo } from 'react'

import AppBar from '@mui/material/AppBar'
import { useTheme } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import useMediaQuery from '@mui/material/useMediaQuery'

import IconButton from 'components/@extended/IconButton'

import MenuFoldOutlined from '@ant-design/icons/MenuFoldOutlined'
import MenuUnfoldOutlined from '@ant-design/icons/MenuUnfoldOutlined'

import { handlerDrawerOpen, useGetMenuMaster } from 'api/menu'
import {
  DRAWER_WIDTH,
  MINI_DRAWER_WIDTH,
  MenuOrientation,
  ThemeMode,
} from 'config'
import useConfig from 'hooks/useConfig'

import AppBarStyled from './AppBarStyled'
import HeaderContent from './HeaderContent'

export default function Header() {
  const theme = useTheme()
  const downLG = useMediaQuery(theme.breakpoints.down('lg'))
  const { mode, menuOrientation } = useConfig()

  const { menuMaster } = useGetMenuMaster()
  const drawerOpen = menuMaster.isDashboardDrawerOpened

  const isHorizontal = menuOrientation === MenuOrientation.HORIZONTAL && !downLG

  // header content
  const headerContent = useMemo(() => <HeaderContent />, [])

  const iconBackColor =
    mode === ThemeMode.DARK ? 'background.default' : 'grey.100'

  // common header
  const mainHeader = (
    <Toolbar>
      {!isHorizontal ? (
        <IconButton
          aria-label="open drawer"
          onClick={() => handlerDrawerOpen(!drawerOpen)}
          edge="start"
          color="secondary"
          variant="light"
          sx={{
            color: 'text.primary',
            bgcolor: drawerOpen ? 'transparent' : iconBackColor,
            ml: { xs: 0, lg: -2 },
          }}
        >
          {!drawerOpen ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </IconButton>
      ) : null}
      {headerContent}
    </Toolbar>
  )

  // app-bar params
  const appBar = {
    position: 'fixed',
    color: 'inherit',
    elevation: 0,
    sx: {
      borderBottom: '1px solid',
      borderBottomColor: 'divider',
      zIndex: 1200,
      width: isHorizontal
        ? '100%'
        : {
            xs: '100%',
            lg: drawerOpen
              ? `calc(100% - ${DRAWER_WIDTH}px)`
              : `calc(100% - ${MINI_DRAWER_WIDTH}px)`,
          },
    },
  }

  return (
    <>
      {!downLG ? (
        <AppBarStyled open={drawerOpen} {...appBar}>
          {mainHeader}
        </AppBarStyled>
      ) : (
        <AppBar {...appBar}>{mainHeader}</AppBar>
      )}
    </>
  )
}
