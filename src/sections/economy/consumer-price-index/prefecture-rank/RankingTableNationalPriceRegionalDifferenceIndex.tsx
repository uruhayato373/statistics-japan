import { Suspense } from 'react'

import CircularProgressCards from 'components/CircularProgressCards'

import CardsReactPrefectureRankingTable from 'cards/CardsReactPrefectureRankingTable'

import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { ValueType } from 'utils/value'

const CARD_TITLE = '全国物価地域差指数'

const ESTAT_PARAMS = {
  statsDataId: '0000010103',
  cdCat01: 'C5201',
}

// values
async function processValues() {
  const { fetchValues } = handleEstatAPI()
  const values = await fetchValues(ESTAT_PARAMS)

  return values
}

// document
async function processDocument(values: ValueType[]): Promise<DocumentType> {
  const { formatDocument } = handleDocument()
  const document = formatDocument(values)

  return document
}

// コンポーネントの描画
export default async function RankingTableNationalPriceRegionalDifferenceIndex() {
  const title = `都道府県の${CARD_TITLE}`
  const values = await processValues()
  const document = await processDocument(values)

  return (
    <Suspense fallback={<CircularProgressCards />}>
      <CardsReactPrefectureRankingTable title={title} document={document} />
    </Suspense>
  )
}
