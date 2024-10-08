import { ApexOptions } from 'apexcharts'
import { Options } from 'highcharts'

import { DocumentType, RankingDocumentType } from 'utils/document'

export interface CardsPropsType<
  T extends DocumentType | RankingDocumentType,
  U extends Options | ApexOptions,
> {
  title: string
  document: T
  height?: string
  options?: U
  linkButton?: React.ReactNode
}
