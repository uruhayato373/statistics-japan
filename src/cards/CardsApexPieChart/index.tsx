'use client'
import { Suspense, useMemo } from 'react'

import dynamic from 'next/dynamic'

import { Box, Divider } from '@mui/material'

import CircularProgressCards from 'components/CircularProgressCards'
import MainCard from 'components/MainCard'
import SelectTime from 'components/SelectTime'
import CSVExport from 'components/third-party/react-table/CSVExport'

import { ApexOptions } from 'apexcharts'

import { useTimeFilteredDocument } from 'hooks/useTimeFilteredDocument'
import { CardsPropsType } from 'types/cards'
import formatApexcharts from 'utils/apexcharts'
import formatCSV from 'utils/csv'
import deepMerge from 'utils/deepMerge'

import Control from './Control'
import Header from './Header'

// ApexPieChartをSSRを無効にして動的にインポート
const ApexPieChart = dynamic(() => import('./Chart'), {
  loading: () => <CircularProgressCards />,
  ssr: false,
})

const DEFAULT_HEIGHT = '265px'

interface ContentProps {
  options: ApexOptions
  height: string
}

const Content = ({ options, height }: ContentProps) => (
  <Box sx={{ p: 2, height, overflow: 'hidden' }}>
    <ApexPieChart options={options} />
  </Box>
)

const useCustomOptions = (
  document: CardsPropsType<ApexOptions>['document'],
  selectedTimeCode: string,
  options?: ApexOptions
) => {
  const filteredDocument = useTimeFilteredDocument(document, selectedTimeCode)

  return useMemo(() => {
    const formatOptions = formatApexcharts(filteredDocument).PieChart()
    return options ? deepMerge(options, formatOptions) : formatOptions
  }, [filteredDocument, options])
}

const useCSVData = (document: CardsPropsType<ApexOptions>['document']) => {
  const { headers, data } = formatCSV(document).AxisChart()
  return { headers, data }
}

export default function CardsApexPieChart({
  title,
  document,
  options,
  height = DEFAULT_HEIGHT,
  linkButton,
}: CardsPropsType<ApexOptions>) {
  const { times } = document
  const [selectedTimeCode, SelectTimeComponent] = SelectTime({ times })

  const customOptions = useCustomOptions(document, selectedTimeCode, options)
  const { headers, data } = useCSVData(document)
  const filename = `${title}.csv`

  const csvButton = (
    <CSVExport data={data} headers={headers} filename={filename} />
  )

  return (
    <MainCard content={false}>
      <Header title={title} csvButton={csvButton} linkButton={linkButton} />
      <Divider sx={{ mt: 1.5, mb: 1.5 }} />
      <Control SelectTimeComponent={SelectTimeComponent} />
      <Suspense fallback={<CircularProgressCards />}>
        <Content options={customOptions} height={height} />
      </Suspense>
    </MainCard>
  )
}
