import { DocumentType } from 'utils/e-stat'

import formatDashboardSingle from './modules/single'

export type * from './modules/single'

const formatDashboard = (document: DocumentType) => {
  return {
    single: ({ digit }: { digit?: number } = {}) =>
      formatDashboardSingle({ ...document, digit }),
  }
}

export default formatDashboard
