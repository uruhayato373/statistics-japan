import { DocumentType } from 'utils/document'

import formatHighchartsMapChart from './modules/HighchartsMapChart'

const formatHighcharts = (document: DocumentType) => {
  return {
    mapChart: () => formatHighchartsMapChart(document),
  }
}

export default formatHighcharts
