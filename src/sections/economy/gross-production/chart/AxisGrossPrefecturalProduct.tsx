import LinkToPrefectureRank from 'components/button/LinkToPrefectureRank'
import SectionsWrapper from 'components/sections/SectionsWrapper'

import { SectionsPropsType } from 'types/sections'
import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { ValueType } from 'utils/value'

const CARD_TITLE = '県内総生産の推移'
const CARD_ID = 'axis-gross-prefectural-product'

const ESTAT_PARAMS = {
  statsDataId: '0000010103',
  cdCat01: ['C1125', 'C1126', 'C1127'],
}

const PAGE_ID = 'gross-prefectural-product'

// values
async function processValues() {
  const { fetchValues } = handleEstatAPI()
  const values = await fetchValues(ESTAT_PARAMS)

  return formatValues(values)
}

// format values
const formatValues = (values: ValueType[]) => {
  return values.map((d) => ({
    ...d,
    categoryName: d.categoryName
      .replace('県内総生産額', '')
      .replace('平成27年基準', '')
      .replace('（', '')
      .replace('）', ''),
  }))
}

// document
async function processDocument(values: ValueType[]): Promise<DocumentType> {
  const { formatDocument } = handleDocument(values)
  const document = formatDocument()

  document.categories = document.categories.map((d) => ({
    ...d,
    type: 'column',
  }))

  return document
}

const linkButton = <LinkToPrefectureRank pageId={PAGE_ID} />

// コンポーネントの描画
export default async function AxisGrossPrefecturalProduct({
  routerProps,
  children,
}: SectionsPropsType) {
  return (
    <SectionsWrapper
      routerProps={{ ...routerProps, cardId: CARD_ID }}
      cardTitle={CARD_TITLE}
      processValues={processValues}
      processDocument={processDocument}
      linkButton={linkButton}
    >
      {children}
    </SectionsWrapper>
  )
}
