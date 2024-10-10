import { ApexOptions } from 'apexcharts'
import { Options } from 'highcharts'

import { DocumentType } from 'utils/document'
import { RouterProps } from 'utils/props'
import { ValueType } from 'utils/value'

import { CardsPropsType } from './cards'

export interface SectionsPropsType<
  T extends Options | ApexOptions = ApexOptions,
> {
  routerProps?: RouterProps
  children: (props: CardsPropsType<T>) => React.ReactNode
}

export interface SectionsWrapperPropsType<
  T extends Options | ApexOptions = Options | ApexOptions,
> extends SectionsPropsType<T> {
  cardTitle: string
  processValues: (prefCode?: string) => Promise<ValueType[]>
  processDocument: (values: ValueType[]) => Promise<DocumentType>
  options?: T
  linkButton?: React.ReactNode
}
