import SectionsWrapper from 'components/sections/SectionsWrapper'

import { Options } from 'highcharts'

import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { ValueType } from 'utils/value'

import { SectionsPropsType } from 'types/sections'

const CARD_TITLE = '婚姻件数と平均初婚年齢（夫）'
const CARD_ID = 'scatter-product-first-marriage-husband-number-of-marriage'

// x軸 婚姻件数
const ESTAT_PARAMS_MOLECULE = {
  statsDataId: '0000010101',
  cdCat01: 'A9101',
}

// y軸 平均初婚年齢（夫）
const ESTAT_PARAMS_DENOMINATOR = {
  statsDataId: '0000010101',
  cdCat01: 'A9111',
}

// values
async function processValues() {
  const values = await handleEstatAPI().fetchValues([
    ESTAT_PARAMS_MOLECULE,
    ESTAT_PARAMS_DENOMINATOR,
  ])

  return values
}

// document
async function processDocument(values: ValueType[]): Promise<DocumentType> {
  const { formatLatestDocument } = handleDocument(values, 'common')
  const document = formatLatestDocument()

  return document
}

export default async function ScatterFirstMarriageHusbandNumberOfMarriage({
  routerProps,
  children,
}: SectionsPropsType<Options>) {
  return (
    <SectionsWrapper
      routerProps={{ ...routerProps, cardId: CARD_ID }}
      cardTitle={CARD_TITLE}
      processValues={processValues}
      processDocument={processDocument}
    >
      {children}
    </SectionsWrapper>
  )
}
