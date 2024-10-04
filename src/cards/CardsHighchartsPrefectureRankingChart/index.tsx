'use client'

import { Suspense } from 'react'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'

import CircularProgressCards from 'components/CircularProgressCards'
import MainCard from 'components/MainCard'

import { Options } from 'highcharts'

import { useLoadingState } from 'hooks/useLoadingState'
import { useTimeFilteredDocument } from 'hooks/useTimeFilteredDocument'
import { DocumentType } from 'utils/document'

import SelectTime from '../../components/SelectTime'

import Chart from './Chart'
import Control from './Control'
import Header from './Header'
import SelectChartType from './SelectChartType'

export interface CardsHighchartsPrefectureRankingChartProps {
  title: string
  document: DocumentType
  height?: string
  options?: Options
}

export default function CardsHighchartsPrefectureRankingChart({
  title,
  document,
  height = '450px',
  options,
}: CardsHighchartsPrefectureRankingChartProps) {
  const [chartType, SelectChartTypeComponent] = SelectChartType()

  const { times } = document
  const [selectedTimeCode, SelectTimeComponent] = SelectTime({ times })

  const isLoading = useLoadingState(selectedTimeCode)
  const filteredDocument = useTimeFilteredDocument(document, selectedTimeCode)

  return (
    <Suspense fallback={<CircularProgressCards />}>
      <MainCard sx={{ mt: 1 }} content={false}>
        <Header title={title} />
        <Divider sx={{ mt: 1.5, mb: 1.5 }} />
        <Control
          SelectTimeComponent={SelectTimeComponent}
          SelectChartTypeComponent={SelectChartTypeComponent}
        />
        <Box sx={{ p: 2, height }}>
          {isLoading ? (
            <CircularProgressCards />
          ) : (
            <Chart
              chartType={chartType}
              filteredDocument={filteredDocument}
              options={options}
            />
          )}
        </Box>
      </MainCard>
    </Suspense>
  )
}
