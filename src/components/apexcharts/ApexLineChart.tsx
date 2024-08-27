'use client'

import { useMemo } from 'react'

import { ApexOptions } from 'apexcharts'
import ReactApexChart from 'react-apexcharts'

interface Props {
  options: ApexOptions
}

interface CustomDataPoint {
  x: number | string
  y: number
  unit?: string
}

const defaultOptions: ApexOptions = {
  chart: {
    type: 'line',
    zoom: {
      enabled: false,
    },
    height: 300,
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
      colors: ['#f3f3f3', 'transparent'],
      opacity: 0.5,
    },
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

export default function ApexLineChart({ options }: Props) {
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
            const data = w.config.series[seriesIndex].data[
              dataPointIndex
            ] as CustomDataPoint
            const unit = data.unit || ''
            return `${value.toLocaleString()} ${unit}`
          },
        },
      },
    }
  }, [options])

  return (
    <ReactApexChart
      options={customOptions}
      series={customOptions.series}
      type="line"
      height={customOptions.chart?.height}
    />
  )
}
