import { useCallback, useState } from 'react'

import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
import Tooltip from '@mui/material/Tooltip'

import IconButton from 'components/@extended/IconButton'

import FullscreenExitOutlined from '@ant-design/icons/FullscreenExitOutlined'
import FullscreenOutlined from '@ant-design/icons/FullscreenOutlined'

import { ThemeMode } from 'config'

export default function FullScreen() {
  const theme = useTheme()

  const [open, setOpen] = useState(false)
  const handleToggle = useCallback(() => {
    setOpen((prevOpen) => !prevOpen)
    if (document && !document.fullscreenElement) {
      document.documentElement.requestFullscreen()
    } else if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }, [])

  const iconBackColorOpen =
    theme.palette.mode === ThemeMode.DARK ? 'background.default' : 'grey.100'
  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <Tooltip title={open ? 'Exit Fullscreen' : 'Fullscreen'}>
        <IconButton
          color="secondary"
          variant="light"
          sx={{
            color: 'text.primary',
            bgcolor: open ? iconBackColorOpen : 'transparent',
          }}
          aria-label="fullscreen toggler"
          onClick={handleToggle}
        >
          {open ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
        </IconButton>
      </Tooltip>
    </Box>
  )
}
