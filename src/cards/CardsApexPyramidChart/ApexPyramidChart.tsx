'use client'
import { useMemo, useRef, useEffect, useState } from 'react'

import { ApexOptions } from 'apexcharts'
import ReactApexChart from 'react-apexcharts'

import deepMerge from 'utils/deepMerge'

interface Props {
  options: ApexOptions
}

const defaultOptions: ApexOptions = {
  chart: {
    type: 'bar',
    stacked: true,
    toolbar: {
      show: false,
    },
  },
  colors: ['#008FFB', '#FF4560'],
  plotOptions: {
    bar: {
      horizontal: true,
      barHeight: '80%',
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: 1,
    colors: ['#fff'],
  },
  grid: {
    xaxis: {
      lines: {
        show: false,
      },
    },
  },
  yaxis: {
    labels: {
      show: false,
    },
    stepSize: 1,
  },
  legend: {
    show: false,
  },
}

const formatNumber = (value: number): string => {
  return Math.abs(value).toLocaleString()
}

export default function ApexPyramidChart({ options }: Props) {
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

    return {
      ...mergedOptions,
      chart: {
        ...mergedOptions.chart,
        height: chartHeight,
      },
      tooltip: {
        ...mergedOptions.tooltip,
        y: {
          formatter: function (value: number) {
            const formattedValue = formatNumber(value)
            return `${formattedValue}人`
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
        type="bar"
        height={chartHeight}
      />
    </div>
  )
}
