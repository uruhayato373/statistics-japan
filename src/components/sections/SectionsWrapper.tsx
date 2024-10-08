import React from 'react'

import { ApexOptions } from 'apexcharts'
import { Options } from 'highcharts'

import { actionSavePrefectureRanking } from 'actions/savePrefectureRanking'
import { SectionsPropsType } from 'types/sections'
import { DocumentType, RankingDocumentType } from 'utils/document'
import { RouterProps } from 'utils/props'
import { ValueType } from 'utils/value'

type ConditionalDocumentType<T extends RouterProps> =
  T['kindId'] extends 'prefecture-rank' ? RankingDocumentType : DocumentType

interface MainSectionsPropsType<T extends RouterProps>
  extends SectionsPropsType {
  cardTitle: string
  processValues: (prefCode?: string) => Promise<ValueType[]>
  processDocument: (values: ValueType[]) => Promise<ConditionalDocumentType<T>>
  options?: Options | ApexOptions
  linkButton?: React.ReactNode
}

interface ChildrenProps<T extends RouterProps> {
  title: string
  document: ConditionalDocumentType<T>
  options?: Options | ApexOptions
  linkButton?: React.ReactNode
}

async function serverAction(
  routerProps: RouterProps,
  cardTitle: string,
  document: RankingDocumentType
) {
  const { saveBestWorstPNG, savePrefectureRankOGP, saveRankingDB } =
    await actionSavePrefectureRanking(cardTitle, routerProps, document)

  await Promise.all([
    saveBestWorstPNG(),
    savePrefectureRankOGP(),
    saveRankingDB(),
  ])
}

async function SectionsWrapper<T extends RouterProps>({
  routerProps,
  children,
  cardTitle,
  processValues,
  processDocument,
  options,
  linkButton,
}: MainSectionsPropsType<T>) {
  const { prefCode, kindId } = routerProps
  let values: ValueType[]

  switch (kindId) {
    case 'japan':
      values = await processValues('00000')
      break
    case 'prefecture':
      values = await processValues(prefCode)
      break
    default:
      values = await processValues()
      break
  }

  const document = await processDocument(values)

  if (kindId === 'prefecture-rank') {
    await serverAction(routerProps, cardTitle, document as RankingDocumentType)
  }

  const childProps: ChildrenProps<T> = {
    title: cardTitle,
    document,
    options,
    linkButton,
  }

  return <>{children(childProps)}</>
}

export default SectionsWrapper
