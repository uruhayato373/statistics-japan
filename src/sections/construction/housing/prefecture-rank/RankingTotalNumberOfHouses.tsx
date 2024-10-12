import SectionsWrapper from 'components/sections/SectionsWrapper'

import { SectionsPropsType } from 'types/sections'
import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { ValueType } from 'utils/value'

const CARD_TITLE = '総住宅数'
const CARD_ID = 'ranking-total-number-of-houses'

const ESTAT_PARAMS = {
  statsDataId: '0000010108',
  cdCat01: 'H1100',
}

const PAGE_ID = 'total-number-of-houses'

// values
async function processValues() {
  const { fetchValues } = handleEstatAPI()
  const values = await fetchValues(ESTAT_PARAMS)
  const filterdValues = values.filter((f) => f.areaCode !== '00000')

  return filterdValues
}

// document
async function processDocument(values: ValueType[]): Promise<DocumentType> {
  const { formatRankingDocument } = handleDocument(values)
  const document = formatRankingDocument()

  return document
}

// コンポーネントの描画
export default async function RankingTotalNumberOfHouses({
  routerProps,
  children,
}: SectionsPropsType) {
  return (
    <SectionsWrapper
      routerProps={{ ...routerProps, pageId: PAGE_ID, cardId: CARD_ID }}
      cardTitle={CARD_TITLE}
      processValues={processValues}
      processDocument={processDocument}
    >
      {children}
    </SectionsWrapper>
  )
}
