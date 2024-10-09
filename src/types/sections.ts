import { ApexOptions } from 'apexcharts'
import { Options } from 'highcharts'

import { DocumentType, RankingDocumentType } from 'utils/document'
import { RouterProps } from 'utils/props'

import { CardsPropsType } from './cards'

export interface SectionsPropsType<
  T extends DocumentType | RankingDocumentType = DocumentType,
  U extends Options | ApexOptions = ApexOptions,
> {
  routerProps?: RouterProps
  children: (props: CardsPropsType<T, U>) => React.ReactNode
}
