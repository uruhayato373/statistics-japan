'use client'

import React from 'react'

import Box from '@mui/material/Box'

import HighchartsMapChart from 'components/highcharts/HighchartsMapChart'

import { Options } from 'highcharts'

import useGeoshape from 'hooks/useGeoshape'
import { DocumentType } from 'utils/document'
import formatHighcharts from 'utils/highcharts'

interface Props {
  document: DocumentType
  options?: Options
}

export default function PrefectureRankingMapChart({
  document,
  options,
}: Props) {
  const { geoShape } = useGeoshape()
  const mapChartOptions = formatHighcharts(document).mapChart(geoShape)
  const formatOptions: Options = {
    ...mapChartOptions,
    ...options,
  }

  return (
    <Box
      sx={{
        height: 400, // コンテナの高さを400pxに設定
        overflow: 'auto', // スクロール可能にする
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0,0,0,.3)',
          borderRadius: '4px',
        },
      }}
    >
      <HighchartsMapChart options={formatOptions} />
    </Box>
  )
}
