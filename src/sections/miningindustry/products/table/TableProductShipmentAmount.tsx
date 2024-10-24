import SectionsWrapper from 'components/sections/SectionsWrapper'

import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { ValueType } from 'utils/value'

import { SectionsPropsType } from 'types/sections'

const CARD_TITLE = '製造品出荷額'
const CARD_ID = 'table-product-shipment-amount'

const ESTAT_PARAMS = {
  statsDataId: '0000010103',
  cdCat01: ['C3401', 'C3402', 'C3403', 'C3404'],
}

// values
async function processValues() {
  const { fetchValues } = handleEstatAPI()
  const values = await fetchValues(ESTAT_PARAMS)

  return formatValues(values)
}

// format values
function formatValues(values: ValueType[]): ValueType[] {
  return values.map((d) => {
    return {
      ...d,
      // 単位を億円に変換
      value: ['C3401', 'C3402'].includes(d.categoryCode)
        ? Math.round(Number(d.value) / 100)
        : d.value,
      unit: ['C3401', 'C3402'].includes(d.categoryCode) ? '億円' : d.unit,
    }
  })
}

// document
async function processDocument(values: ValueType[]): Promise<DocumentType> {
  const { formatDocument } = handleDocument(values)
  const document = formatDocument()

  return document
}

// コンポーネントの描画
export default async function TableProductShipmentAmount({
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
