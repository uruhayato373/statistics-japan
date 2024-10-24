import SectionsWrapper from 'components/sections/SectionsWrapper'

import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { ValueType } from 'utils/value'

import { SectionsPropsType } from 'types/sections'

const CARD_TITLE = '婚姻件数・離婚件数'
const CARD_ID = 'axis-marriages-divorces'

const ESTAT_PARAMS = {
  statsDataId: '0000010101',
  cdCat01: ['A9101', 'A9201'],
}

// values
async function processValues() {
  const { fetchValues } = handleEstatAPI()
  const values = await fetchValues(ESTAT_PARAMS)

  return values
}

// format values
// function formatValues(values: ValueType[]) {
//   return values.map((d) => ({
//     ...d,
//     categoryName: d.categoryName.replace('（15歳以上）', ''),
//   }))
// }

// document
async function processDocument(values: ValueType[]): Promise<DocumentType> {
  const { formatDocument } = handleDocument(values)
  const document = formatDocument()

  document.categories[0].type = 'line'
  document.categories[1].type = 'line'

  return document
}

// コンポーネントの描画
export default async function AxisMarriagesDivorces({
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
