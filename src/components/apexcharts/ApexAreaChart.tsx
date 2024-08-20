'use client'

import React, { useMemo } from 'react'

import { ApexOptions } from 'apexcharts'
import ReactApexChart from 'react-apexcharts'

interface Props {
  customOptions: ApexOptions
  height?: number
}

interface CustomSeries extends ApexAxisChartSeries {
  unit?: string
}

const defaultOptions: ApexOptions = {
  chart: {
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
    y: {
      formatter: (value, { seriesIndex, w }) => {
        const series = w.config.series[seriesIndex] as CustomSeries
        const unit = series.unit || ''
        return `${formatYAxisLabels(value)} ${unit}`
      },
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

export default function ApexAreaChart({
  customOptions,
  height = 350,
}: Props): JSX.Element {
  const options = useMemo<ApexOptions>(() => {
    const mergedOptions = { ...defaultOptions, ...customOptions }
    return {
      ...mergedOptions,
      yaxis: applyFormatterToYAxis(mergedOptions.yaxis),
      tooltip: {
        ...mergedOptions.tooltip,
        y: {
          ...mergedOptions.tooltip?.y,
          formatter: (value, { seriesIndex, w }) => {
            const series = w.config.series[seriesIndex] as CustomSeries
            const unit = series.unit || ''
            const formattedValue = formatYAxisLabels(value)
            return `${formattedValue} ${unit}`.trim()
          },
        },
      },
    }
  }, [customOptions])

  return (
    <ReactApexChart
      options={options}
      series={options.series}
      type="area"
      height={height}
    />
  )
}
