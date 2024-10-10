import { ValueType } from 'utils/value'
import calcRankingValues, {
  ValueType,
} from 'utils/value/modules/calcRankingValues'

import { DocumentType } from '../types/document'

import extractCommonTimes from './extractCommonTimes'
import formatAreas from './formatAreas'
import formatCategories from './formatCategories'
import formatTimes from './formatTimes'

const getTimeValues = (values: ValueType[], timeCode: string) =>
  values.filter((value) => value.timeCode === timeCode)

const getCategoryValues = (values: ValueType[], categoryCode: string) =>
  values.filter((value) => value.categoryCode === categoryCode)

const calculateFormattedValues = (
  values: ValueType[],
  times: { timeCode: string }[],
  categories: { categoryCode: string }[]
): ValueType[] => {
  return times.flatMap((time) => {
    const timeValues = getTimeValues(values, time.timeCode)
    return categories.flatMap((category) => {
      const categoryValues = getCategoryValues(
        timeValues,
        category.categoryCode
      )
      return calcRankingValues(categoryValues)
    })
  })
}

const compileRankingDocument = (
  values: ValueType[],
  timesType: 'all' | 'common' = 'all'
): DocumentType => {
  const times =
    timesType === 'common' ? extractCommonTimes(values) : formatTimes(values)
  const categories = formatCategories(values)
  const formattedValues = calculateFormattedValues(values, times, categories)

  return {
    values: formattedValues,
    categories,
    areas: formatAreas(values),
    times,
  }
}

export default compileRankingDocument
