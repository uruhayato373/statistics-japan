'use client'

import { useEffect, useState } from 'react'

import OutlinedInput from '@mui/material/OutlinedInput'

import SearchOutlined from '@ant-design/icons/SearchOutlined'
import PropTypes from 'prop-types'

export function DebouncedInput({
  value: initialValue,
  onFilterChange,
  debounce = 500,
  size,
  startAdornment = <SearchOutlined />,
  ...props
}) {
  const [value, setValue] = useState(initialValue)

  const handleInputChange = (event) => setValue(event.target.value)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onFilterChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line
  }, [value])

  return (
    <OutlinedInput
      {...props}
      value={value}
      onChange={handleInputChange}
      sx={{ minWidth: 100 }}
      {...(startAdornment && { startAdornment })}
      {...(size && { size })}
    />
  )
}

export default DebouncedInput

DebouncedInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onFilterChange: PropTypes.func,
  debounce: PropTypes.number,
  size: PropTypes.any,
  startAdornment: PropTypes.any,
  SearchOutlined: PropTypes.any,
  props: PropTypes.any,
}
