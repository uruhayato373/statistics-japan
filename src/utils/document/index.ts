import { ValueType } from 'utils/value'

import compileDocument from './modules/compileDocument'
import compileRankingDocument from './modules/compileRankingDocument'
import { DocumentType, RankingDocumentType } from './types/document'

export * from './types/document'

interface DocumentHandler {
  formatDocument: () => DocumentType
  formatRankingDocument: () => RankingDocumentType
}

const handleDocument = (
  values: ValueType[],
  timesType = 'all'
): DocumentHandler => {
  return {
    formatDocument: () => compileDocument(values, timesType),
    formatRankingDocument: () => compileRankingDocument(values, timesType),
  }
}

export default handleDocument
