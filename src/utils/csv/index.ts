import { DocumentType } from 'utils/document'

import formatAxisChart from './modules/AxisChart'

const formatCSV = (document: DocumentType) => {
  return {
    AxisChart: () => formatAxisChart(document),
  }
}

export default formatCSV
