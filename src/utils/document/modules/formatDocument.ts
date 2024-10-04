import { ValueType } from 'utils/value'

import { DocumentType } from '../types/document'

import extractCommonTimes from './extractCommonTimes'
import formatAreas from './formatAreas'
import formatCategories from './formatCategories'
import formatTimes from './formatTimes'

const formatDocument = (
  values: ValueType[],
  timesType: 'all' | 'common' = 'all'
): DocumentType => {
  const times =
    timesType === 'common' ? extractCommonTimes(values) : formatTimes(values)
  return {
    values,
    categories: formatCategories(values),
    areas: formatAreas(values),
    times,
  }
}

export default formatDocument
