/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
'use client'

import React, { useRef, useState, useEffect } from 'react'

import Highcharts, { Options, SeriesOptionsType } from 'highcharts'
import HC_exportData from 'highcharts/modules/export-data'
import HC_exporting from 'highcharts/modules/exporting'
import HC_map from 'highcharts/modules/map'
import HighchartsReact from 'highcharts-react-official'

import { CategoryType } from 'utils/document'

import getTrendLine from './getTrendLine'

if (typeof Highcharts === 'object') {
  HC_map(Highcharts)
  HC_exporting(Highcharts)
  HC_exportData(Highcharts)
}

interface Props {
  categories: CategoryType[]
  series: SeriesOptionsType[]
}

const defaultOptions: Options = {
  title: {
    text: undefined,
  },
  legend: {
    enabled: false,
  },
  credits: {
    enabled: false,
  },
  exporting: {
    enabled: false,
  },
}

function formatNumber(num: number): string {
  return num.toLocaleString('en-US', { maximumFractionDigits: 2 })
}

export default function HighchartsScatterChart({ categories, series }: Props) {
  const chartRef = useRef<HighchartsReact.RefObject>(null)
  const [chartWidth, setChartWidth] = useState(0)
  const [chartHeight, setChartHeight] = useState(0)

  useEffect(() => {
    const updateDimensions = () => {
      if (chartRef.current && chartRef.current.container.current) {
        const width = chartRef.current.container.current.offsetWidth
        setChartWidth(width)
        setChartHeight(width * 0.75)
      }
    }

    // 初期サイズを設定
    updateDimensions()

    // リサイズ監視
    const resizeObserver = new ResizeObserver(updateDimensions)
    if (chartRef.current && chartRef.current.container.current) {
      resizeObserver.observe(chartRef.current.container.current)
    }

    return () => {
      if (chartRef.current && chartRef.current.container.current) {
        resizeObserver.unobserve(chartRef.current.container.current)
      }
    }
  }, [])

  const trendLineSeries = series.flatMap((s) => s.data || [])

  const updatedSeries = series.map((s) => ({
    ...s,
    type: 'scatter',
    marker: {
      symbol: 'circle',
      radius: 4,
      fillColor: '#6690FF',
      lineColor: '#6690FF',
      lineWidth: 1,
    },
  }))

  updatedSeries.push({
    type: 'line',
    name: 'Trend Line',
    data: getTrendLine(trendLineSeries),
    marker: {
      enabled: false,
    },
    states: {
      hover: {
        lineWidth: 0,
      },
    },
    enableMouseTracking: false,
    color: '#a9a9a9',
  })

  const options: Options = {
    ...defaultOptions,
    chart: {
      width: chartWidth,
      height: chartHeight,
    },
    xAxis: {
      title: {
        text: categories[0].categoryName,
        style: {
          fontSize: '12px',
        },
      },
      labels: {
        enabled: false,
      },
      tickWidth: 0,
      lineWidth: 0,
    },
    yAxis: {
      title: {
        text: categories[1].categoryName,
        style: {
          fontSize: '12px',
        },
      },
      labels: {
        enabled: false,
      },
      tickWidth: 0,
      gridLineWidth: 0,
    },
    tooltip: {
      useHTML: true,
      formatter: function (this: Highcharts.TooltipFormatterContextObject) {
        return `
          <div style="font-size: 12px; line-height: 1.5;">
            <span style="font-size: 14px; font-weight: bold;">${this.series.name}</span><br>
            <span style="font-size: 11px;">
              ${categories[0].categoryName}: ${formatNumber(this.x)}${categories[0].categoryUnit}<br>
              ${categories[1].categoryName}: ${formatNumber(this.y)}${categories[1].categoryUnit}
            </span>
          </div>
        `
      },
    },
    series: updatedSeries,
  }

  return (
    <HighchartsReact highcharts={Highcharts} options={options} ref={chartRef} />
  )
}
