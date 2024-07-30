'use client'

import MainCard from 'components/MainCard'
import ReactTable from 'components/table/ReactTable'

import { ReactTimeTableType } from 'utils/table/formatReactTable'

type Props = {
  title: string
  contents: ReactTimeTableType
}

export default function CardsTimeTable({ title, contents }: Props) {
  const { columns, data } = contents

  return (
    <MainCard
      content={false}
      title={title}
      // secondary={<CSVExport {...{ data, headers, filename: 'dense.csv' }} />}
    >
      <ReactTable columns={columns} data={data} />
    </MainCard>
  )
}
