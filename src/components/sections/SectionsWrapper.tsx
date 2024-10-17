import React from 'react'

import { ApexOptions } from 'apexcharts'
import { Options } from 'highcharts'

import { CardsPropsType } from 'types/cards'
import { SectionsWrapperPropsType } from 'types/sections'
import { DocumentType } from 'utils/document'
import handleOGP from 'utils/ogp'
import handlePNG from 'utils/png'
import { RouterProps } from 'utils/props'
import { ValueType } from 'utils/value'

const SAVE_OGP = process.env.SAVE_OGP
const SAVE_PNG = process.env.SAVE_PNG

async function serverAction(
  title: string,
  routerProps: RouterProps,
  document: DocumentType
) {
  if (SAVE_OGP === 'true') {
    if (routerProps.kindId === 'prefecture-rank') {
      await handleOGP(title, routerProps, document).saveSupabase()
    }
  }

  if (SAVE_PNG === 'true') {
    if (routerProps.cardId.includes('ranking')) {
      await handlePNG(title, routerProps, document).saveBestWorstPNG()
    }

    if (routerProps.cardId.includes('scatter')) {
      await handlePNG(title, routerProps, document).saveCorrelationPNG()
    }
  }
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

  const values = await processValues()

  const filteredValues = filterValues(values, kindId, prefCode)
  const document = await processDocument(filteredValues)

  const childProps: CardsPropsType<T> = {
    title: cardTitle,
    document,
    options,
    linkButton,
  }

  // server action
  await serverAction(cardTitle, routerProps, document)

  return <>{children(childProps)}</>
}

export default SectionsWrapper
