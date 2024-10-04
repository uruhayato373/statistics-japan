import { DocumentType, RankingDocumentType } from 'utils/document'

import formatAxisChart from './modules/AxisChart'
import formatRankingTable from './modules/RankingTable'

const formatCSV = (document: DocumentType | RankingDocumentType) => {
  return {
    AxisChart: () => formatAxisChart(document as DocumentType),
    RankingTable: () => formatRankingTable(document as RankingDocumentType),
  }
}

export default formatCSV
