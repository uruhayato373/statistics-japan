'use client'

import { Suspense } from 'react'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'

import CircularProgressCards from 'components/CircularProgressCards'
import MainCard from 'components/MainCard'
import SelectTime from 'components/SelectTime'
import CSVExport from 'components/third-party/react-table/CSVExport'

import { ApexOptions } from 'apexcharts'

import ApexPyramidChart from 'cards/CardsApexPyramidChart/ApexPyramidChart'

import { useTimeFilteredDocument } from 'hooks/useTimeFilteredDocument'
import { CardsPropsType } from 'types/cards'
import formatApexcharts from 'utils/apexcharts'
import formatCSV from 'utils/csv'

import Control from './Control'
import Header from './Header'

const DEFAULT_HEIGHT = '250px'

interface ContentProps {
  options: ApexOptions
  height: string
}

const Content = ({ options, height }: ContentProps) => (
  <Box sx={{ p: 2, height, overflow: 'hidden' }}>
    <ApexPyramidChart options={options} />
  </Box>
)

const useCSVData = (document: CardsPropsType<ApexOptions>['document']) => {
  const { headers, data } = formatCSV(document).AxisChart()
  return { headers, data }
}

export default function CardsApexPyramidChart({
  title,
  document,
  options,
  height = DEFAULT_HEIGHT,
}: CardsPropsType<ApexOptions>) {
  const { times } = document
  const [selectedTimeCode, SelectTimeComponent] = SelectTime({ times })

  const filteredDocument = useTimeFilteredDocument(document, selectedTimeCode)

  const formatOptions =
    formatApexcharts(filteredDocument).PyramidChart(selectedTimeCode)
  const customOptions = { ...formatOptions, ...options }

  const { headers, data } = useCSVData(document)
  const filename = `${title}.csv`

  const csvButton = (
    <CSVExport data={data} headers={headers} filename={filename} />
  )
  return (
    <MainCard content={false}>
      <Header title={title} csvButton={csvButton} />
      <Divider sx={{ mt: 1.5, mb: 1.5 }} />
      <Control SelectTimeComponent={SelectTimeComponent} />
      <Suspense fallback={<CircularProgressCards />}>
        <Content options={customOptions} height={height} />
      </Suspense>
    </MainCard>
  )
}
