import { Options } from 'highcharts'

import { RankingDocumentType } from 'utils/document'

export interface CardsPropsType {
  title: string
  document: RankingDocumentType
  height?: string
}

export interface CardsHighchartsPropsType extends CardsPropsType {
  options: Options
}
