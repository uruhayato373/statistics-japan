import { DocumentType } from 'utils/document'

import formatHighchartsMapChart from './modules/HighchartsMapChart'
import formatHighchartsScatterChart from './modules/HighchartsScatterChart'

const formatHighcharts = (document: DocumentType) => {
  return {
    mapChart: () => formatHighchartsMapChart(document),
    scatterChart: () => formatHighchartsScatterChart(document),
  }
}

export default formatHighcharts
