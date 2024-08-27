'use client'

import React, { useMemo } from 'react'

import { ApexOptions } from 'apexcharts'
import ReactApexChart from 'react-apexcharts'

interface Props {
  options: ApexOptions
}

interface DataPoint {
  x: number | string
  y: number
  unit: string
}

const defaultOptions: ApexOptions = {
  chart: {
    type: 'area',
    zoom: {
      enabled: false,
    },
    height: 300,
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
  },
  xaxis: {
    labels: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
}

const formatYAxisLabels = (value: number): string => {
  if (typeof value === 'number') {
    return value.toLocaleString()
  } else if (typeof value === 'string') {
    const num = parseFloat(value)
    return isNaN(num) ? value : num.toLocaleString()
  } else {
    return '-'
  }
}

const applyFormatterToYAxis = (
  yaxis: ApexYAxis | ApexYAxis[] | undefined
): ApexYAxis | ApexYAxis[] | undefined => {
  if (!yaxis) return undefined

  const applyFormatter = (axis: ApexYAxis): ApexYAxis => ({
    ...axis,
    labels: {
      ...axis.labels,
      formatter: (value) => {
        if (
          axis.labels?.formatter &&
          typeof axis.labels.formatter === 'function'
        ) {
          try {
            return axis.labels.formatter(value)
          } catch (error) {
            console.error('Custom formatter error:', error)
            return formatYAxisLabels(value)
          }
        }
        return formatYAxisLabels(value)
      },
    },
  })

  if (Array.isArray(yaxis)) {
    return yaxis.map(applyFormatter)
  } else {
    return applyFormatter(yaxis)
  }
}

export default function ApexAreaChart({ options }: Props) {
  const customOptions = useMemo<ApexOptions>(() => {
    const mergedOptions = { ...defaultOptions, ...options }
    return {
      ...mergedOptions,
      yaxis: applyFormatterToYAxis(mergedOptions.yaxis),
      tooltip: {
        ...mergedOptions.tooltip,
        y: {
          formatter: function (
            value: number,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            { seriesIndex, dataPointIndex, w }: any
          ) {
            const series = w.config.series[seriesIndex]
            const dataPoint = series.data[dataPointIndex] as DataPoint
            const unit = dataPoint.unit || ''
            return `${formatYAxisLabels(value)} ${unit}`
          },
        },
      },
    }
  }, [options])

  return (
    <ReactApexChart
      options={customOptions}
      series={customOptions.series}
      type="area"
      height={customOptions.chart?.height}
    />
  )
}
