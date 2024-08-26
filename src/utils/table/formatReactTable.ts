import { DocumentType } from 'utils/document'

export type TimeTableColumnType = {
  header: string
  footer: string
  accessorKey: string
}

export type TimeTableDataType = {
  timeName: string
  [key: string]: string
}

export type ReactTimeTableType = {
  columns: TimeTableColumnType[]
  data: TimeTableDataType[]
}

/**
 * 数値を指定された単位付きでフォーマットする
 * @param {number | undefined} value - フォーマットする数値
 * @param {string} unit - 付加する単位
 * @returns {string} フォーマットされた文字列
 */
const formatNumber = (value: number | undefined, unit: string): string => {
  if (value === undefined) return ''
  // 小数点以下の桁数を保持しつつ、toLocaleString()を使用
  const formattedValue = value.toLocaleString('ja-JP', {
    minimumFractionDigits: (value.toString().split('.')[1] || '').length,
    maximumFractionDigits: 20,
  })
  return `${formattedValue} ${unit}`.trim()
}

/**
 * ドキュメントデータをReact Tableフォーマットに変換する
 * @param {DocumentType} document - 変換元のドキュメントデータ
 * @returns {{columns: any[], data: any[]}} React Table用のデータ構造
 */
const formatReactTable = (document: DocumentType) => {
  const { categories, times, values } = document

  // timesをtimeCodeで降順にソート
  const sortedTimes = [...times].sort((a, b) =>
    b.timeCode.localeCompare(a.timeCode)
  )

  const columns = [
    {
      header: '年度',
      footer: '年度',
      accessorKey: 'timeName',
    },
    ...categories.map((d) => ({
      header: d.categoryName,
      footer: d.categoryName,
      accessorKey: d.categoryCode,
    })),
  ]

  const data = sortedTimes.map((d) => ({
    timeName: d.timeName,
    ...Object.fromEntries(
      categories.map((category) => {
        const matchedValue = values.find(
          (f) =>
            f.timeCode === d.timeCode &&
            f.categoryCode === category.categoryCode
        )
        return [
          category.categoryCode,
          formatNumber(matchedValue?.value, matchedValue?.unit || ''),
        ]
      })
    ),
  }))

  return { columns, data }
}

export default formatReactTable
