import { DocumentType } from 'utils/document'

import formatD3chartsMap from './formatD3chartsMap'
import formatD3chartsScatter from './formatD3chartsScatter'

export type * from './formatD3chartsMap'
export type * from './formatD3chartsScatter'

const formatD3charts = (document: DocumentType) => {
  return {
    mapChart: () => formatD3chartsMap(document),
    scatterChart: () => formatD3chartsScatter(document),
  }
}

export default formatD3charts
