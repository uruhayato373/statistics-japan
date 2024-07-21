import { useEffect } from 'react'

import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import PropTypes from 'prop-types'

import { ThemeDirection } from 'config'
import useConfig from 'hooks/useConfig'

export default function RTLLayout({ children }) {
  const { themeDirection } = useConfig()

  useEffect(() => {
    document.dir = themeDirection
  }, [themeDirection])

  const cacheRtl = createCache({
    key: themeDirection === ThemeDirection.RTL ? 'rtl' : 'css',
    prepend: true,
    stylisPlugins: [],
  })

  return <CacheProvider value={cacheRtl}>{children}</CacheProvider>
}

RTLLayout.propTypes = { children: PropTypes.node }
