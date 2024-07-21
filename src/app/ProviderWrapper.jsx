'use client'

import 'mapbox-gl/dist/mapbox-gl.css'
import Snackbar from 'components/@extended/Snackbar'
import RTLLayout from 'components/RTLLayout'
import ScrollTop from 'components/ScrollTop'
import Notistack from 'components/third-party/Notistack'

import PropTypes from 'prop-types'

import { ConfigProvider } from 'contexts/ConfigContext'
import ThemeCustomization from 'themes'

export default function ProviderWrapper({ children }) {
  return (
    <ConfigProvider>
      <ThemeCustomization>
        <RTLLayout>
          <ScrollTop>
            <Notistack>
              <Snackbar />
              {children}
            </Notistack>
          </ScrollTop>
        </RTLLayout>
      </ThemeCustomization>
    </ConfigProvider>
  )
}

ProviderWrapper.propTypes = { children: PropTypes.node }
