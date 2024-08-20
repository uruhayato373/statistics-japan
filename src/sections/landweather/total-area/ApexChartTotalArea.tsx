import { Suspense } from 'react'

import Box from '@mui/material/Box'

import ApexAreaChart from 'components/apexcharts/ApexAreaChart'
import CircularProgressCards from 'components/CircularProgressCards'
import MainCard from 'components/MainCard'

import { ApexOptions } from 'apexcharts'

import formatApexcharts from 'utils/apexcharts'
import handleEstatAPI from 'utils/e-stat'
import { PrefectureType } from 'utils/prefecture'

const TITLE = '総面積の推移'

const ESTAT_PARAMS = {
  statsDataId: '0000010102',
  cdCat01: ['B1101', 'B1103'],
}

const APEX_SERIES = [
  {
    name: '総面積',
    unit: 'ha',
  },
  {
    name: '可住地面積',
    unit: 'ha',
  },
]

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

export default async function ApexChartTotalArea({ prefecture }: Props) {
  const { prefCode, prefName } = prefecture

  // タイトル
  const title = `${prefName}の${TITLE}`

  // e-Stat APIからデータを取得
  const estatParams = { ...ESTAT_PARAMS, cdArea: prefCode }
  const document = await handleEstatAPI(estatParams).fetchDocument()

  // ApexChartsのデータを整形
  const { series } = formatApexcharts(document).AxisTimeChart()
  const options: ApexOptions = {
    ...APEX_OPTIONS,
    series: series.map((d, i) => ({ ...d, ...APEX_SERIES[i] })),
  }

  return (
    <Suspense fallback={<CircularProgressCards />}>
      <MainCard content={false} title={title}>
        <Box sx={{ pt: 1, pr: 2 }}>
          <ApexAreaChart customOptions={options} />
        </Box>
      </MainCard>
    </Suspense>
  )
}
