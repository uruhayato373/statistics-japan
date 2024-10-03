'use client'

import { useMemo } from 'react'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import MainCard from 'components/MainCard'

import calcCorrelationCoefficient from 'utils/calcCorrelationCoefficient'
import { DocumentType } from 'utils/document'
import formatHighcharts from 'utils/highcharts'

import HighchartsScatterChart from './HighchartsScatterChart'

interface Props {
  title?: string
  document: DocumentType
  height?: string
}

type ScatterSeriesType = Highcharts.SeriesScatterOptions & {
  data: Array<[number, number]>
}

export default function CardsHighchartsScatterChart({
  title,
  document,
  height,
}: Props) {
  const { times } = document
  const latestTime = times.sort(
    (a, b) => parseInt(b.timeCode) - parseInt(a.timeCode)
  )[0]

  const filteredDocument = useMemo(() => {
    return {
      ...document,
      values: document.values.filter((f) => f.timeCode === latestTime.timeCode),
    }
  }, [document, latestTime])

  const { categories, series } = useMemo(() => {
    return {
      categories: filteredDocument.categories,
      series: formatHighcharts(
        filteredDocument
      ).scatterChart() as ScatterSeriesType[],
    }
  }, [filteredDocument])

  // 相関係数を計算
  const correlationCoefficient = calcCorrelationCoefficient(
    series.flatMap((s) => s.data)
  )

  return (
    <MainCard sx={{ mt: 1 }} content={false}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ p: 2, pb: 0 }}
      >
        <Typography variant="h5" color="text.primary">
          {title}
        </Typography>
      </Stack>
      <Divider sx={{ mt: 1.5, mb: 1.5 }} />
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        sx={{ pr: 2 }}
      >
        <Typography variant="body2" color="text.secondary">
          相関係数: {correlationCoefficient.toFixed(4)}
        </Typography>
      </Stack>
      <Box
        sx={{
          p: 2,
          pt: 0, // 上部のパディングを削除
          ...(height ? { height } : {}),
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ flex: 1, minHeight: 0 }}>
          {' '}
          {/* 高さを確保するためのラッパー */}
          <HighchartsScatterChart categories={categories} series={series} />
        </Box>
      </Box>
    </MainCard>
  )
}
