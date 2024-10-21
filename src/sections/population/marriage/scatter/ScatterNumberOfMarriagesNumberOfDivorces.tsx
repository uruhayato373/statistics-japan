import SectionsWrapper from 'components/sections/SectionsWrapper'

import { Options } from 'highcharts'

import { SectionsPropsType } from 'types/sections'
import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { ValueType } from 'utils/value'

const CARD_TITLE = '離婚件数と婚姻件数'
const CARD_ID = 'scatter-number-of-marriage-number-of-divorces'

// x軸 離婚件数
const ESTAT_PARAMS_MOLECULE = {
  statsDataId: '0000010101',
  cdCat01: 'A9201',
}

// y軸 婚姻件数
const ESTAT_PARAMS_DENOMINATOR = {
  statsDataId: '0000010101',
  cdCat01: 'A9101',
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

export default async function ScatterNumberOfMarriagesNumberOfDivorces({
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
