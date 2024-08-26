import extractCommonTimes from './modules/extractCommonTimes'
import formatAreas from './modules/formatAreas'
import formatCategories from './modules/formatCategories'
import formatTimes from './modules/formatTimes'
import { ValueType, DocumentType } from './types/document'

export type * from './types/document'

interface HandleDocumentResult {
  formatDocument: (
    values: ValueType[],
    chartType?: 'axis' | 'pie'
  ) => DocumentType
}

const handleDocument = (): HandleDocumentResult => {
  return {
    formatDocument(values, chartType = 'axis') {
      switch (chartType) {
        case 'pie':
          return {
            values,
            categories: formatCategories(values),
            areas: formatAreas(values),
            times: extractCommonTimes(values),
          }
        default:
          return {
            values,
            categories: formatCategories(values),
            areas: formatAreas(values),
            times: formatTimes(values),
          }
      }
    },
  }
}

export default handleDocument
