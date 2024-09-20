'use client'

import { useMemo } from 'react'

import { ApexOptions } from 'apexcharts'
import ReactApexChart from 'react-apexcharts'

interface Props {
  options: ApexOptions & { units?: string[] }
}

const defaultOptions: ApexOptions = {
  chart: {
    type: 'donut',
    zoom: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  legend: {
    show: true,
    position: 'bottom',
    fontFamily: `'Roboto', sans-serif`,
    offsetX: 0,
    offsetY: -5,
    labels: {
      useSeriesColors: false,
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
}

export default function ApexPieChart({ options }: Props) {
  const customOptions = useMemo<ApexOptions>(() => {
    const mergedOptions = { ...defaultOptions, ...options }
    const units = options.units || []

    return {
      ...mergedOptions,
      chart: {
        ...options.chart,
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
      tooltip: {
        y: {
          formatter: function (
            value: number,
            { seriesIndex }: { seriesIndex: number }
          ) {
            return value.toLocaleString() + ' ' + (units[seriesIndex] || '')
          },
        },
      },
    }
  }, [options])

  return (
    <ReactApexChart
      options={customOptions}
      series={customOptions.series}
      type="donut"
      height={customOptions.chart?.height}
    />
  )
}
