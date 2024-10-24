import React from 'react'

import { DocumentType } from 'utils/document'
import { ValueType } from 'utils/value'

import { RouterPropsType } from 'types/apps'
import { SectionsWrapperPropsType } from 'types/sections'

const SAVE_OGP = process.env.SAVE_OGP === 'true'
const SAVE_PNG = process.env.SAVE_PNG === 'true'
const USE_ESTAT_API = process.env.USE_ESTAT_API === 'true'

async function serverAction(
  title: string,
  routerProps: RouterPropsType,
  document: DocumentType
) {
  if (SAVE_OGP && routerProps.kindId === 'prefecture-rank') {
    const handleOGP = (await import('utils/ogp')).default
    await handleOGP(title, routerProps, document).saveAWS()
  }

  if (SAVE_PNG) {
    const handlePNG = (await import('utils/png')).default
    if (routerProps.cardId.includes('ranking')) {
      await handlePNG(title, routerProps, document).saveRankingPNG()
    }
    if (routerProps.cardId.includes('scatter')) {
      await handlePNG(title, routerProps, document).saveCorrelationPNG()
    }
    if (routerProps.cardId.includes('axis') && routerProps.kindId === 'japan') {
      await handlePNG(title, routerProps, document).saveJapanPNG()
    }
  }
}

function filterValues(
  values: ValueType[],
  kindId: string,
  prefCode: string
): ValueType[] {
  if (kindId === 'japan') return values.filter((f) => f.areaCode === '00000')
  if (kindId === 'prefecture')
    return values.filter((f) => f.areaCode === prefCode)
  return values.filter((f) => f.areaCode !== '00000')
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

  let values: ValueType[] = []
  if (USE_ESTAT_API) {
    values = await processValues()
    const handleAWS = (await import('utils/aws')).default
    await handleAWS(routerProps).saveValues(values)
  } else {
    const handleAWS = (await import('utils/aws')).default
    values = await handleAWS(routerProps).loadValues()
  }

  const filteredValues = filterValues(values, kindId, prefCode)
  const document = await processDocument(filteredValues)

  await serverAction(cardTitle, routerProps, document)

  const childProps = { title: cardTitle, document, options, linkButton }

  return <>{children(childProps)}</>
}

export default SectionsWrapper
