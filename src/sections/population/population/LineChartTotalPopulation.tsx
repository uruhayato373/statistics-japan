import { Suspense } from 'react'

import CircularProgressCards from 'components/CircularProgressCards'

import CardsApexLineChart from 'cards/CardsApexLineChart'

import handleEstatAPI from 'utils/e-stat'
import { PrefectureType } from 'utils/prefecture'

const TITLE = '総人口の推移'

const ESTAT_PARAMS = {
  statsDataId: '0000010101',
  cdCat01: 'A1101',
}

interface Props {
  prefecture: PrefectureType
}

async function fetchEstatData(prefCode: string) {
  const estatParams = { ...ESTAT_PARAMS, cdArea: prefCode }
  return await handleEstatAPI(estatParams).fetchDocument()
}

export default async function LineChartTotalPopulation({ prefecture }: Props) {
  const { prefCode, prefName } = prefecture

  const title = `${prefName}の${TITLE}`

  const document = await fetchEstatData(prefCode)

  return (
    <Suspense fallback={<CircularProgressCards />}>
      <CardsApexLineChart title={title} document={document} />
    </Suspense>
  )
}
