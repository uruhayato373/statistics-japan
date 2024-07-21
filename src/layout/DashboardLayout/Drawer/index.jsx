import { useMemo } from 'react'

import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import useMediaQuery from '@mui/material/useMediaQuery'

import PropTypes from 'prop-types'

import { handlerDrawerOpen, useGetMenuMaster } from 'api/menu'
import { DRAWER_WIDTH } from 'config'

import DrawerContent from './DrawerContent'
import DrawerHeader from './DrawerHeader'
import MiniDrawerStyled from './MiniDrawerStyled'

export default function MainDrawer({ window }) {
  const { menuMaster } = useGetMenuMaster()
  const drawerOpen = menuMaster.isDashboardDrawerOpened
  const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'))

  // responsive drawer container
  const container =
    window !== undefined ? () => window().document.body : undefined

  // header content
  const drawerContent = useMemo(() => <DrawerContent />, [])
  const drawerHeader = useMemo(
    () => <DrawerHeader open={drawerOpen} />,
    [drawerOpen]
  )

  return (
    <Box
      component="nav"
      sx={{ flexShrink: { md: 0 }, zIndex: 1200 }}
      aria-label="mailbox folders"
    >
      {!downLG ? (
        <MiniDrawerStyled variant="permanent" open={drawerOpen}>
          {drawerHeader}
          {drawerContent}
        </MiniDrawerStyled>
      ) : (
        <Drawer
          container={container}
          variant="temporary"
          open={drawerOpen}
          onClose={() => handlerDrawerOpen(!drawerOpen)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', lg: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
              borderRight: '1px solid',
              borderRightColor: 'divider',
              backgroundImage: 'none',
              boxShadow: 'inherit',
            },
          }}
        >
          {drawerHeader}
          {drawerContent}
        </Drawer>
      )}
    </Box>
  )
}

MainDrawer.propTypes = { window: PropTypes.func }
