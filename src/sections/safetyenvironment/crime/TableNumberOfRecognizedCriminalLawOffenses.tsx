import { Suspense } from 'react'

import CircularProgressCards from 'components/CircularProgressCards'

import CardsReactTimeTable from 'cards/CardsReactTimeTable'

import { actionSaveValues } from 'actions/saveValues'
import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { PrefectureType } from 'utils/prefecture'
import handleProps, { CardProps, RouterProps } from 'utils/props'
import { ValueType } from 'utils/value'

const CARD_TITLE = '刑法犯認知件数'
const CARD_ID = 'TableNumberOfRecognizedCriminalLawOffenses'

const ESTAT_PARAMS = {
  statsDataId: '0000010111',
  cdCat01: ['K4201', 'K420101', 'K420102', 'K420103', 'K420104', 'K420105'],
}

interface Props {
  routerProps: RouterProps
  prefecture: PrefectureType
}

// values
async function processValues(cardProps: CardProps, prefCode: string) {
  const { fetchValues } = handleEstatAPI()
  const values = await fetchValues({ ...ESTAT_PARAMS, cdArea: prefCode })
  await actionSaveValues(cardProps, values)

  return values
}

// document
async function processDocument(
  cardProps: CardProps,
  values: ValueType[]
): Promise<DocumentType> {
  const { formatDocument } = handleDocument()
  const document = formatDocument(values)

  return document
}

// コンポーネントの描画
export default async function TableNumberOfRecognizedCriminalLawOffenses({
  routerProps,
  prefecture,
}: Props) {
  const { prefCode, prefName } = prefecture
  const title = `${prefName}の${CARD_TITLE}`
  const cardProps = handleProps(routerProps).cardProps(CARD_ID)
  const values = await processValues(cardProps, prefCode)
  const document = await processDocument(cardProps, values)

  return (
    <Suspense fallback={<CircularProgressCards />}>
      <CardsReactTimeTable title={title} document={document} />
    </Suspense>
  )
}
