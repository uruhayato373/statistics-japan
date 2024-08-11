/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
'use client'

import { useState } from 'react'

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

import {
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  useReactTable,
} from '@tanstack/react-table'

import { ReactRankTableType } from 'utils/table'

type Props = {
  contents: ReactRankTableType
}

export default function ReactSortingTable({ contents }: Props) {
  const { data, columns } = contents

  const [sorting, setSorting] = useState([
    {
      id: 'rank',
      desc: false,
    },
  ])

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const headers = []
  table.getAllColumns().map((columns) =>
    headers.push({
      label:
        typeof columns.columnDef.header === 'string'
          ? columns.columnDef.header
          : '#',
      // @ts-expect-error: 説明をここに書く
      key: columns.columnDef.accessorKey,
    })
  )

  const isRightAligned = (columnId: string) => {
    return ['tableValue', 'deviationValue'].includes(columnId)
  }

  return (
    <TableContainer
      component={Paper}
      sx={{
        maxHeight: 400,
        overflow: 'auto',
        '&::-webkit-scrollbar': {
          width: '10px',
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
      <Table size="small" stickyHeader sx={{ minWidth: 300 }}>
        <TableHead
          sx={{
            position: 'sticky',
            top: 0,
            backgroundColor: 'grey.100',
            zIndex: 1,
          }}
        >
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                if (
                  header.column.columnDef.meta !== undefined &&
                  header.column.getCanSort()
                ) {
                  Object.assign(header.column.columnDef.meta, {
                    className:
                      header.column.columnDef.meta.className +
                      ' cursor-pointer prevent-select',
                  })
                }

                return (
                  <TableCell
                    key={header.id}
                    {...header.column.columnDef.meta}
                    onClick={header.column.getToggleSortingHandler()}
                    {...(header.column.getCanSort() &&
                      header.column.columnDef.meta === undefined && {
                        className: 'cursor-pointer prevent-select',
                      })}
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
                    }}
                  >
                    {header.isPlaceholder ? null : (
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
                    )}
                  </TableCell>
                )
              })}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  {...cell.column.columnDef.meta}
                  sx={{
                    textAlign: isRightAligned(cell.column.id)
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
      </Table>
    </TableContainer>
  )
}
