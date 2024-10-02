'use client'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import MainCard from 'components/MainCard'
import { CSVExport } from 'components/third-party/react-table'
import SimpleBar from 'components/third-party/SimpleBar'

import { DocumentType } from 'utils/document'
import formatTable from 'utils/table'

import ReactTable from './ReactTable'

type Props = {
  title: string
  document: DocumentType
  height?: string
}

export default function CardsReactTimeTable({ title, document }: Props) {
  const contents = formatTable(document).reactTable()
  const { columns, data } = contents

  const headers = columns.map((column) => {
    return {
      label: column.footer,
      key: column.accessorKey as string,
    }
  })

  const filename = `${title}.csv`

  return (
    <MainCard content={false}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ p: 2, pb: 0 }}
      >
        <Typography variant="h5" color="text.primary">
          {title}
        </Typography>
        <CSVExport data={data} headers={headers} filename={filename} />
      </Stack>
      <Divider sx={{ mt: 1.5, mb: 1.5 }} />
      <Box sx={{ width: '100%' }}>
        <SimpleBar sx={{ maxHeight: '100%', width: '100%' }}>
          <ReactTable columns={columns} data={data} />{' '}
        </SimpleBar>
      </Box>
    </MainCard>
  )
}
