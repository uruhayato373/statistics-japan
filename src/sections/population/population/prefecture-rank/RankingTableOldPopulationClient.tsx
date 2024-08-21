import { Suspense } from 'react'

import CircularProgressCards from 'components/CircularProgressCards'

import CardsEstatReactRankingTable from 'cards-estat/CardsEstatReactRankingTable'
import handleEstatAPI from 'utils/e-stat'

const TITLE = '老年人口'

const ESTAT_PARAMS = {
  statsDataId: '0000010101',
  cdCat01: 'A1303',
}

export default async function RankingTableOldPopulationClient() {
  const title = `都道府県の${TITLE}`

  const times = await handleEstatAPI(ESTAT_PARAMS).fetchTimes()

  return (
    <Suspense fallback={<CircularProgressCards />}>
      <CardsEstatReactRankingTable
        title={title}
        estatParams={ESTAT_PARAMS}
        times={times}
      />
    </Suspense>
  )
}
