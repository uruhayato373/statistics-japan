import SectionsWrapper from 'components/sections/SectionsWrapper'

import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { ValueType } from 'utils/value'

import { SectionsPropsType } from 'types/sections'

const CARD_TITLE = '実支出'
const CARD_ID = 'table-actual-expenditure'

const ESTAT_PARAMS = {
  statsDataId: '0000010112',
  cdCat01: [
    'L3210',
    'L3211',
    'L321101',
    'L321102',
    'L321103',
    'L321104',
    'L321105',
    'L321106',
    'L321107',
    'L321108',
    'L321109',
    'L3211091',
    'L3211092',
    'L3211093',
    'L321110',
    'L321121',
    'L321122',
    'L3212',
    'L3213',
    'L321301',
    'L321302',
    'L321303',
    'L321304',
  ],
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

  return document
}

// コンポーネントの描画
export default async function TableActualExpenditure({
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
