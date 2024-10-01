'use client'

import React from 'react'

import Highcharts, { Options } from 'highcharts'
import HC_exportData from 'highcharts/modules/export-data'
import HC_exporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'

if (typeof Highcharts === 'object') {
  HC_exporting(Highcharts)
  HC_exportData(Highcharts)

  // グローバル言語設定
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
  const customOptions: Options = {
    ...options,
    /*
     * 全Chart共通の設定
     */
    chart: {
      zooming: {
        type: 'xy',
      },
      height: options.chart?.height || 300,
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
      height="100%"
    />
  )
}
