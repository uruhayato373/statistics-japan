/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
'use client'

import ReactApexChart from 'react-apexcharts'

import { ApexChartPieContentsType } from 'utils/apexcharts'

interface Props {
  contents: ApexChartPieContentsType
}

export default function ApexPieChart({ contents }: Props) {
  const { series, categories } = contents

  // chart options
  const options = {
    chart: {
      type: 'pie',
      width: 450,
      height: 450,
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
    labels: categories,
    // grid: {
    //   row: {
    //     colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
    //     opacity: 0.5,
    //   },
    // },
    legend: {
      show: true,
      fontFamily: `'Roboto', sans-serif`,
      offsetX: 10,
      offsetY: 10,
      labels: {
        useSeriesColors: false,
      },
      labels: {
        colors: 'grey.500',
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
    xaxis: {
      categories: categories,
      labels: {
        show: false, // x軸のラベルを非表示にする
      },
    },
    responsive: [
      {
        breakpoint: 450,
        chart: {
          width: 280,
          height: 280,
        },
        options: {
          legend: {
            show: false,
            position: 'bottom',
          },
        },
      },
    ],
  }

  return (
    <ReactApexChart options={options} series={series} type="pie" height={400} />
  )
}
