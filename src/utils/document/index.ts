import { ValueType } from 'utils/value'

// import extractCommonTimes from './modules/extractCommonTimes'
import extractCommonTimes from './modules/extractCommonTimes'
import formatAreas from './modules/formatAreas'
import formatCategories from './modules/formatCategories'
import formatTimes from './modules/formatTimes'
import { DocumentType } from './types/document'

export type * from './types/document'

interface HandleDocumentResult {
  formatDocument: (
    values: ValueType[],
    timesType?: 'all' | 'common'
  ) => DocumentType
}

const handleDocument = (): HandleDocumentResult => {
  return {
    formatDocument(values, timesType = 'all') {
      const times =
        timesType === 'common'
          ? extractCommonTimes(values)
          : formatTimes(values)

      return {
        values,
        categories: formatCategories(values),
        areas: formatAreas(values),
        times,
      }
    },
  }
}

export default handleDocument
