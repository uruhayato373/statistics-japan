import React from 'react'

import { ApexOptions } from 'apexcharts'
import { Options } from 'highcharts'

import { actionSavePrefectureRanking } from 'actions/savePrefectureRanking'
import actionSaveValues from 'actions/saveValues'
import { CardsPropsType } from 'types/cards'
import { SectionsWrapperPropsType } from 'types/sections'
import { DocumentType } from 'utils/document'
import { RouterProps } from 'utils/props'
import { ValueType } from 'utils/value'

async function serverAction(
  routerProps: RouterProps,
  cardTitle: string,
  document: DocumentType
) {
  const { saveBestWorstPNG, savePrefectureRankOGP } =
    await actionSavePrefectureRanking(cardTitle, routerProps, document)

  await Promise.all([
    saveBestWorstPNG(),
    savePrefectureRankOGP(),
    // saveRankingDB(),
  ])
}

async function SectionsWrapper<T extends Options | ApexOptions = ApexOptions>({
  routerProps,
  children,
  cardTitle,
  processValues,
  processDocument,
  options,
  linkButton,
}: SectionsWrapperPropsType<T>) {
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

  await actionSaveValues(routerProps, values)

  const document = await processDocument(values)

  const childProps: CardsPropsType<T> = {
    title: cardTitle,
    document,
    options,
    linkButton,
  }

  if (kindId === 'prefecture-rank') {
    await serverAction(routerProps, cardTitle, document)
  }

  return <>{children(childProps)}</>
}

export default SectionsWrapper
