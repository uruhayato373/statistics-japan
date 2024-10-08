import { ApexOptions } from 'apexcharts'
import { Options } from 'highcharts'

import { DocumentType, RankingDocumentType } from 'utils/document'

export interface CardsPropsType<
  T extends DocumentType | RankingDocumentType =
    | DocumentType
    | RankingDocumentType,
  U extends Options | ApexOptions = Options | ApexOptions,
> {
  title: string
  document: T
  height?: string
  options?: U
  linkButton?: React.ReactNode
}
