import { Suspense } from 'react'

import CircularProgressCards from 'components/CircularProgressCards'

import { ApexOptions } from 'apexcharts'

import CardsApexAreaChart from 'cards/CardsApexAreaChart'

import handleEstatAPI from 'utils/e-stat'
import { PrefectureType } from 'utils/prefecture'

const TITLE = '総面積の推移'

const ESTAT_PARAMS = {
  statsDataId: '0000010102',
  cdCat01: ['B1101', 'B1103'],
}

// const APEX_SERIES = [
//   {
//     name: '総面積',
//     unit: 'ha',
//   },
//   {
//     name: '可住地面積',
//     unit: 'ha',
//   },
// ]

const APEX_OPTIONS: ApexOptions = {
  yaxis: [
    {
      seriesName: '総面積',
      opposite: false,
      show: true,
      labels: {
        show: true,
      },
      tooltip: {
        enabled: false,
      },
    },
    {
      seriesName: '可住地面積',
      opposite: true,
      show: true,
      labels: {
        show: true,
      },
      tooltip: {
        enabled: false,
      },
    },
  ],
}

interface Props {
  prefecture: PrefectureType
}

async function fetchEstatData(prefCode: string) {
  const estatParams = { ...ESTAT_PARAMS, cdArea: prefCode }
  return await handleEstatAPI(estatParams).fetchDocument()
}

export default async function AreaChartTotalArea({ prefecture }: Props) {
  const { prefCode, prefName } = prefecture

  const title = `${prefName}の${TITLE}`

  const document = await fetchEstatData(prefCode)

  return (
    <Suspense fallback={<CircularProgressCards />}>
      <CardsApexAreaChart
        title={title}
        document={document}
        options={APEX_OPTIONS}
      />
    </Suspense>
  )
}
