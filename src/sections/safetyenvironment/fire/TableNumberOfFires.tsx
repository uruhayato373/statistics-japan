import { Suspense } from 'react'

import CircularProgressCards from 'components/CircularProgressCards'

import CardsReactTimeTable from 'cards/CardsReactTimeTable'

import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { PrefectureType } from 'utils/prefecture'
import { RouterProps } from 'utils/props'
import { ValueType } from 'utils/value'

const CARD_TITLE = '出火件数'

const ESTAT_PARAMS = {
  statsDataId: '0000010111',
  cdCat01: ['K2101', 'K2102', 'K210311', 'K2105', 'K2106', 'K2107', 'K2108'],
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
export default async function TableNumberOfFires({ prefecture }: Props) {
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
