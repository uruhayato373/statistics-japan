import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'

const MapContainerStyled = styled(Box)({
  zIndex: 0,
  height: 576,
  overflow: 'hidden',
  position: 'relative',
  borderRadius: 4,
  '& .mapboxgl-ctrl-logo, .mapboxgl-ctrl-bottom-right': {
    display: 'none',
  },
})

export default MapContainerStyled
