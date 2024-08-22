import { Suspense } from 'react'

import CircularProgressCards from 'components/CircularProgressCards'

import CardsApexComparisonChart from 'cards/CardsApexComparisonChart'

import handleEstatAPI from 'utils/e-stat'

const TITLE = '総人口'

const ESTAT_PARAMS = {
  statsDataId: '0000010101',
  cdCat01: 'A1101',
}

export default async function ComparisonChartTotalPopulationClient() {
  const title = `都道府県の${TITLE}`

  const document = await handleEstatAPI(ESTAT_PARAMS).fetchDocument()

  return (
    <Suspense fallback={<CircularProgressCards />}>
      <CardsApexComparisonChart title={title} document={document} />
    </Suspense>
  )
}
