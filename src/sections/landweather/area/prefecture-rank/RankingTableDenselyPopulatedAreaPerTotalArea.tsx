import { Suspense } from 'react'

import CircularProgressCards from 'components/CircularProgressCards'

import CardsReactPrefectureRankingTable from 'cards/CardsReactPrefectureRankingTable'

import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { ValueType } from 'utils/value'

const CARD_TITLE = '人口集中地区面積（総面積に占める割合）'

// 分子
const ESTAT_PARAMS_MOLECULE = {
  statsDataId: '0000010101',
  cdCat01: 'A1802',
}

// 分母
const ESTAT_PARAMS_DENOMINATOR = {
  statsDataId: '0000010102',
  cdCat01: 'B1101',
}

// values
async function processValues() {
  const values = await handleEstatAPI().fetchDivisionValues(
    ESTAT_PARAMS_MOLECULE,
    ESTAT_PARAMS_DENOMINATOR
  )

  return formatValues(values)
}

// format values
function formatValues(values: ValueType[]) {
  // 人口集中地区面積はkm2、総面積はhaなので、100倍する
  // 単位をパーミルにするため、さらに10倍する
  return values.map((d) => ({
    ...d,
    categoryName: '割合',
    value: Number((d.value * 1000).toFixed(2)),
    unit: '‰',
  }))
}

// document
async function processDocument(values: ValueType[]): Promise<DocumentType> {
  const { formatDocument } = handleDocument()
  const document = formatDocument(values)

  return document
}

// コンポーネントの描画
export default async function RankingTableDenselyPopulatedAreaPerTotalArea() {
  const title = `都道府県の${CARD_TITLE}`
  const values = await processValues()
  const document = await processDocument(values)

  return (
    <Suspense fallback={<CircularProgressCards />}>
      <CardsReactPrefectureRankingTable title={title} document={document} />
    </Suspense>
  )
}
