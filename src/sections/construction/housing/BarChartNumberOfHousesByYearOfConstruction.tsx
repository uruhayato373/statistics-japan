import { Suspense } from 'react'

import CircularProgressCards from 'components/CircularProgressCards'

import CardsApexBarChart from 'cards/CardsApexBarChart'

import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { PrefectureType } from 'utils/prefecture'
import { ValueType } from 'utils/value'

const CARD_TITLE = '建築年次別住宅数'

const ESTAT_PARAMS = {
  statsDataId: '0000010108',
  cdCat01: [
    'H1604',
    'H1605',
    'H1612',
    'H1613',
    'H1619',
    'H1620',
    'H1622',
    'H1624',
  ],
}

interface Props {
  prefecture: PrefectureType
}

// values
async function processValues(prefCode: string) {
  const { fetchValues } = handleEstatAPI()
  const values = await fetchValues({ ...ESTAT_PARAMS, cdArea: prefCode })

  return values
}

// document
async function processDocument(values: ValueType[]): Promise<DocumentType> {
  const { formatDocument } = handleDocument(values)
  const document = formatDocument()

  return document
}

// コンポーネントの描画
export default async function BarChartNumberOfHousesByYearOfConstruction({
  prefecture,
}: Props) {
  const { prefCode, prefName } = prefecture
  const title = `${prefName}の${CARD_TITLE}`

  const values = await processValues(prefCode)
  const document = await processDocument(values)

  return (
    <Suspense fallback={<CircularProgressCards />}>
      <CardsApexBarChart title={title} document={document} />
    </Suspense>
  )
}
