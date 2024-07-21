'use client'
import Stack from '@mui/material/Stack'

import MinusOutlined from '@ant-design/icons/MinusOutlined'
import PropTypes from 'prop-types'

import DebouncedInput from './DebouncedInput'

function NumberInput({
  columnFilterValue,
  getFacetedMinMaxValues,
  setFilterValue,
}) {
  const minOpt = getFacetedMinMaxValues()?.[0]
  const min = Number(minOpt ?? '')

  const maxOpt = getFacetedMinMaxValues()?.[1]
  const max = Number(maxOpt)

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <DebouncedInput
        type="number"
        value={columnFilterValue?.[0] ?? ''}
        onFilterChange={(value) => setFilterValue((old) => [value, old?.[1]])}
        placeholder={`Min ${minOpt ? `(${min})` : ''}`}
        fullWidth
        inputProps={{ min: min, max: max }}
        size="small"
        startAdornment={false}
      />
      <>
        <MinusOutlined />
      </>
      <DebouncedInput
        type="number"
        value={columnFilterValue?.[1] ?? ''}
        onFilterChange={(value) => setFilterValue((old) => [old?.[0], value])}
        placeholder={`Max ${maxOpt ? `(${max})` : ''}`}
        fullWidth
        inputProps={{ min: min, max: max }}
        size="small"
        startAdornment={false}
      />
    </Stack>
  )
}

// ==============================|| FILTER - TEXT FIELD ||============================== //

function TextInput({ columnId, columnFilterValue, header, setFilterValue }) {
  const dataListId = columnId + 'list'

  return (
    <DebouncedInput
      type="text"
      fullWidth
      value={columnFilterValue ?? ''}
      onFilterChange={(value) => setFilterValue(value)}
      placeholder={`Search ${header}`}
      inputProps={{ list: dataListId }}
      size="small"
      startAdornment={false}
    />
  )
}

// ==============================|| FILTER - INPUT ||============================== //

export function Filter({ column, table }) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id)

  const columnFilterValue = column.getFilterValue()

  return typeof firstValue === 'number' ? (
    <NumberInput
      columnFilterValue={columnFilterValue}
      getFacetedMinMaxValues={column.getFacetedMinMaxValues}
      setFilterValue={column.setFilterValue}
    />
  ) : (
    <TextInput
      columnId={column.id}
      columnFilterValue={columnFilterValue}
      setFilterValue={column.setFilterValue}
      header={column.columnDef.header}
    />
  )
}

export default Filter

NumberInput.propTypes = {
  columnFilterValue: PropTypes.number,
  getFacetedMinMaxValues: PropTypes.func,
  setFilterValue: PropTypes.func,
}

TextInput.propTypes = {
  columnId: PropTypes.string,
  columnFilterValue: PropTypes.string,
  header: PropTypes.string,
  setFilterValue: PropTypes.func,
}

Filter.propTypes = { column: PropTypes.object, table: PropTypes.object }
