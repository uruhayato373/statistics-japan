import { DocumentType } from 'utils/document'
import formatNumberJapanese from 'utils/value/modules/formatNumberJapanese'

export interface TimeTableColumn {
  header: string
  footer: string
  accessorKey: string
}

export interface TimeTableData {
  timeName: string
  [key: string]: string
}

export interface ReactTimeTable {
  columns: TimeTableColumn[]
  data: TimeTableData[]
}

const sortTimesByCodeDescending = (times: DocumentType['times']) =>
  [...times].sort((a, b) => b.timeCode.localeCompare(a.timeCode))

const createColumns = (
  categories: DocumentType['categories']
): TimeTableColumn[] => [
  {
    header: '年度',
    footer: '年度',
    accessorKey: 'timeName',
  },
  ...categories.map((category) => ({
    header: category.categoryName,
    footer: category.categoryName,
    accessorKey: category.categoryCode,
  })),
]

const findMatchedValue = (
  values: DocumentType['values'],
  timeCode: string,
  categoryCode: string
) =>
  values.find(
    (value) =>
      value.timeCode === timeCode && value.categoryCode === categoryCode
  )

const createTableData = (
  sortedTimes: DocumentType['times'],
  categories: DocumentType['categories'],
  values: DocumentType['values']
): TimeTableData[] =>
  sortedTimes.map((time) => ({
    timeName: time.timeName,
    ...Object.fromEntries(
      categories.map((category) => {
        const matchedValue = findMatchedValue(
          values,
          time.timeCode,
          category.categoryCode
        )

        return [
          category.categoryCode,
          `${formatNumberJapanese(matchedValue?.value)} ${matchedValue?.unit || ''}`,
        ]
      })
    ),
  }))

const formatReactTable = (document: DocumentType): ReactTimeTable => {
  const { categories, times, values } = document

  const sortedTimes = sortTimesByCodeDescending(times)
  const columns = createColumns(categories)
  const data = createTableData(sortedTimes, categories, values)

  return { columns, data }
}

export default formatReactTable
