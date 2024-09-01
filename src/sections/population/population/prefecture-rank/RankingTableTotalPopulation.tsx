import { Suspense } from 'react'

import CircularProgressCards from 'components/CircularProgressCards'

import CardsReactRankingTable from 'cards/CardsReactRankingTable'

import { saveDocument } from 'actions/saveDocument'
import { saveValues } from 'actions/saveValues'
import handleDocument from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { RouterProps } from 'utils/props'

const CARD_TITLE = '総人口'
const CARD_ID = 'RankingTableTotalPopulation'

const ESTAT_PARAMS = {
  statsDataId: '0000010101',
  cdCat01: 'A1101',
}

interface Props {
  routerProps: RouterProps
}

// valuesの取得と整形
async function fetchValues() {
  const values = await handleEstatAPI().fetchValues({
    ...ESTAT_PARAMS,
  })

  const formatValues = values.map((value) => {
    return {
      ...value,
      unit: 'ha',
    }
  })
  return formatValues
}

// コンポーネントの描画

export default async function RankingTableTotalPopulation({
  routerProps,
}: Props) {
  const title = `都道府県の${CARD_TITLE}`

  const saveProps = { ...routerProps, cardId: CARD_ID }

  const values = await fetchValues()
  if (process.env.NODE_ENV === 'development') {
    await saveValues(saveProps, values)
  }

  const document = handleDocument().formatDocument(values)
  if (process.env.NODE_ENV === 'development') {
    await saveDocument(saveProps, document)
  }

  return (
    <Suspense fallback={<CircularProgressCards />}>
      <CardsReactRankingTable title={title} document={document} />
    </Suspense>
  )
}
