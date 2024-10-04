'use client'

import { useState, useMemo } from 'react'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import { HeaderSort } from 'components/third-party/react-table'
import SimpleBar from 'components/third-party/SimpleBar'

import {
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  useReactTable,
} from '@tanstack/react-table'

import { DocumentType } from 'utils/document'
import formatTable from 'utils/table'

interface Props {
  document: DocumentType
}

const formatNumber = (value: number, digit: number = 1) => {
  return Number(value).toFixed(digit)
}

const useTableData = (document: DocumentType) => {
  return useMemo(() => {
    const contents = formatTable(document).reactRankTable()
    const { data, columns } = contents

    const formattedColumns = columns.map((column) => {
      if (['deviationValue'].includes(column.accessorKey)) {
        return {
          ...column,
          cell: ({ getValue }) => formatNumber(getValue()),
        }
      }
      return column
    })

    return { data, columns: formattedColumns }
  }, [document])
}

const TableHeader = ({ headerGroups }) => (
  <TableHead
    sx={{ position: 'sticky', top: 0, backgroundColor: 'grey.100', zIndex: 1 }}
  >
    {headerGroups.map((headerGroup) => (
      <TableRow key={headerGroup.id}>
        {headerGroup.headers.map((header) => (
          <TableCell
            key={header.id}
            onClick={header.column.getToggleSortingHandler()}
            sx={{
              position: 'sticky',
              top: 0,
              backgroundColor: 'grey.100',
              zIndex: 1,
              fontWeight: 'bold',
              textAlign: 'center',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              cursor: header.column.getCanSort() ? 'pointer' : 'default',
            }}
          >
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              justifyContent="center"
            >
              <Box>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </Box>
              {header.column.getCanSort() && (
                <HeaderSort column={header.column} />
              )}
            </Stack>
          </TableCell>
        ))}
      </TableRow>
    ))}
  </TableHead>
)

const TableContent = ({ rows }) => (
  <TableBody>
    {rows.map((row) => (
      <TableRow key={row.id}>
        {row.getVisibleCells().map((cell) => (
          <TableCell
            key={cell.id}
            sx={{
              textAlign: ['tableValue', 'deviationValue'].includes(
                cell.column.id
              )
                ? 'right'
                : 'center',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '200px',
            }}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </TableRow>
    ))}
  </TableBody>
)

export default function PrefectureRankingTable({ document }: Props) {
  const { data, columns } = useTableData(document)
  const [sorting, setSorting] = useState([{ id: 'rank', desc: false }])

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <SimpleBar sx={{ maxHeight: '100%', width: '100%' }}>
      <TableContainer
        component={Paper}
        sx={{
          maxHeight: 350,
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#888',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#555',
          },
          fontSize: '0.75rem',
        }}
      >
        <Table
          size="small"
          stickyHeader
          sx={{
            '& .MuiTableCell-root': {
              fontSize: '0.75rem',
              padding: '6px 16px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '200px',
            },
            '& .MuiTableCell-head': {
              fontWeight: 'bold',
              backgroundColor: '#f5f5f5',
              textAlign: 'center',
            },
          }}
        >
          <TableHeader headerGroups={table.getHeaderGroups()} />
          <TableContent rows={table.getRowModel().rows} />
        </Table>
      </TableContainer>
    </SimpleBar>
  )
}
