'use client'

import React, { useRef, useEffect, useState } from 'react'

import Highcharts, { Options } from 'highcharts'
import HC_exportData from 'highcharts/modules/export-data'
import HC_exporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'

if (typeof Highcharts === 'object') {
  HC_exporting(Highcharts)
  HC_exportData(Highcharts)

  Highcharts.setOptions({
    lang: {
      thousandsSep: ',',
    },
  })
}

interface Props {
  options: Options
}

export default function HighchartsAxisChart({ options }: Props) {
  const chartRef = useRef<HighchartsReact.RefObject>(null)
  const [chartHeight, setChartHeight] = useState(300)

  useEffect(() => {
    const updateChartHeight = () => {
      if (chartRef.current && chartRef.current.container.current) {
        const containerWidth = chartRef.current.container.current.offsetWidth
        const aspectRatio = 16 / 9
        const newHeight = containerWidth / aspectRatio
        setChartHeight(newHeight)
      }
    }

    updateChartHeight()
    window.addEventListener('resize', updateChartHeight)

    return () => {
      window.removeEventListener('resize', updateChartHeight)
    }
  }, [])

  const customOptions: Options = {
    ...options,
    chart: {
      ...options.chart,
      zooming: {
        type: 'xy',
      },
      height: chartHeight,
    },
    title: {
      text: undefined,
    },
    legend: {
      enabled: true,
    },
    credits: {
      enabled: false,
    },
    exporting: {
      enabled: false,
    },
  }

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={customOptions}
      ref={chartRef}
    />
  )
}
