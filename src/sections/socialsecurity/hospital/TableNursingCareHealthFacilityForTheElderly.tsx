import { Suspense } from 'react'

import CircularProgressCards from 'components/CircularProgressCards'

import CardsReactTimeTable from 'cards/CardsReactTimeTable'

import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { PrefectureType } from 'utils/prefecture'
import { ValueType } from 'utils/value'

const CARD_TITLE = '介護老人保健施設'

const ESTAT_PARAMS = {
  statsDataId: '0000010109',
  cdCat01: ['I5501', 'I5502', 'I5503', 'I5509', 'I5511'],
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
export default async function TableNursingCareHealthFacilityForTheElderly({
  prefecture,
}: Props) {
  const { prefCode, prefName } = prefecture
  const title = `${prefName}の${CARD_TITLE}`

  const values = await processValues(prefCode)
  const document = await processDocument(values)

  return (
    <Suspense fallback={<CircularProgressCards />}>
      <CardsReactTimeTable title={title} document={document} />
    </Suspense>
  )
}
