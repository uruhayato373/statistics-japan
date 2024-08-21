import { Suspense } from 'react'

import CircularProgressCards from 'components/CircularProgressCards'

import CardsEstatApexPyramid from 'cards-estat/CardsEstatApexPyramid'
import handleEstatAPI from 'utils/e-stat'
import { PrefectureType } from 'utils/prefecture'

const TITLE = '総人口の推移'

const ESTAT_PARAMS = {
  statsDataId: '0000010101',
  cdCat01: [
    'A120101',
    'A120102',
    'A120201',
    'A120202',
    'A120301',
    'A120302',
    'A120401',
    'A120402',
    'A120501',
    'A120502',
    'A120601',
    'A120602',
    'A120701',
    'A120702',
    'A120801',
    'A120802',
    'A120901',
    'A120902',
    'A121001',
    'A121002',
    'A121101',
    'A121102',
    'A121201',
    'A121202',
    'A121301',
    'A121302',
    'A121401',
    'A121402',
    'A121501',
    'A121502',
    'A121601',
    'A121602',
  ],
}

interface Props {
  prefecture: PrefectureType
}

export default async function PyramidChartPopulation({ prefecture }: Props) {
  const { prefCode, prefName } = prefecture

  const title = `${prefName}の${TITLE}`

  const params = { ...ESTAT_PARAMS, cdArea: prefCode }

  const times = await handleEstatAPI(params).fetchTimes()

  return (
    <Suspense fallback={<CircularProgressCards />}>
      <CardsEstatApexPyramid title={title} times={times} estatParams={params} />{' '}
    </Suspense>
  )
}
