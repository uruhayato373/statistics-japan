import { DocumentType } from 'utils/e-stat'

import formatApexchartsPie from './formatApexchartsPie'
import formatApexchartsPyramid from './formatApexchartsPyramid'
import formatAxisTimeChart from './modules/AxisTimeChart'

// 型のエクスポート
export type * from './formatApexchartsTime'
export type * from './formatApexchartsPyramid'

const formatApexcharts = (document: DocumentType) => {
  return {
    AxisTimeChart: (group: 'category' | 'area' = 'category') =>
      formatAxisTimeChart(document, group),
    PieChart: (timeCode: string) => formatApexchartsPie(document, timeCode),
    PyramidChart: (timeCode: string) =>
      formatApexchartsPyramid(document, timeCode),
  }
}

export default formatApexcharts
