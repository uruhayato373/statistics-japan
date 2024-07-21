/* eslint-disable @typescript-eslint/ban-ts-comment */
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import OutlinedInput from '@mui/material/OutlinedInput'
import Select from '@mui/material/Select'
import Typography from '@mui/material/Typography'

import PropTypes from 'prop-types'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
}

export default function SelectColumnVisibility({
  getVisibleLeafColumns,
  getIsAllColumnsVisible,
  getToggleAllColumnsVisibilityHandler,
  getAllColumns,
}) {
  return (
    <FormControl sx={{ width: 200 }}>
      <Select
        id="column-hiding"
        multiple
        displayEmpty
        value={getVisibleLeafColumns()}
        input={
          <OutlinedInput
            id="select-column-hiding"
            placeholder="select column"
          />
        }
        renderValue={() => {
          if (getIsAllColumnsVisible()) {
            return (
              <Typography variant="subtitle1">All columns visible</Typography>
            )
          }

          if (getVisibleLeafColumns().length === 0) {
            return (
              <Typography variant="subtitle1">All columns hidden</Typography>
            )
          }

          return (
            <Typography variant="subtitle1">
              {getVisibleLeafColumns().length} column(s) visible
            </Typography>
          )
        }}
        MenuProps={MenuProps}
        size="small"
      >
        <MenuItem value="all" onClick={getToggleAllColumnsVisibilityHandler()}>
          <Checkbox checked={getIsAllColumnsVisible()} color="success" />
          <ListItemText primary="All Column" />
        </MenuItem>
        {getAllColumns().map(
          (column) =>
            // @ts-expect-error: 説明をここに書く
            column.columnDef.accessorKey && (
              <MenuItem
                key={column.id}
                value={column.id}
                onClick={column.getToggleVisibilityHandler()}
              >
                <Checkbox checked={column.getIsVisible()} color="success" />
                <ListItemText primary={column.columnDef.header} />
              </MenuItem>
            )
        )}
      </Select>
    </FormControl>
  )
}

SelectColumnVisibility.propTypes = {
  getVisibleLeafColumns: PropTypes.func,
  getIsAllColumnsVisible: PropTypes.func,
  getToggleAllColumnsVisibilityHandler: PropTypes.func,
  getAllColumns: PropTypes.func,
}
