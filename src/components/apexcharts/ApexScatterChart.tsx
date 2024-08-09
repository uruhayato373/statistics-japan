/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
'use client'

import React from 'react'

import ReactApexChart from 'react-apexcharts'

interface Props {
  contents: {
    categories: string[]
    series: {
      name: string
      data: { x: number; y: number }[]
    }[]
  }
}

export default function ApexScatterChart({ contents }: Props): JSX.Element {
  const { series } = contents

  const options = {
    chart: {
      type: 'scatter',
      zoom: {
        enabled: true,
        type: 'xy',
      },
    },
    colors: ['#2E93fA'],
    xaxis: {
      tickAmount: 10,
      labels: {
        formatter: function (val: number) {
          return parseFloat(val.toFixed(1))
        },
      },
    },
    yaxis: {
      tickAmount: 7,
    },
    legend: {
      show: false,
    },
  }

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="scatter"
      height={500}
    />
  )
}
