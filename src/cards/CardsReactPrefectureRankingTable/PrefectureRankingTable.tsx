'use client'

import SimpleBar from 'components/third-party/SimpleBar'

import { DocumentType } from 'utils/document'
import formatTable from 'utils/table'

import ReactSortingTable from './ReactSortingTable'
interface Props {
  document: DocumentType
}

export default function PrefectureRankingTable({ document }: Props) {
  const contents = formatTable(document).reactRankTable()

  return (
    <SimpleBar sx={{ maxHeight: '100%', width: '100%' }}>
      <ReactSortingTable contents={contents} />
    </SimpleBar>
  )
}
