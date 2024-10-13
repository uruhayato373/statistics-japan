'use client'

import { Suspense, useMemo } from 'react'

import dynamic from 'next/dynamic'

import { Divider } from '@mui/material'

import CircularProgressCards from 'components/CircularProgressCards'
import MainCard from 'components/MainCard'
import { CSVExport } from 'components/third-party/react-table'

import { CardsPropsType } from 'types/cards'
import formatTable from 'utils/table'

import Header from './Header'

// 動的インポートを使用してReactTimeTableを遅延ロード
const ReactTimeTable = dynamic(() => import('./Table'), {
  loading: () => <CircularProgressCards />,
})

export default function CardsReactTimeTable({
  title,
  document,
}: CardsPropsType) {
  const { columns, data } = useMemo(
    () => formatTable(document).reactTable(),
    [document]
  )

  const headers = useMemo(
    () =>
      columns.map((column) => ({
        label: column.footer,
        key: column.accessorKey as string,
      })),
    [columns]
  )

  const filename = `${title}.csv`

  const csvExportComponent = useMemo(
    () => <CSVExport data={data} headers={headers} filename={filename} />,
    [data, headers, filename]
  )

  return (
    <MainCard content={false}>
      <Header title={title} csvExportComponent={csvExportComponent} />
      <Divider sx={{ mt: 1.5, mb: 1.5 }} />
      <Suspense fallback={<CircularProgressCards />}>
        <ReactTimeTable columns={columns} data={data} />
      </Suspense>
    </MainCard>
  )
}
