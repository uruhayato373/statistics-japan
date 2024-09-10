'use client'

import React from 'react'

import Box from '@mui/material/Box'

import HighchartsBarChart from 'components/highcharts/HighchartsBarChart'

import { Options } from 'highcharts'

import { DocumentType } from 'utils/document'
import formatHighcharts from 'utils/highcharts'

interface Props {
  document: DocumentType
}

export default function PrefectureRankingBarChart({ document }: Props) {
  const barChartOptions = formatHighcharts(document).barChart()
  const options: Options = {
    ...barChartOptions,
    chart: {
      type: 'bar',
      height: 1000,
      scrollablePlotArea: {
        minHeight: 400,
        scrollPositionY: 1,
      },
    },
    xAxis: {
      type: 'category',
      labels: {
        enabled: true,
        style: {
          fontSize: '11px',
        },
      },
      title: {
        text: null,
      },
    },
    yAxis: {
      labels: {
        enabled: false,
      },
      title: {
        text: null,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 5,
        dataLabels: {
          enabled: true,
        },
        groupPadding: 0.1,
      },
    },
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
      <HighchartsBarChart options={options} />
    </Box>
  )
}
