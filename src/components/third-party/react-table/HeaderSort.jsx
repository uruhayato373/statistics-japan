'use client'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { useTheme } from '@mui/material/styles'

import CaretDownOutlined from '@ant-design/icons/CaretDownOutlined'
import CaretUpOutlined from '@ant-design/icons/CaretUpOutlined'
import PropTypes from 'prop-types'

var SortType
;(function (SortType) {
  SortType['ASC'] = 'asc'
  SortType['DESC'] = 'desc'
})(SortType || (SortType = {}))

function SortToggler({ type }) {
  const theme = useTheme()

  return (
    <Stack sx={{ color: 'secondary.light' }}>
      <CaretUpOutlined
        style={{
          fontSize: '0.625rem',
          color:
            type === SortType.ASC ? theme.palette.text.secondary : 'inherit',
        }}
      />
      <CaretDownOutlined
        style={{
          fontSize: '0.625rem',
          marginTop: -2,
          color:
            type === SortType.DESC ? theme.palette.text.secondary : 'inherit',
        }}
      />
    </Stack>
  )
}

function HeaderSort({ column, sort }) {
  return (
    <Box
      {...(sort && {
        onClick: column.getToggleSortingHandler(),
        className: 'cursor-pointer prevent-select',
      })}
    >
      {{
        asc: <SortToggler type={SortType.ASC} />,
        desc: <SortToggler type={SortType.DESC} />,
      }[column.getIsSorted()] ?? <SortToggler />}
    </Box>
  )
}

export default HeaderSort

SortToggler.propTypes = { type: PropTypes.any }

HeaderSort.propTypes = { column: PropTypes.object, sort: PropTypes.bool }
