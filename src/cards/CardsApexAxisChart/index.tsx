import { Suspense } from 'react'

import dynamic from 'next/dynamic'

import { Box, Divider } from '@mui/material'

import CircularProgressCards from 'components/CircularProgressCards'
import MainCard from 'components/MainCard'
import CSVExport from 'components/third-party/react-table/CSVExport'

import { ApexOptions } from 'apexcharts'

import { CardsPropsType } from 'types/cards'
import formatApexcharts from 'utils/apexcharts'
import formatCSV from 'utils/csv'
import deepMerge from 'utils/deepMerge'

import Header from './Header'

// ApexAxisChartをSSRを無効にして動的にインポート
const ApexAxisChart = dynamic(() => import('./Chart'), { ssr: false })

const DEFAULT_HEIGHT = '300px'

interface ContentProps {
  options: ApexOptions
  height?: string
}

const Content = ({ options, height }: ContentProps) => (
  <Box sx={{ p: 2, height: height || DEFAULT_HEIGHT, overflow: 'hidden' }}>
    <ApexAxisChart options={options} />
  </Box>
)

export default async function CardsApexAxisChart({
  title,
  document,
  options,
  height,
  linkButton,
}: CardsPropsType<ApexOptions>) {
  // 非同期処理を行う
  const formatOptions = formatApexcharts(document).AxisTimeChart()
  const customOptions = options
    ? deepMerge(options, formatOptions)
    : formatOptions

  const { headers, data } = formatCSV(document).AxisChart()
  const filename = `${title}.csv`

  const csvButton = (
    <CSVExport data={data} headers={headers} filename={filename} />
  )

  return (
    <MainCard content={false}>
      <Header title={title} csvButton={csvButton} linkButton={linkButton} />
      <Divider sx={{ mt: 1.5, mb: 1.5 }} />
      <Suspense fallback={<CircularProgressCards />}>
        <Content options={customOptions} height={height} />
      </Suspense>
    </MainCard>
  )
}
