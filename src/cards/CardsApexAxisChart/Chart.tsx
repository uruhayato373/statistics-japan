'use client'

import { useMemo, useRef, useEffect, useState } from 'react'

import { ApexOptions } from 'apexcharts'
import ReactApexChart from 'react-apexcharts'

import formatNumberJapanese from 'utils/value/modules/formatNumberJapanese'

interface Props {
  options: ApexOptions
}

interface CustomDataPoint {
  x: number | string
  y: number
  unit?: string
}

// ApexCharts の型定義を拡張
interface ApexChartContext {
  w: {
    config: {
      series: {
        data: CustomDataPoint[]
      }[]
    }
  }
  seriesIndex: number
  dataPointIndex: number
}

const applyFormatterToYAxis = (
  yaxis: ApexYAxis | ApexYAxis[] | undefined
): ApexYAxis | ApexYAxis[] => {
  const defaultYAxis: ApexYAxis = {
    opposite: false,
    show: true,
    labels: {
      show: true,
      formatter: (value) => formatNumberJapanese(value),
    },
    tooltip: {
      enabled: false,
    },
  }

  if (!yaxis) return defaultYAxis

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
            return formatNumberJapanese(value)
          }
        }
        return formatNumberJapanese(value)
      },
    },
  })

  return Array.isArray(yaxis)
    ? yaxis.map(applyFormatter)
    : applyFormatter(yaxis)
}

const createTooltipFormatter = () => {
  return function (value: number, context: ApexChartContext) {
    const { seriesIndex, dataPointIndex, w } = context
    const data = w.config.series[seriesIndex].data[
      dataPointIndex
    ] as CustomDataPoint
    const unit = data.unit || ''

    if (value == null) {
      return `N/A ${unit}`
    }

    try {
      return `${formatNumberJapanese(value)} ${unit}`
    } catch (error) {
      console.error('Error formatting tooltip value:', error)
      return `${value} ${unit}`
    }
  }
}

const useChartHeight = () => {
  const chartRef = useRef<HTMLDivElement>(null)
  const [chartHeight, setChartHeight] = useState(290)

  useEffect(() => {
    const updateHeight = () => {
      if (chartRef.current) {
        setChartHeight(chartRef.current.clientHeight)
      }
    }

    const resizeObserver = new ResizeObserver(updateHeight)
    const currentRef = chartRef.current

    if (currentRef) {
      resizeObserver.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        resizeObserver.unobserve(currentRef)
      }
      resizeObserver.disconnect()
    }
  }, [])

  return { chartRef, chartHeight }
}

export default function ApexAxisChart({ options }: Props) {
  const { chartRef, chartHeight } = useChartHeight()

  const customOptions = useMemo<ApexOptions>(
    () => ({
      ...options,
      yaxis: applyFormatterToYAxis(options.yaxis),
      tooltip: {
        y: {
          formatter: createTooltipFormatter(),
        },
      },
      chart: {
        ...options.chart,
        height: chartHeight,
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
    }),
    [options, chartHeight]
  )

  return (
    <div ref={chartRef} style={{ width: '100%', height: '100%' }}>
      <ReactApexChart
        options={customOptions}
        series={customOptions.series}
        height={chartHeight}
      />
    </div>
  )
}
