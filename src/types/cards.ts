import { ReactNode } from 'react'

import { ApexOptions } from 'apexcharts'
import { Options } from 'highcharts'

import { DocumentType } from 'utils/document'

export type CardsPropsType<
  T extends Options | ApexOptions = Options | ApexOptions,
> = {
  title: string
  document: DocumentType
  height?: string
  options?: T
  linkButton?: ReactNode
}

export interface CardsHeaderPropsType {
  title: string
  csvButton: React.ReactNode
  linkButton?: React.ReactNode
}
