import SectionsWrapper from 'components/sections/SectionsWrapper'

import { Options } from 'highcharts'

import { SectionsPropsType } from 'types/sections'
import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { ValueType } from 'utils/value'

const CARD_TITLE = '総人口と離婚件数'
const CARD_ID = 'scatter-number-of-divorces-total-population'

// x軸 総人口
const ESTAT_PARAMS_MOLECULE = {
  statsDataId: '0000010101',
  cdCat01: 'A1101',
}

// y軸 離婚件数
const ESTAT_PARAMS_DENOMINATOR = {
  statsDataId: '0000010101',
  cdCat01: 'A9201',
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

export default async function ScatterNumberOfDivorcesTotalPopulation({
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
