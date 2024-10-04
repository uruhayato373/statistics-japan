import { Suspense } from 'react'

import CircularProgressCards from 'components/CircularProgressCards'

import CardsApexLineChart from 'cards/CardsApexLineChart'

import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { PrefectureType } from 'utils/prefecture'
import { ValueType } from 'utils/value'

const CARD_TITLE = '交通事故死傷者数'

const ESTAT_PARAMS = {
  statsDataId: '0000010111',
  cdCat01: ['K310201', 'K310202', 'K310203'],
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
export default async function LineChartNumberOfTrafficAccidentCasualties({
  prefecture,
}: Props) {
  const { prefCode, prefName } = prefecture
  const title = `${prefName}の${CARD_TITLE}`

  const values = await processValues(prefCode)
  const document = await processDocument(values)

  return (
    <Suspense fallback={<CircularProgressCards />}>
      <CardsApexLineChart title={title} document={document} />
    </Suspense>
  )
}
