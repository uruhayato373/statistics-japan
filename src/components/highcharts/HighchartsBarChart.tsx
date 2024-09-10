'use client'

import React from 'react'

import Highcharts, { Options } from 'highcharts'
import HC_exportData from 'highcharts/modules/export-data'
import HC_exporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'

if (typeof Highcharts === 'object') {
  HC_exporting(Highcharts)
  HC_exportData(Highcharts)
}

interface Props {
  options: Options
}

export default function HighchartsBarChart({ options }: Props) {
  const customOptions: Options = {
    /*
     * 共通のoptionsを設定
     */
    chart: {
      type: 'bar',
    },
    title: {
      text: undefined, // タイトルを非表示
    },
    legend: {
      enabled: false, // 凡例を非表示
    },
    credits: {
      enabled: false, // クレジットを非表示
    },
    /*
     * custom options
     */
    ...options,
  }

  return <HighchartsReact highcharts={Highcharts} options={customOptions} />
}
