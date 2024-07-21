import { DocumentType, ValueType } from 'utils/e-stat'

import {
  calcAverage,
  calcDeviationValue,
  calcMedian,
  calcStandardDeviation,
  calcVariance,
} from './calcStatic'

export type RankTableColumnType = {
  header: string
  footer: string
  accessorKey: string
  enableSorting?: boolean
}

export type RankTableDataType = ValueType & {
  deviationValue: number
  tableValue: string
}

export type ReactRankTableType = {
  columns: RankTableColumnType[]
  data: RankTableDataType[]
  average: number
  averageString: string
  median: number
  medianString: string
  standardDeviation: number
  variance: number
}

/**
 * 数値を指定された小数点以下の桁数で丸める
 * @param {number} value - 丸める数値
 * @param {number | null} digit - 小数点以下の桁数（nullの場合は整数に丸める）
 * @returns {number} 丸められた数値
 */
const roundNumber = (value: number, digit: number | null): number =>
  digit === null ? Math.round(value) : Number(value.toFixed(digit))

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

  const filteredValues = values.filter((f) => f.areaCode !== '00000')
  const numbers = filteredValues.map((d) => d.value)
  const average = roundNumber(calcAverage(numbers), 1)
  const median = roundNumber(calcMedian(numbers), 1)
  const standardDeviation = roundNumber(calcStandardDeviation(numbers), 1)
  const variance = roundNumber(calcVariance(numbers), 1)

  // ソートしてランクを付与
  const sortedData = filteredValues
    .map((item) => ({
      ...item,
      tableValue: `${item.value.toLocaleString()} ${item.unit}`,
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
    average,
    averageString: `${average.toLocaleString()} ${values[0].unit}`,
    median,
    medianString: `${median.toLocaleString()} ${values[0].unit}`,
    standardDeviation,
    variance,
  }
}

export default formatReactRankTable
