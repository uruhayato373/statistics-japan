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

const roundNumber = (value: number, digit: number): number =>
  Number(value.toFixed(digit))

const calcRankingValues = (values: ValueType[]): RankingValueType[] => {
  const filteredValues = values
    .filter((f) => f.areaCode !== '00000')
    .filter((f) => !isNaN(f.value))
  const numbers = filteredValues.map((d) => d.value)

  const average = roundNumber(calcAverage(numbers), 0)
  const standardDeviation = roundNumber(calcStandardDeviation(numbers), 0)

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
