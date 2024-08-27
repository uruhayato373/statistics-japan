'use client'

import React from 'react'

import Highcharts, { Options, SeriesMapOptions } from 'highcharts'
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
  mapNavigation: {
    enabled: true,
    buttonOptions: {
      verticalAlign: 'bottom',
    },
    enableMouseWheelZoom: true,
    enableTouchZoom: true,
    enableDoubleClickZoom: true,
    enableDoubleClickZoomTo: true,
    mouseWheelSensitivity: 1.5,
  },
  colorAxis: {
    min: 0,
    stops: [
      [0, '#FFFFFF'],
      [0.5, '#3366FF'],
      [1, '#D6E4FF'],
    ],
  },
  legend: {
    enabled: false,
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
}

export default function HighchartsMapChart({ options }: Props) {
  const updatedSeries: SeriesMapOptions[] =
    (options.series as SeriesMapOptions[])?.map((series) => ({
      ...series,
      type: 'map',
      states: {
        hover: {
          color: '#BADA55',
        },
      },
      dataLabels: {
        enabled: true,
        format: '{point.name}',
      },
      animation: false,
      borderColor: '#FFFFFF',
      borderWidth: 0.5,
    })) || []

  const customOptions: Options = {
    ...defaultOptions,
    chart: {
      animation: false,
    },
    mapView: {
      zoom: 5.2,
      center: [137.5, 38],
    },
    tooltip: {
      formatter: function (this: Highcharts.TooltipFormatterContextObject) {
        const point = this.point as Highcharts.Point & {
          value: number
          areaName: string
          unit: string
        }
        const formattedValue = Highcharts.numberFormat(point.value, 0, '.', ',')
        return `${point.areaName}: ${formattedValue}${point.unit}`
      },
    },
    series: updatedSeries,
  }

  console.log(customOptions)

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={customOptions}
      constructorType={'mapChart'}
    />
  )
}
