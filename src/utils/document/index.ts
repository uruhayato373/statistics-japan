import { ValueType } from 'utils/value'

import compileDocument from './modules/compileDocument'
import compileLatestDocument from './modules/compileLatestDocument'
import compileRankingDocument from './modules/compileRankingDocument'
import { DocumentType, DocumentType } from './types/document'

export * from './types/document'

interface DocumentHandler {
  formatDocument: () => DocumentType
  formatLatestDocument: () => DocumentType
  formatRankingDocument: () => DocumentType
}

const handleDocument = (
  values: ValueType[],
  timesType: 'all' | 'common' = 'all'
): DocumentHandler => {
  return {
    formatDocument: () => compileDocument(values, timesType),
    formatLatestDocument: () => compileLatestDocument(values, timesType),
    formatRankingDocument: () => compileRankingDocument(values, timesType),
  }
}

export default handleDocument
