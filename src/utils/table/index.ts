import { DocumentType, RankingDocumentType } from 'utils/document'

import formatReactRankTable from './formatReactRankTable'
import formatReactTable from './formatReactTable'

export type * from './formatReactRankTable'

// 型ガード関数
function isRankingDocumentType(
  doc: DocumentType | RankingDocumentType
): doc is RankingDocumentType {
  return 'ranking' in doc
}

const formatTable = <T extends DocumentType | RankingDocumentType>(
  document: T
) => {
  return {
    reactTable: () => {
      if (isRankingDocumentType(document)) {
        throw new Error('reactTable cannot be used with RankingDocumentType')
      }
      return formatReactTable(document)
    },
    reactRankTable: () => {
      if (!isRankingDocumentType(document)) {
        throw new Error(
          'reactRankTable can only be used with RankingDocumentType'
        )
      }
      return formatReactRankTable(document)
    },
  }
}

export default formatTable
