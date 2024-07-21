import { useMemo } from 'react'

import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import PropTypes from 'prop-types'

import useConfig from 'hooks/useConfig'

import { NextAppDirEmotionCacheProvider } from './emotionCache'
import componentsOverride from './overrides'
import Palette from './palette'
import CustomShadows from './shadows'
import Typography from './typography'

// ==============================|| DEFAULT THEME - MAIN ||============================== //

export default function ThemeCustomization({ children }) {
  const { themeDirection, mode, presetColor, fontFamily } = useConfig()

  const theme = useMemo(() => Palette(mode, presetColor), [mode, presetColor])

  const themeTypography = useMemo(() => Typography(fontFamily), [fontFamily])
  const themeCustomShadows = useMemo(() => CustomShadows(theme), [theme])

  const themeOptions = useMemo(
    () => ({
      breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          md: 900,
          lg: 1200,
          xl: 1536,
        },
      },
      direction: themeDirection,
      mixins: {
        toolbar: {
          minHeight: 60,
          paddingTop: 8,
          paddingBottom: 8,
        },
      },
      palette: theme.palette,
      customShadows: themeCustomShadows,
      typography: themeTypography,
    }),
    [themeDirection, theme, themeTypography, themeCustomShadows]
  )

  const themes = createTheme(themeOptions)
  themes.components = componentsOverride(themes)

  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
      <ThemeProvider theme={themes}>
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  )
}

ThemeCustomization.propTypes = { children: PropTypes.node }
