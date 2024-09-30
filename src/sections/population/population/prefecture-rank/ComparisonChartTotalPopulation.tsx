import { Suspense } from 'react'

import CircularProgressCards from 'components/CircularProgressCards'

import CardsHighchartsComparisonChart from 'cards/CardsHighchartsComparisonChart'

import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { ValueType } from 'utils/value'

const CARD_TITLE = '総人口'

const ESTAT_PARAMS = {
  statsDataId: '0000010101',
  cdCat01: 'A1101',
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
export default async function ComparisonChartTotalPopulation() {
  const title = `都道府県の${CARD_TITLE}`
  const values = await processValues()
  const document = await processDocument(values)

  return (
    <Suspense fallback={<CircularProgressCards />}>
      <CardsHighchartsComparisonChart title={title} document={document} />
    </Suspense>
  )
}
