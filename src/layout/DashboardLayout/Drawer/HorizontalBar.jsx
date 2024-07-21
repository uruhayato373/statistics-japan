import React from 'react'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { useTheme } from '@mui/material/styles'
import useScrollTrigger from '@mui/material/useScrollTrigger'

import PropTypes from 'prop-types'

import useConfig from 'hooks/useConfig'

import Navigation from './DrawerContent/Navigation'

function ElevationScroll({ children, window }) {
  const theme = useTheme()
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window,
  })

  theme.shadows[4] = theme.customShadows.z1

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  })
}

export default function CustomAppBar() {
  const { container } = useConfig()

  return (
    <ElevationScroll>
      <AppBar
        sx={{
          top: 60,
          bgcolor: 'background.paper',
          width: '100%',
          height: 62,
          justifyContent: 'center',
          borderTop: '1px solid',
          borderTopColor: 'divider',
          borderBottom: '1px solid',
          borderBottomColor: 'divider',
          zIndex: 1098,
          color: 'grey.500',
        }}
      >
        <Container maxWidth={container ? 'xl' : false}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Navigation />
          </Box>
        </Container>
      </AppBar>
    </ElevationScroll>
  )
}

ElevationScroll.propTypes = { children: PropTypes.node, window: PropTypes.any }
