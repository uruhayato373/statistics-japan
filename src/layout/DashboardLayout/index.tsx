/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
'use client'

import { useEffect } from 'react'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import useMediaQuery from '@mui/material/useMediaQuery'

import Breadcrumbs from 'components/breadcrumbs/Breadcrumbs'
import Loader from 'components/Loader'

import PropTypes from 'prop-types'

import { handlerDrawerOpen, useGetMenuMaster } from 'api/menu'
import { MenuOrientation } from 'config'
import useConfig from 'hooks/useConfig'
import useURL from 'hooks/useURL'

import Drawer from './Drawer'
import HorizontalBar from './Drawer/HorizontalBar'
import Footer from './Footer'
import Header from './Header'

export default function DashboardLayout({ children }) {
  const { menuMasterLoading } = useGetMenuMaster()
  const downXL = useMediaQuery((theme) => theme.breakpoints.down('xl'))
  const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'))

  const { container, miniDrawer, menuOrientation } = useConfig()

  const isHorizontal = menuOrientation === MenuOrientation.HORIZONTAL && !downLG

  // set media wise responsive drawer
  useEffect(() => {
    if (!miniDrawer) {
      handlerDrawerOpen(!downXL)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [downXL])

  useURL()

  if (menuMasterLoading) return <Loader />

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Header />
      {!isHorizontal ? <Drawer /> : <HorizontalBar />}
      <Box
        component="main"
        sx={{ width: 'calc(100% - 260px)', flexGrow: 1, p: { xs: 2, sm: 3 } }}
      >
        <Toolbar sx={{ mt: isHorizontal ? 8 : 'inherit' }} />
        <Container
          maxWidth={container ? 'xl' : false}
          sx={{
            ...(container && { px: { xs: 0, sm: 2 } }),
            position: 'relative',
            minHeight: 'calc(100vh - 110px)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Breadcrumbs />
          {children}
          <Footer />
        </Container>
      </Box>
      {/* <AddCustomer /> */}
    </Box>
  )
}

DashboardLayout.propTypes = { children: PropTypes.node }
