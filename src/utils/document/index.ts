import { ValueType } from 'utils/value'

import compileDocumentData from './modules/formatDocument'
import { DocumentType } from './types/document'

export * from './types/document'

interface DocumentHandler {
  formatDocument: () => DocumentType
}

const createDocumentHandler = (
  values: ValueType[],
  timesType = 'all'
): DocumentHandler => ({
  formatDocument: () => compileDocumentData(values, timesType),
})

export default createDocumentHandler
