'use client'

import { Suspense, useMemo } from 'react'

import Divider from '@mui/material/Divider'

import CircularProgressCards from 'components/CircularProgressCards'
import MainCard from 'components/MainCard'

import { CardsHighchartsPropsType } from 'types/cards'
import calcCorrelationCoefficient from 'utils/calcCorrelationCoefficient'
import { DocumentType } from 'utils/document'
import formatHighcharts from 'utils/highcharts'

import Chart, { ScatterSeriesType } from './Chart'
import CorrelationCoefficient from './CorrelationCoefficient'
import Header from './Header'

const useChartData = (document: DocumentType) => {
  return useMemo(() => {
    const categories = document.categories
    const series = formatHighcharts(
      document
    ).scatterChart() as ScatterSeriesType[]
    const correlationCoefficient = calcCorrelationCoefficient(
      series.flatMap((s) => s.data)
    )
    return { categories, series, correlationCoefficient }
  }, [document])
}

export default function CardsHighchartsScatterChart({
  title,
  document,
  height,
}: CardsHighchartsPropsType) {
  const { categories, series, correlationCoefficient } = useChartData(document)

  return (
    <Suspense fallback={<CircularProgressCards />}>
      <MainCard sx={{ mt: 1 }} content={false}>
        <Header title={title} />
        <Divider sx={{ mt: 1.5, mb: 1.5 }} />
        <CorrelationCoefficient value={correlationCoefficient} />
        <Chart categories={categories} series={series} height={height} />
      </MainCard>
    </Suspense>
  )
}
