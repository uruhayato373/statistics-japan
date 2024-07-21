'use client'
import Image from 'next/image'

import { useTheme } from '@mui/material/styles'

import PropTypes from 'prop-types'

import { ThemeMode } from 'config'

// ==============================|| LOGO IMAGE ||============================== //

export default function LogoMain({ reverse }) {
  const theme = useTheme()

  const logoDark = '/assets/images/logo-dark.png'
  const logoLight = '/assets/images/logo.png'

  return (
    <Image
      src={
        theme.palette.mode === ThemeMode.DARK || reverse ? logoDark : logoLight
      }
      alt="statistics-japan"
      width={200}
      height={35}
      priority
    />
  )
}

LogoMain.propTypes = {
  reverse: PropTypes.bool,
}
