'use client'

import ReactTable from 'components/table/ReactTable'

import { ReactTimeTableType } from 'utils/table/formatReactTable'

type Props = {
  contents: ReactTimeTableType
}

export default function CardsTimeTable({ contents }: Props) {
  const { columns, data } = contents

  return <ReactTable columns={columns} data={data} />
}
