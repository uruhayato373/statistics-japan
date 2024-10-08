import { Suspense } from 'react'

import { Box, Divider } from '@mui/material'

import CircularProgressCards from 'components/CircularProgressCards'
import MainCard from 'components/MainCard'
import CSVExport from 'components/third-party/react-table/CSVExport'

import { ApexOptions } from 'apexcharts'

import formatApexcharts from 'utils/apexcharts'
import formatCSV from 'utils/csv'
import deepMerge from 'utils/deepMerge'
import { DocumentType } from 'utils/document'

import ApexAxisChart from './Chart'
import Header from './Header'

export interface CardsApexAxisChartProps {
  title: string
  document: DocumentType
  options?: ApexOptions
  height?: string
  actionButton?: React.ReactNode
}

const DEFAULT_HEIGHT = '300px'

const Content = ({ options, height }) => (
  <Box sx={{ p: 2, height: height || DEFAULT_HEIGHT, overflow: 'hidden' }}>
    <ApexAxisChart options={options} />
  </Box>
)

export default async function CardsApexAxisChart({
  title,
  document,
  options,
  height,
  actionButton,
}: CardsApexAxisChartProps) {
  const formatOptions = formatApexcharts(document).AxisTimeChart()
  const customOptions = deepMerge(options, formatOptions)

  const filename = `${title}.csv`
  const { headers, data } = formatCSV(document).AxisChart()
  const csvButton = (
    <CSVExport data={data} headers={headers} filename={filename} />
  )

  return (
    <Suspense fallback={<CircularProgressCards />}>
      <MainCard content={false}>
        <Header
          title={title}
          csvButton={csvButton}
          actionButton={actionButton}
        />
        <Divider sx={{ mt: 1.5, mb: 1.5 }} />
        <Content options={customOptions} height={height} />
      </MainCard>
    </Suspense>
  )
}
