'use client'

import React from 'react'

import Highcharts, { Options } from 'highcharts'
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

const defaultOptions: Options = {
  title: {
    text: '',
  },
  xAxis: {
    crosshair: true,
  },
  credits: {
    enabled: false,
  },
  exporting: {
    enabled: true,
    buttons: {
      contextButton: {
        menuItems: ['downloadPNG', 'downloadSVG'],
      },
    },
  },
  tooltip: {
    shared: true,
  },
}

export default function HighchartsLineChart({ options }: Props) {
  const customOptions: Options = {
    ...defaultOptions,
    ...options,
  }

  return <HighchartsReact highcharts={Highcharts} options={customOptions} />
}
