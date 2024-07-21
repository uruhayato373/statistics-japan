/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
'use client'

import ReactApexChart from 'react-apexcharts'

interface Props {
  contents: ApexChartPyramidContentsType
}

export default function ApexPyramidChart({ contents }: Props) {
  const { series, categories } = contents

  // chart options
  const options = {
    chart: {
      type: 'bar',
      height: 400,
      stacked: true,
    },
    colors: ['#008FFB', '#FF4560'],
    plotOptions: {
      bar: {
        borderRadius: 5,
        borderRadiusApplication: 'end', // 'around', 'end'
        borderRadiusWhenStacked: 'all', // 'all', 'last'
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
      stepSize: 1,
    },
    tooltip: {
      shared: false,
      x: {
        formatter: function (val) {
          return val
        },
      },
      y: {
        formatter: function (val, { seriesIndex, w }) {
          const absVal = Math.abs(val)
          const formattedVal = absVal.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })
          const unit = w.config.series[seriesIndex].unit || ''
          return `${formattedVal} ${unit} `
        },
      },
    },
    xaxis: {
      categories: categories,
      labels: {
        show: false,
      },
    },
  }

  return (
    <ReactApexChart options={options} series={series} type="bar" height={400} />
  )
}
