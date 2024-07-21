import Checkbox from '@mui/material/Checkbox'

import PropTypes from 'prop-types'

export default function IndeterminateCheckbox({ indeterminate, ...rest }) {
  return (
    <Checkbox
      {...rest}
      indeterminate={
        typeof indeterminate === 'boolean' && !rest.checked && indeterminate
      }
    />
  )
}

IndeterminateCheckbox.propTypes = { indeterminate: PropTypes.bool }
