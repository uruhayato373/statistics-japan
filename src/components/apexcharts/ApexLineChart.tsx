/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
'use client'

import ReactApexChart from 'react-apexcharts'

import { ApexChartTimeContentsType } from 'utils/apexcharts'

interface Props {
  contents: ApexChartTimeContentsType
}

export default function ApexLineChart({ contents }: Props) {
  const { series, categories } = contents

  // chart options
  const options = {
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
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: categories,
      labels: {
        show: false, // x軸のラベルを非表示にする
      },
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          // 値が数値であることを確認
          if (typeof value === 'number') {
            return value.toLocaleString('ja-JP', { maximumFractionDigits: 0 })
          }
          // 数値でない場合は元の値をそのまま返す
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

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="line"
      height={400}
    />
  )
}
