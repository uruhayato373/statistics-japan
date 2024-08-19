'use client'

import React from 'react'

import { ApexOptions } from 'apexcharts'
import ReactApexChart from 'react-apexcharts'

interface Props {
  propOptions: ApexOptions
}

const defaultOptions: ApexOptions = {
  chart: {
    height: 350,
    type: 'area',
    zoom: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
  },
  xaxis: {
    labels: {
      show: false, // xaxisのラベルを非表示
    },
    axisBorder: {
      show: false, // x軸の境界線を非表示
    },
    axisTicks: {
      show: false, // x軸の目盛りを非表示
    },
  },
  tooltip: {
    x: {
      format: 'dd/MM/yy HH:mm',
    },
  },
}

export default function ApexAreaChart({ propOptions }: Props): JSX.Element {
  const options: ApexOptions = {
    ...defaultOptions,
    ...propOptions,
  }

  return (
    <ReactApexChart
      options={options}
      series={options.series}
      type="area"
      height={500}
    />
  )
}
