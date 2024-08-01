'use client'

import { ApexOptions } from 'apexcharts'
import ReactApexChart from 'react-apexcharts'

import { ApexChartTimeContentsType } from 'utils/apexcharts'

interface Props {
  contents: ApexChartTimeContentsType
  customOptions?: ApexOptions
}

const defaultOptions: ApexOptions = {
  chart: {
    height: 350,
    type: 'line',
    zoom: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'straight',
    width: 3,
  },
  grid: {
    row: {
      colors: ['#f3f3f3', 'transparent'],
      opacity: 0.5,
    },
  },
  xaxis: {
    labels: {
      show: false,
    },
  },
  yaxis: {
    labels: {
      formatter: function (value) {
        if (typeof value === 'number') {
          return value.toLocaleString('ja-JP', { maximumFractionDigits: 0 })
        }
        return value
      },
      style: {
        fontSize: '12px',
        fontFamily: 'Helvetica, Arial, sans-serif',
      },
    },
  },
  tooltip: {
    shared: true,
    intersect: false,
    y: {
      formatter: function (value, { seriesIndex, w }) {
        const unit = w.config.series[seriesIndex].unit || ''
        return `${value.toLocaleString('ja-JP', { maximumFractionDigits: 0 })} ${unit}`
      },
    },
  },
}

export default function ApexLineChart({ contents, customOptions }: Props) {
  const { series, categories } = contents

  const formatYAxisLabels = (axis: ApexYAxis): ApexYAxis => ({
    ...axis,
    labels: {
      ...axis.labels,
      formatter: (value) => Math.round(value).toLocaleString('ja-JP'),
    },
  })

  const options: ApexOptions = {
    ...defaultOptions,
    ...customOptions,
    // xaxisカテゴリーを確実に保持
    xaxis: {
      ...defaultOptions.xaxis,
      ...customOptions?.xaxis,
      categories: categories,
    },
    yaxis: Array.isArray(customOptions?.yaxis)
      ? customOptions.yaxis.map(formatYAxisLabels)
      : customOptions?.yaxis
        ? formatYAxisLabels(customOptions.yaxis)
        : defaultOptions.yaxis,
  }

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="line"
      height={400}
    />
  )
}
