import { DocumentType } from 'utils/document'

import formatAxisTimeChart from './modules/AxisTimeChart'
import formatBarChart from './modules/BarChart'
import formatPieChart from './modules/PieChart'
import formatApexchartsPyramid from './modules/PyramidChart'

const formatApexcharts = (document: DocumentType) => {
  return {
    AxisTimeChart: (group: 'category' | 'area' = 'category') =>
      formatAxisTimeChart(document, group),
    PieChart: () => formatPieChart(document),
    BarChart: (timeCode: string) => formatBarChart(document, timeCode),
    PyramidChart: (timeCode: string) =>
      formatApexchartsPyramid(document, timeCode),
  }
}

export default formatApexcharts
