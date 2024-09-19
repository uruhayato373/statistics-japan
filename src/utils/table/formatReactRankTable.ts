import { DocumentType } from 'utils/document'
import { ValueType } from 'utils/value'

import {
  calcAverage,
  calcDeviationValue,
  calcStandardDeviation,
} from './calcStatic'

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

/**
 * 数値の小数点以下の桁数を取得する
 * @param {number} value - 対象の数値
 * @returns {number} 小数点以下の桁数
 */
const getDecimalPlaces = (value: number): number => {
  const match = value.toString().match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/)
  return match
    ? Math.max(0, (match[1] ? match[1].length : 0) - (match[2] ? +match[2] : 0))
    : 0
}

/**
 * 数値を指定された小数点以下の桁数で丸める
 * @param {number} value - 丸める数値
 * @param {number} digit - 小数点以下の桁数
 * @returns {number} 丸められた数値
 */
const roundNumber = (value: number, digit: number): number =>
  Number(value.toFixed(digit))

/**
 * ドキュメントデータをReact Ranking Tableフォーマットに変換する
 * @param {DocumentType} document - 変換元のドキュメントデータ
 * @returns {ReactRankTableType} React Table用のデータ構造
 */
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

  const filteredValues = values
    .filter((f) => f.areaCode !== '00000')
    .filter((f) => !isNaN(f.value))
  const numbers = filteredValues.map((d) => d.value)

  // 最大の小数点以下の桁数を取得
  const maxDecimalPlaces = Math.max(...numbers.map(getDecimalPlaces))

  const average = roundNumber(calcAverage(numbers), maxDecimalPlaces)
  const standardDeviation = roundNumber(
    calcStandardDeviation(numbers),
    maxDecimalPlaces
  )

  // ソートしてランクを付与
  const sortedData = filteredValues
    .map((item) => ({
      ...item,
      tableValue: item.value
        ? `${item.value.toFixed(maxDecimalPlaces)} ${item.unit}`
        : '-',
      deviationValue: roundNumber(
        calcDeviationValue(item.value, average, standardDeviation),
        1
      ),
    }))
    .sort((a, b) => b.value - a.value) // 降順にソート

  const data: RankTableDataType[] = sortedData.map((item, index) => ({
    ...item,
    rank: index + 1,
  }))

  return {
    columns,
    data,
  }
}

export default formatReactRankTable
