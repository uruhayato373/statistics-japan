import { Suspense, useMemo } from 'react'

import dynamic from 'next/dynamic'

import { Box, Divider } from '@mui/material'

import CircularProgressCards from 'components/CircularProgressCards'
import MainCard from 'components/MainCard'
import CSVExport from 'components/third-party/react-table/CSVExport'

import { Options } from 'highcharts'

import formatCSV from 'utils/csv'
import deepMerge from 'utils/deepMerge'
import formatHighcharts from 'utils/highcharts'

import Header from './Header'

import { CardsPropsType } from 'types/cards'

// 動的インポートを使用してHighchartsAxisChartを遅延ロード
const HighchartsAxisChart = dynamic(() => import('./Chart'), {
  loading: () => <CircularProgressCards />,
  ssr: false, // サーバーサイドレンダリングを無効化
})

const DEFAULT_HEIGHT = '300px'

interface ContentProps {
  options: Options
  height?: string
}

const Content = ({ options, height }: ContentProps) => (
  <Box sx={{ p: 2, height: height || DEFAULT_HEIGHT, overflow: 'hidden' }}>
    <HighchartsAxisChart options={options} />
  </Box>
)

export default function CardsHighchartsAxisChart({
  title,
  document,
  options,
  height,
  linkButton,
}: CardsPropsType<Options>) {
  const customOptions = useMemo(() => {
    const formatOptions = formatHighcharts(document).AxisTimeChart()
    return deepMerge(options, formatOptions)
  }, [document, options])

  const csvData = useMemo(() => {
    const filename = `${title}.csv`
    const { headers, data } = formatCSV(document).AxisChart()
    return { filename, headers, data }
  }, [document, title])

  const csvButton = useMemo(
    () => (
      <CSVExport
        data={csvData.data}
        headers={csvData.headers}
        filename={csvData.filename}
      />
    ),
    [csvData]
  )

  return (
    <Suspense fallback={<CircularProgressCards />}>
      <MainCard content={false}>
        <Header title={title} csvButton={csvButton} linkButton={linkButton} />
        <Divider sx={{ mt: 1.5, mb: 1.5 }} />
        <Content options={customOptions} height={height} />
      </MainCard>
    </Suspense>
  )
}
