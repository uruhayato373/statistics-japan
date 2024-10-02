'use client'

import { useMemo, useRef, useEffect, useState } from 'react'

import { ApexOptions } from 'apexcharts'
import ReactApexChart from 'react-apexcharts'

import deepMerge from 'utils/deepMerge'

interface Props {
  options: ApexOptions & { units?: string[] }
}

const defaultOptions: ApexOptions = {
  chart: {
    type: 'donut',
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: true,
  },
}

export default function ApexPieChart({ options }: Props) {
  const chartRef = useRef<HTMLDivElement>(null)
  const [chartHeight, setChartHeight] = useState(300)
  useEffect(() => {
    const updateHeight = () => {
      if (chartRef.current) {
        const parentHeight = chartRef.current.clientHeight
        const newHeight = Math.max(parentHeight, 200)
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
    const mergedOptions = deepMerge(defaultOptions, options)
    const units = options.units || []

    return {
      ...mergedOptions,
      chart: {
        height: chartHeight,
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
  }, [options, chartHeight])

  return (
    <div ref={chartRef} style={{ width: '100%', height: '100%' }}>
      <ReactApexChart
        options={customOptions}
        series={customOptions.series}
        type="donut"
        height={chartHeight}
      />
    </div>
  )
}
