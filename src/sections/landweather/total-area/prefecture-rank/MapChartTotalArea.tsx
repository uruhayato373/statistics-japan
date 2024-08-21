import { Suspense } from 'react'

import CircularProgressCards from 'components/CircularProgressCards'

import CardsHighchartsMapChart from 'cards/CardsHighchartsMapChart'

import handleEstatAPI from 'utils/e-stat'

const TITLE = '総面積'

const ESTAT_PARAMS = {
  statsDataId: '0000010102',
  cdCat01: 'B1101',
}

export default async function MapChartTotalArea() {
  const title = `都道府県の${TITLE}`

  const document = await handleEstatAPI(ESTAT_PARAMS).fetchDocument()

  return (
    <Suspense fallback={<CircularProgressCards />}>
      <CardsHighchartsMapChart title={title} document={document} />
    </Suspense>
  )
}
