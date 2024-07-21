import PropTypes from 'prop-types'

import PopupStyled from './PopupStyled'

export default function MapPopup({ sx, children, ...other }) {
  return (
    <PopupStyled anchor="bottom" sx={sx} {...other}>
      {children}
    </PopupStyled>
  )
}

MapPopup.propTypes = {
  sx: PropTypes.object,
  children: PropTypes.any,
  other: PropTypes.any,
}
