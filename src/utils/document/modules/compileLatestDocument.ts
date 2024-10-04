import { ValueType } from 'utils/value'

import { DocumentType, TimesKindType } from '../types/document'

import extractCommonTimes from './extractCommonTimes'
import formatAreas from './formatAreas'
import formatCategories from './formatCategories'
import formatTimes from './formatTimes'

const getFormattedTimes = (
  values: ValueType[],
  timesKind: TimesKindType
): DocumentType['times'] =>
  timesKind === 'common' ? extractCommonTimes(values) : formatTimes(values)

const findLatestTime = (
  times: DocumentType['times']
): DocumentType['times'][0] =>
  [...times].sort((a, b) => parseInt(b.timeCode) - parseInt(a.timeCode))[0]

const filterLatestValues = (
  values: ValueType[],
  latestTimeCode: string
): ValueType[] => values.filter((value) => value.timeCode === latestTimeCode)

const compileLatestDocument = (
  values: ValueType[],
  timesKind: TimesKindType = 'all'
): DocumentType => {
  const times = getFormattedTimes(values, timesKind)
  const latestTime = findLatestTime(times)
  const latestValues = filterLatestValues(values, latestTime.timeCode)

  return {
    values: latestValues,
    categories: formatCategories(values),
    areas: formatAreas(values),
    times: [latestTime],
  }
}

export default compileLatestDocument
