import { ValueType } from 'utils/value'

import formatDocument from './modules/formatDocument'
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
    formatDocument: (values, timesType = 'all') =>
      formatDocument(values, timesType),
  }
}

export default handleDocument
