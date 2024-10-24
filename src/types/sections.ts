import { ApexOptions } from 'apexcharts'
import { Options } from 'highcharts'

import { DocumentType } from 'utils/document'
import { ValueType } from 'utils/value'

import { CardsPropsType } from './cards'

import { RouterPropsType } from 'types/apps'

export interface SectionsPropsType<
  T extends Options | ApexOptions = ApexOptions,
> {
  routerProps?: RouterPropsType
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
