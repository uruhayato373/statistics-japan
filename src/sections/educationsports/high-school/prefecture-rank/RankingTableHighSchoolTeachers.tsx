import { Suspense } from 'react'

import CircularProgressCards from 'components/CircularProgressCards'

import CardsReactPrefectureRankingTable from 'cards/CardsReactPrefectureRankingTable'

import { actionSaveValues } from 'actions/saveValues'
import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { CardProps, RouterProps } from 'utils/props'
import { ValueType } from 'utils/value'

const CARD_TITLE = '高等学校教員数'
const CARD_ID = 'RankingTableHighSchoolTeachers'

const ESTAT_PARAMS = {
  statsDataId: '0000010105',
  cdCat01: 'E4401',
}

interface Props {
  routerProps: RouterProps
}

// values
async function processValues(cardProps: CardProps) {
  const { fetchValues } = handleEstatAPI()
  const values = await fetchValues(ESTAT_PARAMS)
  await actionSaveValues(cardProps, values)

  return values
}

// document
async function processDocument(values: ValueType[]): Promise<DocumentType> {
  const { formatDocument } = handleDocument()
  const document = formatDocument(values)

  return document
}

// コンポーネントの描画
export default async function RankingTableHighSchoolTeachers({
  routerProps,
}: Props) {
  const title = `都道府県の${CARD_TITLE}`
  const cardProps = { ...routerProps, cardId: CARD_ID }
  const values = await processValues(cardProps)
  const document = await processDocument(values)

  return (
    <Suspense fallback={<CircularProgressCards />}>
      <CardsReactPrefectureRankingTable title={title} document={document} />
    </Suspense>
  )
}