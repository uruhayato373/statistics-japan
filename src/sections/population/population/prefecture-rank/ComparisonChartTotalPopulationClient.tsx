import { Suspense } from 'react'

import CircularProgressCards from 'components/CircularProgressCards'

import CardsEstatApexComparisonChart from 'cards-estat/CardsEstatApexComparisonChart'

const CARD_TITLE = '総人口'

const ESTAT_PARAMS = {
  statsDataId: '0000010101',
  cdCat01: 'A1101',
}

export default async function ComparisonChartTotalPopulationClient() {
  const title = `都道府県の${CARD_TITLE}`

  return (
    <Suspense fallback={<CircularProgressCards />}>
      <CardsEstatApexComparisonChart title={title} estatParams={ESTAT_PARAMS} />
    </Suspense>
  )
}
