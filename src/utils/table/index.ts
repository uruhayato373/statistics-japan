import { DocumentType } from 'utils/document'

import formatReactRankTable from './formatReactRankTable'
import formatReactTable from './formatReactTable'

export type * from './formatReactRankTable'

const formatTable = (document: DocumentType) => {
  return {
    reactTable: () => formatReactTable(document),
    reactRankTable: () => formatReactRankTable(document),
  }
}

export default formatTable
