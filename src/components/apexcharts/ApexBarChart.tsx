'use client'

import { useMemo } from 'react'

import { ApexOptions } from 'apexcharts'
import ReactApexChart from 'react-apexcharts'

interface Props {
  options: ApexOptions
}

const defaultOptions: ApexOptions = {
  chart: {
    type: 'bar',
    height: 300,
    toolbar: {
      show: true,
      tools: {
        download: true,
        selection: false,
        zoom: false,
        zoomin: false,
        zoomout: false,
        pan: false,
        reset: false,
      },
      export: {
        svg: {
          filename: 'pie-chart-svg',
        },
        png: {
          filename: 'pie-chart-png',
        },
        csv: {
          filename: 'pie-chart-data',
        },
      },
    },
  },
  plotOptions: {
    bar: {
      barHeight: '100%',
      distributed: true,
      horizontal: true,
      dataLabels: {
        position: 'bottom',
      },
    },
  },
  dataLabels: {
    enabled: true,
    textAnchor: 'start',
    style: {
      colors: ['#fff'],
    },
    formatter: function (val, opt) {
      return opt.w.globals.labels[opt.dataPointIndex] + ':  ' + val
    },
    offsetX: 0,
    dropShadow: {
      enabled: true,
    },
  },
  yaxis: {
    labels: {
      show: false,
    },
  },
}

export default function ApexBarChart({ options }: Props) {
  const customOptions = useMemo<ApexOptions>(() => {
    const mergedOptions = { ...defaultOptions, ...options }

    return {
      ...mergedOptions,
      chart: {
        ...mergedOptions.chart,
      },
    }
  }, [options])

  return (
    <ReactApexChart
      options={customOptions}
      series={customOptions.series}
      type="bar"
      height={customOptions.chart?.height}
    />
  )
}
