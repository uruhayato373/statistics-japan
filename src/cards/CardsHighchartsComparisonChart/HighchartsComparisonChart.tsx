/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
'use client'

import React from 'react'

import Highcharts, { Options, SeriesOptionsType } from 'highcharts'
import HC_exportData from 'highcharts/modules/export-data'
import HC_exporting from 'highcharts/modules/exporting'
import HC_map from 'highcharts/modules/map'
import HighchartsReact from 'highcharts-react-official'

if (typeof Highcharts === 'object') {
  HC_map(Highcharts)
  HC_exporting(Highcharts)
  HC_exportData(Highcharts)
}

interface Props {
  options: Options
}

export default function HighchartsComparisonChart({ options }: Props) {
  const customOptions: Options = {
    ...options,
    title: {
      text: '',
    },
    chart: {
      ...options.chart,
      height: options.chart?.height || 400,
    },
    xAxis: {
      labels: {
        enabled: false,
      },
      lineWidth: 0, // xAxisの軸線を非表示にする
      tickWidth: 0, // 目盛り線も非表示にする
      ...options.xAxis,
    },
    yAxis: {
      title: {
        text: null,
      },
      labels: {
        formatter: function (
          this: Highcharts.AxisLabelsFormatterContextObject
        ) {
          return Highcharts.numberFormat(this.value as number, 0, '', ',')
        },
      },
      ...options.yAxis,
    },
    credits: {
      enabled: false,
    },
    exporting: {
      enabled: true,
    },
    tooltip: {
      shared: true,
      useHTML: true,
      formatter: function (this: Highcharts.TooltipFormatterContextObject) {
        let s = `<b>${this.x}</b>`

        this.points?.forEach((point) => {
          const series = point.series as SeriesOptionsType & {
            options: { unit?: string }
          }
          const unit = series.options.unit || ''
          const color = point.color || series.color || ''
          s +=
            `<br/><span style="color:${color}">●</span> ${series.name}: ` +
            `<b>${Highcharts.numberFormat(point.y as number, 0, '', ',')}</b> ${unit}`
        })

        return s
      },
    },
    plotOptions: {
      ...options.plotOptions,
      line: {
        ...((options.plotOptions as unknown)?.line || {}),
        marker: {
          enabled: false,
        },
      },
      series: {
        ...((options.plotOptions as unknown)?.series || {}),
        marker: {
          enabled: false,
        },
      },
    },
  }

  return <HighchartsReact highcharts={Highcharts} options={customOptions} />
}
