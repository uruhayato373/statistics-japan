import { DocumentType } from 'utils/document'
import { ValueType } from 'utils/value'
import formatNumberJapanese from 'utils/value/modules/formatNumberJapanese'

export type RankTableColumnType = {
  header: string
  footer: string
  accessorKey: string
  enableSorting?: boolean
}

export type RankTableDataType = ValueType & {
  deviationValue: number
  rank: number
  tableValue: string
}

export type ReactRankTableType = {
  columns: RankTableColumnType[]
  data: RankTableDataType[]
}

const formatReactRankTable = (document: DocumentType): ReactRankTableType => {
  const { categories, values } = document
  const { categoryName } = categories[0]

  const columns: RankTableColumnType[] = [
    { header: '順位', footer: '順位', accessorKey: 'rank' },
    {
      header: '都道府県',
      footer: '都道府県',
      accessorKey: 'areaName',
      enableSorting: false,
    },
    {
      header: categoryName,
      footer: categoryName,
      accessorKey: 'tableValue',
      enableSorting: false,
    },
    { header: '偏差値', footer: '偏差値', accessorKey: 'deviationValue' },
  ]

  const filteredValues = values.filter((f) => !isNaN(f.value))

  const sortedData = filteredValues
    .map((item) => ({
      ...item,
      tableValue: item.value
        ? `${formatNumberJapanese(item.value)} ${item.unit}`
        : '-',
    }))
    .sort((a, b) => b.value - a.value) // 降順にソート

  return {
    columns,
    data: sortedData,
  }
}

export default formatReactRankTable
