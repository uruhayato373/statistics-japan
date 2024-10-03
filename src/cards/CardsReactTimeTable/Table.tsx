import React from 'react'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import SimpleBar from 'components/third-party/SimpleBar'

import {
  useReactTable,
  flexRender,
  getCoreRowModel,
} from '@tanstack/react-table'

import {
  TimeTableColumnType,
  TimeTableDataType,
} from 'utils/table/formatReactTable'

type Props = {
  columns: TimeTableColumnType[]
  data: TimeTableDataType[]
}

const tableContainerStyles = {
  maxHeight: 300,
  overflow: 'auto',
  '& .MuiTableHead-root': {
    position: 'sticky',
    top: 0,
    zIndex: 1,
  },
  '&::-webkit-scrollbar': {
    width: '6px',
    height: '6px',
  },
  '&::-webkit-scrollbar-track': {
    background: '#f1f1f1',
    borderRadius: '10px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#888',
    borderRadius: '10px',
    '&:hover': {
      background: '#555',
    },
  },
}

const tableStyles = {
  '& .MuiTableCell-root': {
    fontSize: '0.65rem',
    padding: '6px 8px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '150px',
    lineHeight: '1.3',
  },
  '& .MuiTableCell-head': {
    fontWeight: 'bold',
    backgroundColor: '#f5f5f5',
    textAlign: 'center',
  },
  '& .MuiTableRow-root': {
    '&:nth-of-type(even)': {
      backgroundColor: '#fafafa',
    },
  },
}

const ReactTimeTable = ({ columns, data }: Props) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const renderTableHeader = () => (
    <TableHead>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableCell
              key={header.id}
              {...header.column.columnDef.meta}
              align="center"
            >
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableHead>
  )

  const renderTableBody = () => (
    <TableBody>
      {table.getRowModel().rows.map((row) => (
        <TableRow key={row.id}>
          {row.getVisibleCells().map((cell, index) => (
            <TableCell
              key={cell.id}
              {...cell.column.columnDef.meta}
              align={index === 0 ? 'left' : 'right'}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  )
  return (
    <Box sx={{ width: '100%' }}>
      <SimpleBar sx={{ maxHeight: '100%', width: '100%' }}>
        <TableContainer component={Paper} sx={tableContainerStyles}>
          <Table size="small" stickyHeader sx={tableStyles}>
            {renderTableHeader()}
            {renderTableBody()}
          </Table>
        </TableContainer>
      </SimpleBar>
    </Box>
  )
}

export default ReactTimeTable
