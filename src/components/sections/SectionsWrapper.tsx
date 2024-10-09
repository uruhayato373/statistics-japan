import React from 'react'

import { actionSavePrefectureRanking } from 'actions/savePrefectureRanking'
import { CardsPropsType } from 'types/cards'
import { SectionsWrapperPropsType } from 'types/sections'
import { RankingDocumentType } from 'utils/document'
import { RouterProps } from 'utils/props'
import { ValueType } from 'utils/value'

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

async function SectionsWrapper({
  routerProps,
  children,
  cardTitle,
  processValues,
  processDocument,
  options,
  linkButton,
}: SectionsWrapperPropsType) {
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

  const childProps: CardsPropsType = {
    title: cardTitle,
    document,
    options,
    linkButton,
  }

  return <>{children(childProps)}</>
}

export default SectionsWrapper
