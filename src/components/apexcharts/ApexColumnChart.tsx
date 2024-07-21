/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
'use client'

import ReactApexChart from 'react-apexcharts'

import { ApexChartTimeContentsType } from 'utils/apexcharts'

interface Props {
  contents: ApexChartTimeContentsType
}

export default function ApexColumnChart({ contents }: Props) {
  const { series, categories } = contents

  // chart options
  const options = {
    chart: {
      type: 'bar',
      height: 250,
      width: '100%',
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: categories,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (value, { seriesIndex, dataPointIndex, w }) {
          const total = w.globals.stackedSeriesTotals[dataPointIndex]
          const percentage = ((value / total) * 100).toFixed(1)
          const unit = w.config.series[seriesIndex].unit || ''
          return `${value.toLocaleString()} ${unit} (${percentage}%)`
        },
      },
    },
    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'left',
      offsetX: 10,
      markers: {
        width: 8,
        height: 8,
        radius: '50%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      show: false,
    },
    stroke: {
      colors: ['transparent'],
      width: 1,
    },
  }

  return (
    <ReactApexChart options={options} series={series} type="bar" height={250} />
  )
}
