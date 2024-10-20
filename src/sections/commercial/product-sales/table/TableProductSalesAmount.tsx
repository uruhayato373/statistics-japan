import SectionsWrapper from 'components/sections/SectionsWrapper'

import { actionSaveJson } from 'actions/saveJson'
import { SectionsPropsType } from 'types/sections'
import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { ValueType } from 'utils/value'

const CARD_TITLE = '商品販売額'
const CARD_ID = 'table-number-of-commercial-establishments'

const ESTAT_PARAMS = {
  statsDataId: '0000010103',
  cdCat01: ['C3501', 'C350101', 'C350102'],
}

// values
async function processValues() {
  const { fetchValues } = handleEstatAPI()
  const values = await fetchValues(ESTAT_PARAMS)

  await actionSaveJson(values, 'values.json')

  return formatValues(values)
}

// format values
function formatValues(values: ValueType[]): ValueType[] {
  return values.map((d) => {
    return {
      ...d,
      // 単位を億円に変換
      value: Math.round(Number(d.value) / 100),
      unit: '億円',
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
export default async function TableProductSalesAmount({
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
