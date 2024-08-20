import { Suspense } from 'react'

import Box from '@mui/material/Box'

import ApexAreaChart from 'components/apexcharts/ApexAreaChart'
import CircularProgressCards from 'components/CircularProgressCards'
import MainCard from 'components/MainCard'

import { ApexOptions } from 'apexcharts'

import formatApexcharts from 'utils/apexcharts'
import { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { PrefectureType } from 'utils/prefecture'
import CardsApexAreaChart from 'cards/CardsApexAreaChart'

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

async function fetchEstatData(prefCode: string) {
  const estatParams = { ...ESTAT_PARAMS, cdArea: prefCode }
  return await handleEstatAPI(estatParams).fetchDocument()
}

function prepareChartOptions(document: DocumentType): ApexOptions {
  const { series } = formatApexcharts(document).AxisTimeChart()
  return {
    ...APEX_OPTIONS,
    series: series.map((d, i) => ({ ...d, ...APEX_SERIES[i] })),
  }
}

export default async function AreaChartTotalArea({ prefecture }: Props) {
  const { prefCode, prefName } = prefecture

  const title = `${prefName}の${TITLE}`

  const document = await fetchEstatData(prefCode)
  const options = prepareChartOptions(document)

  return (
    <Suspense fallback={<CircularProgressCards />}>
      <CardsApexAreaChart title={title} document={document} options={options} />
    </Suspense>
  )
}
