import { Suspense } from 'react'

import CircularProgressCards from 'components/CircularProgressCards'

import CardsReactRankingTable from 'cards/CardsReactRankingTable'

import { saveDocument } from 'app/actions/saveDocument'
import { saveValues } from 'app/actions/saveValues'
import handleDocument from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { RouterProps } from 'utils/props'

const CARD_TITLE = '可住地面積'
const CARD_ID = 'RankingTableHabitableArea'

const ESTAT_PARAMS = {
  statsDataId: '0000010102',
  cdCat01: 'B1103',
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
export default async function RankingTableHabitableArea({
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