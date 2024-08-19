'use client'

import MainCard from 'components/MainCard'
import ReactTable from 'components/table/ReactTable'
import { CSVExport } from 'components/third-party/react-table'

import { ReactTimeTableType } from 'utils/table/formatReactTable'

type Props = {
  title: string
  contents: ReactTimeTableType
}

export default function CardsTimeTable({ title, contents }: Props) {
  const { columns, data } = contents

  const headers = columns.map((column) => {
    return {
      label: column.footer,
      key: column.accessorKey as string,
    }
  })

  return (
    <MainCard
      content={false}
      title={title}
      secondary={
        <CSVExport data={data} headers={headers} filename="time_table.csv" />
      }
    >
      <ReactTable columns={columns} data={data} />
    </MainCard>
  )
}
