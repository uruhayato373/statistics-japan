import { Suspense } from 'react'

import CircularProgressCards from 'components/CircularProgressCards'

import CardsApexColumnChart from 'cards/CardsApexColumnChart'

import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { PrefectureType } from 'utils/prefecture'
import { ValueType } from 'utils/value'

const CARD_TITLE = '悪性腫瘍による死亡者数'

const ESTAT_PARAMS = {
  statsDataId: '0000010109',
  cdCat01: ['I9102', 'I910201', 'I910202'],
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

  document.categories = document.categories.map((d) => ({
    ...d,
    type: 'column',
  }))

  return document
}

// コンポーネントの描画
export default async function ColumnChartNumberOfDeathsDueToMalignantTumors({
  prefecture,
}: Props) {
  const { prefCode, prefName } = prefecture
  const title = `${prefName}の${CARD_TITLE}`
  const values = await processValues(prefCode)
  const document = await processDocument(values)

  return (
    <Suspense fallback={<CircularProgressCards />}>
      <CardsApexColumnChart title={title} document={document} />
    </Suspense>
  )
}
