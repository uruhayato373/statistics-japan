import { ValueType } from 'utils/value'

import {
  calcAverage,
  calcDeviationValue,
  calcStandardDeviation,
} from './calcStatic'

export type RankingValueType = ValueType & {
  deviationValue: number
  rank: number
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

const roundNumber = (value: number, digit: number): number =>
  Number(value.toFixed(digit))

const calcRankingValues = (values: ValueType[]): RankingValueType[] => {
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
      deviationValue: roundNumber(
        calcDeviationValue(item.value, average, standardDeviation),
        1
      ),
    }))
    .sort((a, b) => b.value - a.value) // 降順にソート

  return sortedData.map((item, index) => ({
    ...item,
    rank: index + 1,
  }))
}

export default calcRankingValues
