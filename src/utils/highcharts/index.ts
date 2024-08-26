import { DocumentType } from 'utils/document'

import formatAxisTimeChart from './modules/HighchartsAxisTimeChart'
import formatHighchartsMapChart from './modules/HighchartsMapChart'
import formatHighchartsScatterChart from './modules/HighchartsScatterChart'

const formatHighcharts = (document: DocumentType) => {
  return {
    AxisTimeChart: (group: 'category' | 'area' = 'category') =>
      formatAxisTimeChart(document, group),
    mapChart: () => formatHighchartsMapChart(document),
    scatterChart: () => formatHighchartsScatterChart(document),
  }
}

export default formatHighcharts
