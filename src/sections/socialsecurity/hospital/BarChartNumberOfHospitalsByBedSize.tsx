import { Suspense } from 'react'

import CircularProgressCards from 'components/CircularProgressCards'

import CardsApexBarChart from 'cards/CardsApexBarChart'

import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { PrefectureType } from 'utils/prefecture'
import { RouterProps } from 'utils/props'
import { ValueType } from 'utils/value'

const CARD_TITLE = '病床規模別病院数'

const ESTAT_PARAMS = {
  statsDataId: '0000010109',
  cdCat01: ['I520101', 'I520102', 'I520103', 'I520104', 'I520105'],
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
  const { formatDocument } = handleDocument()
  const document = formatDocument(values)

  return document
}

// コンポーネントの描画
export default async function BarChartNumberOfHospitalsByBedSize({
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
