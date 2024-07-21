/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
'use client'

import ReactApexChart from 'react-apexcharts'

import { ApexChartTimeContentsType } from 'utils/apexcharts'

interface Props {
  contents: ApexChartTimeContentsType
}

export default function ApexAreaChart({ contents }: Props) {
  const { series, categories } = contents

  // chart options
  const options = {
    chart: {
      height: 350,
      type: 'area',
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      categories: categories,
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm',
      },
    },
  }

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="area"
      height={500}
    />
  )
}
