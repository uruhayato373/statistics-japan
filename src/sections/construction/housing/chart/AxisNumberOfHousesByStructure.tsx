import SectionsWrapper from 'components/sections/SectionsWrapper'

import { SectionsPropsType } from 'types/sections'
import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { ValueType } from 'utils/value'

const CARD_TITLE = '構造別住宅数'
const CARD_ID = 'axis-number-of-houses-by-structure'

const ESTAT_PARAMS = {
  statsDataId: '0000010108',
  cdCat01: ['H1501', 'H1502', 'H1504', 'H1505', 'H1506'],
}

// values
async function processValues() {
  const { fetchValues } = handleEstatAPI()
  const values = await fetchValues(ESTAT_PARAMS)

  return values
}

// document
async function processDocument(values: ValueType[]): Promise<DocumentType> {
  const { formatDocument } = handleDocument(values)
  const document = formatDocument()

  return {
    ...document,
    categories: document.categories.map((d) => ({ ...d, type: 'column' })),
  }
}

// コンポーネントの描画
export default async function AxisNumberOfHousesByStructure({
  routerProps,
  children,
}: SectionsPropsType) {
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
