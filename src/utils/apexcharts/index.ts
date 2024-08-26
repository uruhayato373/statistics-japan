import { DocumentType } from 'utils/document'

import formatAxisTimeChart from './modules/AxisTimeChart'
import formatPieChart from './modules/PieChart'
import formatApexchartsPyramid from './modules/PyramidChart'

const formatApexcharts = (document: DocumentType) => {
  return {
    AxisTimeChart: (group: 'category' | 'area' = 'category') =>
      formatAxisTimeChart(document, group),
    PieChart: (timeCode: string) => formatPieChart(document, timeCode),
    PyramidChart: (timeCode: string) =>
      formatApexchartsPyramid(document, timeCode),
  }
}

export default formatApexcharts
