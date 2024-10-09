import { ReactNode } from 'react'

import { ApexOptions } from 'apexcharts'
import { Options } from 'highcharts'

import { DocumentType, RankingDocumentType } from 'utils/document'

export type CardsPropsType<
  T extends DocumentType | RankingDocumentType =
    | DocumentType
    | RankingDocumentType,
  U extends Options | ApexOptions = Options | ApexOptions,
> = {
  title: string
  document: T
  height?: string
  options?: U
  linkButton?: ReactNode
}

export type CardsHighchartsPropsType<
  T extends DocumentType | RankingDocumentType =
    | DocumentType
    | RankingDocumentType,
  U extends Options | ApexOptions = Options | ApexOptions,
> = {
  title: string
  document: T
  height?: string
  options?: U
  linkButton?: ReactNode
}

export type CardsHighchartsRankingPropsType<
  T extends DocumentType | RankingDocumentType =
    | DocumentType
    | RankingDocumentType,
  U extends Options | ApexOptions = Options | ApexOptions,
> = {
  title: string
  document: T
  height?: string
  options?: U
  linkButton?: ReactNode
}

export type CardsApexPropsType<
  T extends DocumentType | RankingDocumentType =
    | DocumentType
    | RankingDocumentType,
  U extends Options | ApexOptions = Options | ApexOptions,
> = {
  title: string
  document: T
  height?: string
  options?: U
  linkButton?: ReactNode
}

export type CardsApexRankingPropsType<
  T extends DocumentType | RankingDocumentType =
    | DocumentType
    | RankingDocumentType,
  U extends Options | ApexOptions = Options | ApexOptions,
> = {
  title: string
  document: T
  height?: string
  options?: U
  linkButton?: ReactNode
}
