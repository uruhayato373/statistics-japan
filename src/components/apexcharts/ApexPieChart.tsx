'use client'

import { useMemo } from 'react'

import { ApexOptions } from 'apexcharts'
import ReactApexChart from 'react-apexcharts'

interface Props {
  options: ApexOptions
  units: string[] // ApexOptionsはunitを保持しないため、追加
  height?: number
}

const defaultOptions: ApexOptions = {
  chart: {
    type: 'donut',
    zoom: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  legend: {
    show: true,
    position: 'bottom',
    fontFamily: `'Roboto', sans-serif`,
    offsetX: 0,
    offsetY: 8,
    labels: {
      useSeriesColors: false,
    },
    markers: {
      width: 12,
      height: 12,
      radius: 5,
    },
    itemMargin: {
      horizontal: 25,
      vertical: 4,
    },
  },
}

export default function ApexPieChart({ options, units, height = 300 }: Props) {
  const customOptions = useMemo<ApexOptions>(() => {
    const mergedOptions = { ...defaultOptions, ...options }
    return {
      ...mergedOptions,
      chart: {
        ...mergedOptions.chart,
        height: height, // height プロプを使用
      },
      tooltip: {
        y: {
          formatter: function (
            value: number,
            { seriesIndex }: { seriesIndex: number }
          ) {
            return value.toLocaleString() + ' ' + (units[seriesIndex] || '')
          },
        },
      },
    }
  }, [options, units, height])

  return (
    <ReactApexChart
      options={customOptions}
      series={customOptions.series}
      type="donut"
      height={height}
    />
  )
}
