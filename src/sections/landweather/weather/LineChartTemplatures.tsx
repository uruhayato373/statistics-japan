import { Suspense } from 'react'

import CircularProgressCards from 'components/CircularProgressCards'

import CardsApexLineChart from 'cards/CardsApexLineChart'

import handleEstatAPI from 'utils/e-stat'
import { PrefectureType } from 'utils/prefecture'

const TITLE = '気温の推移'

const ESTAT_PARAMS = {
  statsDataId: '0000010102',
  cdCat01: ['B4101', 'B4102', 'B4103'],
}

interface Props {
  prefecture: PrefectureType
}

async function fetchEstatData(prefCode: string) {
  const estatParams = { ...ESTAT_PARAMS, cdArea: prefCode }
  return await handleEstatAPI(estatParams).fetchDocument()
}

export default async function LineChartTemplatures({ prefecture }: Props) {
  const { prefCode, prefName } = prefecture

  const title = `${prefName}の${TITLE}`

  const document = await fetchEstatData(prefCode)

  return (
    <Suspense fallback={<CircularProgressCards />}>
      <CardsApexLineChart title={title} document={document} />
    </Suspense>
  )
}
