'use client'

import { Suspense } from 'react'

import { Divider } from '@mui/material'

import CircularProgressCards from 'components/CircularProgressCards'
import MainCard from 'components/MainCard'
import { CSVExport } from 'components/third-party/react-table'

import { CardsPropsType } from 'types/cards'
import { DocumentType } from 'utils/document'
import formatTable from 'utils/table'

import Header from './Header'
import ReactTimeTable from './Table'

export default function CardsReactTimeTable({
  title,
  document,
}: CardsPropsType<DocumentType>) {
  const { columns, data } = formatTable(document).reactTable()

  const headers = columns.map((column) => ({
    label: column.footer,
    key: column.accessorKey as string,
  }))

  const filename = `${title}.csv`
  const csvExportComponent = (
    <CSVExport data={data} headers={headers} filename={filename} />
  )

  return (
    <Suspense fallback={<CircularProgressCards />}>
      <MainCard content={false}>
        <Header title={title} csvExportComponent={csvExportComponent} />
        <Divider sx={{ mt: 1.5, mb: 1.5 }} />
        <ReactTimeTable columns={columns} data={data} />
      </MainCard>
    </Suspense>
  )
}
