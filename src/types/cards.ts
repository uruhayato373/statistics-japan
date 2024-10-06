import { ApexOptions } from 'apexcharts'
import { Options } from 'highcharts'

import { RankingDocumentType } from 'utils/document'

export interface CardsPropsType {
  title: string
  document: RankingDocumentType
  height?: string
  actionButton?: React.ReactNode
}

export interface CardsHighchartsPropsType extends CardsPropsType {
  options: Options
}

export interface CardsApexchartsPropsType extends CardsPropsType {
  options: ApexOptions
}
