import SectionsWrapper from 'components/sections/SectionsWrapper'

import { SectionsPropsType } from 'types/sections'
import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { ValueType } from 'utils/value'

const CARD_TITLE = '消費支出'
const CARD_ID = 'table-consumption-expenditure'

const ESTAT_PARAMS = {
  statsDataId: '0000010112',
  cdCat01: [
    'L3201',
    'L320101',
    'L320102',
    'L320103',
    'L320104',
    'L320105',
    'L320106',
    'L320107',
    'L320108',
    'L320109',
    'L3201091',
    'L3201092',
    'L3201093',
    'L320110',
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
export default async function TableConsumptionExpenditure({
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
