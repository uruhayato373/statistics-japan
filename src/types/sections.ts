import { ApexOptions } from 'apexcharts'
import { Options } from 'highcharts'

import { DocumentType, RankingDocumentType } from 'utils/document'
import { RouterProps } from 'utils/props'
import { ValueType } from 'utils/value'

import { CardsPropsType } from './cards'

export interface SectionsPropsType<
  T extends DocumentType | RankingDocumentType = DocumentType,
  U extends Options | ApexOptions = ApexOptions,
> {
  routerProps?: RouterProps
  children: (props: CardsPropsType<T, U>) => React.ReactNode
}

export interface SectionsHighchartsPropsType {
  routerProps?: RouterProps
  children: (props: CardsPropsType<DocumentType, Options>) => React.ReactNode
}

export interface SectionsWrapperPropsType<
  T extends DocumentType | RankingDocumentType =
    | DocumentType
    | RankingDocumentType,
  U extends Options | ApexOptions = Options | ApexOptions,
> extends SectionsPropsType<T, U> {
  cardTitle: string
  processValues: (prefCode?: string) => Promise<ValueType[]>
  processDocument: (values: ValueType[]) => Promise<T>
  options?: U
  linkButton?: React.ReactNode
}
