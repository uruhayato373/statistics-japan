import { DocumentType } from 'utils/e-stat'

import formatApexchartsPyramid from './formatApexchartsPyramid'
import formatApexchartsTime from './formatApexchartsTime'

// 型のエクスポート
export type * from './formatApexchartsTime'
export type * from './formatApexchartsPyramid'

const formatApexcharts = (document: DocumentType) => {
  return {
    timeChart: (group: 'category' | 'area' = 'category') =>
      formatApexchartsTime(document, group),
    PyramidChart: (timeCode: string) =>
      formatApexchartsPyramid(document, timeCode),
  }
}

export default formatApexcharts
