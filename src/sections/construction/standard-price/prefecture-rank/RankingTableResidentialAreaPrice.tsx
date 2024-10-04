import { Suspense } from 'react'

import CircularProgressCards from 'components/CircularProgressCards'

import CardsReactPrefectureRankingTable from 'cards/CardsReactPrefectureRankingTable'

import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { ValueType } from 'utils/value'

const CARD_TITLE = '住宅地価格'

const ESTAT_PARAMS = {
  statsDataId: '0000010103',
  cdCat01: 'C5401',
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
export default async function RankingTableResidentialAreaPrice() {
  const title = `都道府県の${CARD_TITLE}`

  const values = await processValues()
  const document = await processDocument(values)

  return (
    <Suspense fallback={<CircularProgressCards />}>
      <CardsReactPrefectureRankingTable title={title} document={document} />
    </Suspense>
  )
}
