import { DocumentType } from 'utils/e-stat'

import formatApexchartsPie from './formatApexchartsPie'
import formatApexchartsPyramid from './formatApexchartsPyramid'
import formatApexchartsTime from './formatApexchartsTime'

// 型のエクスポート
export type * from './formatApexchartsTime'
export type * from './formatApexchartsPyramid'

const formatApexcharts = (document: DocumentType) => {
  return {
    timeChart: (group: 'category' | 'area' = 'category') =>
      formatApexchartsTime(document, group),
    PieChart: (timeCode: string) => formatApexchartsPie(document, timeCode),
    PyramidChart: (timeCode: string) =>
      formatApexchartsPyramid(document, timeCode),
  }
}

export default formatApexcharts
