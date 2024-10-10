import { DocumentType } from 'utils/document'

import formatAxisChart from './modules/AxisChart'
import formatRankingTable from './modules/RankingTable'

const formatCSV = (document: DocumentType | DocumentType) => {
  return {
    AxisChart: () => formatAxisChart(document as DocumentType),
    RankingTable: () => formatRankingTable(document as DocumentType),
  }
}

export default formatCSV
