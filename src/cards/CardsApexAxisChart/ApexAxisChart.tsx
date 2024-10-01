/* eslint-disable @typescript-eslint/no-explicit-any */
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
    toolbar: {
      show: false,
    },
  },
  stroke: {
    curve: 'straight',
    width: 2.5,
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

// 深いマージを行うヘルパー関数
const deepMerge = (target: any, source: any): any => {
  const output = Object.assign({}, target)
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target)) Object.assign(output, { [key]: source[key] })
        else output[key] = deepMerge(target[key], source[key])
      } else {
        Object.assign(output, { [key]: source[key] })
      }
    })
  }
  return output
}

const isObject = (item: any): boolean => {
  return item && typeof item === 'object' && !Array.isArray(item)
}

export default function ApexAxisChart({ options }: Props) {
  const customOptions = useMemo<ApexOptions>(() => {
    const mergedOptions = deepMerge(defaultOptions, options)

    return {
      ...mergedOptions,
      yaxis: applyFormatterToYAxis(mergedOptions.yaxis),
      tooltip: {
        ...mergedOptions.tooltip,
        y: {
          formatter: function (
            value: number,
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
      chart: {
        ...mergedOptions.chart,
        toolbar: {
          ...mergedOptions.chart?.toolbar,
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
