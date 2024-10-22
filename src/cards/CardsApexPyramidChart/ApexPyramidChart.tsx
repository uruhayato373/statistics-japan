'use client'
import { useMemo } from 'react'

import { ApexOptions } from 'apexcharts'
import ReactApexChart from 'react-apexcharts'

interface Props {
  options: ApexOptions
  height?: number
}

const defaultOptions: ApexOptions = {
  chart: {
    type: 'bar',
    stacked: true,
  },
  colors: ['#008FFB', '#FF4560'],
  plotOptions: {
    bar: {
      borderRadius: 5,
      borderRadiusApplication: 'end',
      borderRadiusWhenStacked: 'all',
      horizontal: true,
      barHeight: '80%',
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: 1,
    colors: ['#fff'],
  },
  grid: {
    xaxis: {
      lines: {
        show: false,
      },
    },
  },
  yaxis: {
    labels: {
      show: false,
    },
    stepSize: 1,
  },
  legend: {
    show: false, // 凡例を非表示に設定
  },
}

const formatNumber = (value: number): string => {
  return Math.abs(value).toLocaleString()
}

export default function ApexPyramidChart({ options, height = 300 }: Props) {
  const customOptions = useMemo<ApexOptions>(() => {
    const mergedOptions = { ...defaultOptions, ...options }
    return {
      ...mergedOptions,
      chart: {
        ...mergedOptions.chart,
        height: height,
      },
      xaxis: {
        ...mergedOptions.xaxis,
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        ...mergedOptions.yaxis,
        labels: {
          show: false,
        },
      },
      legend: {
        show: false, // マージ後のオプションでも確実に非表示に設定
      },
      tooltip: {
        ...mergedOptions.tooltip,
        y: {
          formatter: function (value: number) {
            const formattedValue = formatNumber(value)
            return `${formattedValue}人`
          },
        },
      },
    }
  }, [options, height])

  return (
    <ReactApexChart
      options={customOptions}
      series={customOptions.series}
      type="bar"
      height={height}
    />
  )
}
