import React from 'react'

import { ApexOptions } from 'apexcharts'
import { Options } from 'highcharts'

import { actionSavePrefectureRanking } from 'actions/savePrefectureRanking'
import actionSaveValues from 'actions/saveValues'
import { CardsPropsType } from 'types/cards'
import { SectionsWrapperPropsType } from 'types/sections'
import { DocumentType } from 'utils/document'
import { RouterProps } from 'utils/props'
import handleSupabase from 'utils/supabase'
import { ValueType } from 'utils/value'

const isDevelopment = process.env.NODE_ENV === 'development'
const isEstat = process.env.USE_ESTAT_API === 'true'

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

function filterValues(
  values: ValueType[],
  kindId: string,
  prefCode: string
): ValueType[] {
  switch (kindId) {
    case 'japan':
      return values.filter((f) => f.areaCode === '00000')
    case 'prefecture':
      return values.filter((f) => f.areaCode === prefCode)
    default:
      return values.filter((f) => f.areaCode !== '00000')
  }
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
  const { loadValues } = handleSupabase()

  const values = isEstat ? await processValues() : await loadValues(routerProps)

  if (isDevelopment) {
    await actionSaveValues(routerProps, values)
  }

  const filteredValues = filterValues(values, kindId, prefCode)
  const document = await processDocument(filteredValues)

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
