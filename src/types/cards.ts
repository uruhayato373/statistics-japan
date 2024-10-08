import { ApexOptions } from 'apexcharts'
import { Options } from 'highcharts'

import { DocumentType, RankingDocumentType } from 'utils/document'

export interface CardsPropsType {
  title: string
  document: DocumentType | RankingDocumentType
  height?: string
  options?: Options | ApexOptions
  linkButton?: React.ReactNode
}
