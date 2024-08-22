/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
'use client'

import React from 'react'

import Highcharts, { Options, SeriesOptionsType } from 'highcharts'
import HC_exportData from 'highcharts/modules/export-data'
import HC_exporting from 'highcharts/modules/exporting'
import HC_map from 'highcharts/modules/map'
import HighchartsReact from 'highcharts-react-official'

import { CategoryType } from 'utils/document'

if (typeof Highcharts === 'object') {
  HC_map(Highcharts)
  HC_exporting(Highcharts)
  HC_exportData(Highcharts)
}

interface Props {
  categories: CategoryType[]
  series: SeriesOptionType[]
}

function calculateCorrelationCoefficient(data: Array<[number, number]>) {
  const n = data.length
  let sumX = 0,
    sumY = 0,
    sumXY = 0,
    sumX2 = 0,
    sumY2 = 0

  for (let i = 0; i < n; i++) {
    const [x, y] = data[i]
    sumX += x
    sumY += y
    sumXY += x * y
    sumX2 += x * x
    sumY2 += y * y
  }

  const numerator = n * sumXY - sumX * sumY
  const denominator = Math.sqrt(
    (n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY)
  )

  return numerator / denominator
}

function getTrendLine(data: Array<[number, number]>): Array<[number, number]> {
  const n = data.length

  let sumX = 0,
    sumY = 0,
    sumXY = 0,
    sumX2 = 0

  // Calculate the sums needed for linear regression
  for (let i = 0; i < n; i++) {
    const [x, y] = data[i]
    sumX += x
    sumY += y
    sumXY += x * y
    sumX2 += x ** 2
  }

  // Calculate the slope of the trend line
  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX ** 2)

  // Calculate the intercept of the trend line
  const intercept = (sumY - slope * sumX) / n

  const trendline: Array<[number, number]> = []

  // Find the minimum and maximum x-values from the scatter plot data
  const minX = Math.min(...data.map(([x]) => x))
  const maxX = Math.max(...data.map(([x]) => x))

  // Calculate the corresponding y-values for the trend line using the slope
  // and intercept
  trendline.push([minX, minX * slope + intercept])
  trendline.push([maxX, maxX * slope + intercept])

  return trendline
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
}

function formatNumber(num: number): string {
  return num.toLocaleString('en-US', { maximumFractionDigits: 2 })
}

export default function HighchartsScatterChart({ categories, series }: Props) {
  const trendLineSeries = series.flatMap((s) => s.data || []) as Array<
    [number, number]
  >
  const correlationCoefficient =
    calculateCorrelationCoefficient(trendLineSeries)

  const updatedSeries: SeriesOptionsType[] = series.map((s) => ({
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
  } as SeriesOptionsType)

  const options: Options = {
    ...defaultOptions,
    chart: {
      events: {
        render: function (this: Highcharts.Chart) {
          if (!this.correlationLabel) {
            this.correlationLabel = this.renderer
              .text(
                `相関係数: ${correlationCoefficient.toFixed(4)}`,
                this.chartWidth - 10,
                this.chartHeight - 10
              )
              .attr({
                align: 'right',
                verticalAlign: 'bottom',
                zIndex: 5,
              })
              .css({
                fontSize: '16px',
                fontWeight: 'bold',
              })
              .add()
          } else {
            this.correlationLabel.attr({
              x: this.chartWidth - 10,
              y: this.chartHeight - 10,
            })
          }
        },
      },
    },
    xAxis: {
      title: {
        text: categories[0].categoryName,
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

  return <HighchartsReact highcharts={Highcharts} options={options} />
}
