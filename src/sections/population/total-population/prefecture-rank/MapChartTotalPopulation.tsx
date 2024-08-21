import { Suspense } from 'react'

import CircularProgressCards from 'components/CircularProgressCards'

import CardsHighchartsMapChart from 'cards/CardsHighchartsMapChart'

import handleEstatAPI from 'utils/e-stat'

const TITLE = '総人口'

const ESTAT_PARAMS = {
  statsDataId: '0000010101',
  cdCat01: 'A1101',
}

interface Props {
  searchParams: { [key: string]: string | string[] | undefined }
}

async function fetchEstatData(timeCode: string | string[]) {
  const estatParams = { ...ESTAT_PARAMS, cdTime: `${timeCode}100000` }
  return await handleEstatAPI(estatParams).fetchDocument()
}

export default async function MapChartTotalPopulation({ searchParams }: Props) {
  const title = `都道府県の${TITLE}`

  const times = await handleEstatAPI(ESTAT_PARAMS).fetchTimes()

  const selectedTimeCode = searchParams?.timeCode || times[0].timeCode

  const document = await fetchEstatData(selectedTimeCode)

  return (
    <Suspense fallback={<CircularProgressCards />}>
      <CardsHighchartsMapChart
        title={title}
        document={document}
        times={times}
      />
    </Suspense>
  )
}
