import { Suspense } from 'react'

import { Box, Divider } from '@mui/material'

import CircularProgressCards from 'components/CircularProgressCards'
import MainCard from 'components/MainCard'
import CSVExport from 'components/third-party/react-table/CSVExport'

import { Options } from 'highcharts'

import { CardsPropsType } from 'types/cards'
import formatCSV from 'utils/csv'
import deepMerge from 'utils/deepMerge'
import formatHighcharts from 'utils/highcharts'

import HighchartsAxisChart from './Chart'
import Header from './Header'

const DEFAULT_HEIGHT = '300px'

const Content = ({ options, height }) => (
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
  const formatOptions = formatHighcharts(document).AxisTimeChart()
  const customOptions = deepMerge(options, formatOptions)

  const filename = `${title}.csv`
  const { headers, data } = formatCSV(document).AxisChart()
  const csvButton = (
    <CSVExport data={data} headers={headers} filename={filename} />
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
