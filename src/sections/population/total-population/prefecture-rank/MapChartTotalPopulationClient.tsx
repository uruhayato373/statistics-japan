import { Suspense } from 'react'

import CircularProgressCards from 'components/CircularProgressCards'

import CardsEstatHighchartsMapChart from 'cards-estat/CardsEstatHighchartsMapChart'
import handleEstatAPI from 'utils/e-stat'

const TITLE = '総人口'

const ESTAT_PARAMS = {
  statsDataId: '0000010101',
  cdCat01: 'A1101',
}

interface Props {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function MapChartTotalPopulationClient({
  searchParams,
}: Props) {
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
