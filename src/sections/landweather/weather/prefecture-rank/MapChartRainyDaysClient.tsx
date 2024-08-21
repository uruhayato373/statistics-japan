import { Suspense } from 'react'

import CircularProgressCards from 'components/CircularProgressCards'

import CardsEstatHighchartsMapChart from 'cards-estat/CardsEstatHighchartsMapChart'
import handleEstatAPI from 'utils/e-stat'

const TITLE = '降雨日数'

const ESTAT_PARAMS = {
  statsDataId: '0000010102',
  cdCat01: 'B4106',
}

export default async function MapChartRainyDaysClient() {
  const title = `都道府県の${TITLE}`

  const times = await handleEstatAPI(ESTAT_PARAMS).fetchTimes()

  return (
    <Suspense fallback={<CircularProgressCards />}>
      <CardsEstatHighchartsMapChart
        title={title}
        estatParams={ESTAT_PARAMS}
        times={times}
      />
    </Suspense>
  )
}
