import { createContext } from 'react'

import PropTypes from 'prop-types'

import defaultConfig from 'config'
import useLocalStorage from 'hooks/useLocalStorage'

// initial state
const initialState = {
  ...defaultConfig,
  onChangeContainer: () => {},
  onChangeMode: () => {},
  onChangePresetColor: () => {},
  onChangeDirection: () => {},
  onChangeMiniDrawer: () => {},
  onChangeMenuOrientation: () => {},
  onChangeFontFamily: () => {},
  onChangeURL: () => {},
}

const ConfigContext = createContext(initialState)

function ConfigProvider({ children }) {
  const [config, setConfig] = useLocalStorage(
    'mantis-react-next-ts-config',
    initialState
  )

  const onChangeContainer = () => {
    setConfig({
      ...config,
      container: !config.container,
    })
  }

  const onChangeMode = (mode) => {
    setConfig({
      ...config,
      mode,
    })
  }

  const onChangePresetColor = (theme) => {
    setConfig({
      ...config,
      presetColor: theme,
    })
  }

  const onChangeDirection = (direction) => {
    setConfig({
      ...config,
      themeDirection: direction,
    })
  }

  const onChangeMiniDrawer = (miniDrawer) => {
    setConfig({
      ...config,
      miniDrawer,
    })
  }

  const onChangeMenuOrientation = (layout) => {
    setConfig({
      ...config,
      menuOrientation: layout,
    })
  }

  const onChangeFontFamily = (fontFamily) => {
    setConfig({
      ...config,
      fontFamily,
    })
  }

  const onChangeURL = (
    kindId: string,
    prefCode?: string,
    cityCode?: string
  ) => {
    const newConfig = { ...config, kindId }

    if (prefCode !== undefined) {
      newConfig.prefCode = prefCode
    }

    if (cityCode !== undefined) {
      newConfig.cityCode = cityCode
    }

    setConfig(newConfig)
  }

  return (
    <ConfigContext.Provider
      value={{
        ...config,
        onChangeContainer,
        onChangeMode,
        onChangePresetColor,
        onChangeDirection,
        onChangeMiniDrawer,
        onChangeMenuOrientation,
        onChangeFontFamily,
        onChangeURL,
      }}
    >
      {children}
    </ConfigContext.Provider>
  )
}

export { ConfigProvider, ConfigContext }

ConfigProvider.propTypes = { children: PropTypes.node }
