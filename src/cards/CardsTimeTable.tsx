'use client'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import MainCard from 'components/MainCard'
import ReactTable from 'components/table/ReactTable'
import { CSVExport } from 'components/third-party/react-table'

import { DocumentType } from 'utils/document'
import formatTable from 'utils/table'

type Props = {
  title: string
  document: DocumentType
  height?: string
}

export default function CardsTimeTable({
  title,
  document,
  height = '400px',
}: Props) {
  const contents = formatTable(document).reactTable()
  const { columns, data } = contents

  const headers = columns.map((column) => {
    return {
      label: column.footer,
      key: column.accessorKey as string,
    }
  })

  return (
    <MainCard content={false}>
      <Box sx={{ p: 2, pb: 0, height }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h5" color="text.primary">
            {title}
          </Typography>
          <CSVExport data={data} headers={headers} filename="time_table.csv" />
        </Stack>
        <Divider sx={{ mt: 1.5, mb: 1.5 }} />
        <ReactTable columns={columns} data={data} />
      </Box>
    </MainCard>
  )
}
