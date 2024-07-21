import { DocumentType } from 'utils/e-stat'

import formatD3chartsMap from './formatD3chartsMap'

export type * from './formatD3chartsMap'

const formatD3charts = (document: DocumentType) => {
  return {
    mapChart: () => formatD3chartsMap(document),
  }
}

export default formatD3charts
