import { ValueType } from 'utils/value'

import { calcAverage } from './calcAverage'
import {
  calcDeviationValue,
  calcStandardDeviation,
} from './calcStandardDeviation'
import roundToDecimalPlaces from './roundToDecimalPlaces'

const calcRankingValues = (values: ValueType[]): ValueType[] => {
  const filteredValues = values
    .filter((f) => f.areaCode !== '00000')
    .filter((f) => !isNaN(f.value))
  const numbers = filteredValues.map((d) => d.value)

  const average = roundToDecimalPlaces(calcAverage(numbers), 0)
  const standardDeviation = roundToDecimalPlaces(
    calcStandardDeviation(numbers),
    0
  )

  // ソートしてランクを付与
  const sortedData = filteredValues
    .map((item) => ({
      ...item,
      deviationValue: roundToDecimalPlaces(
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
