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
            return formatNumberJapanese(value)
          }
        }
        return formatNumberJapanese(value)
      },
    },
  })

  if (Array.isArray(yaxis)) {
    return yaxis.map(applyFormatter)
  } else {
    return applyFormatter(yaxis)
  }
}

export default function ApexAxisChart({ options }: Props) {
  const chartRef = useRef<HTMLDivElement>(null)
  const [chartHeight, setChartHeight] = useState(290)

  useEffect(() => {
    const updateHeight = () => {
      if (chartRef.current) {
        const newHeight = chartRef.current.clientHeight
        setChartHeight(newHeight)
      }
    }

    updateHeight()

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

  const customOptions = useMemo<ApexOptions>(() => {
    return {
      ...options,
      yaxis: applyFormatterToYAxis(options.yaxis),
      tooltip: {
        y: {
          formatter: function (
            value: number,
            { seriesIndex, dataPointIndex, w }
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
    }
  }, [options, chartHeight])

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
