import PropTypes from 'prop-types'
import {
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from 'react-map-gl'

import MapControlsStyled from './MapControlsStyled'

export default function MapControl({
  hideScale,
  hideGeolocate,
  hideFullscreen,
  hideNavigationn,
}) {
  return (
    <>
      <MapControlsStyled />
      {!hideGeolocate && (
        <GeolocateControl
          position="top-left"
          positionOptions={{ enableHighAccuracy: true }}
        />
      )}
      {!hideFullscreen && <FullscreenControl position="top-left" />}
      {!hideScale && <ScaleControl position="bottom-left" />}
      {!hideNavigationn && <NavigationControl position="bottom-left" />}
    </>
  )
}

MapControl.propTypes = {
  hideScale: PropTypes.bool,
  hideGeolocate: PropTypes.bool,
  hideFullscreen: PropTypes.bool,
  hideNavigationn: PropTypes.bool,
}
