'use client'

import React from 'react'

import Highcharts, { Options, SeriesMapOptions } from 'highcharts'
import HC_exportData from 'highcharts/modules/export-data'
import HC_exporting from 'highcharts/modules/exporting'
import HC_map from 'highcharts/modules/map'
import HighchartsReact from 'highcharts-react-official'

import useGeoshape from 'hooks/useGeoshape'
import { TopoJSONData } from 'utils/geoshape'

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
  const { geoShape } = useGeoshape('prefecture')

  const updatedSeries: SeriesMapOptions[] = options.series?.map((series) => ({
    ...series,
    mapData: geoShape as TopoJSONData,
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
    borderColor: '#FFFFFF', // 地図の枠線の色を白に設定
    borderWidth: 0.5, // 枠線の幅を設定（必要に応じて調整）
  }))

  const customOptions: Options = {
    ...defaultOptions,
    chart: {
      map: geoShape as TopoJSONData,
      animation: false,
    },
    mapView: {
      zoom: 5,
      center: [137.5, 38],
    },
    tooltip: {
      formatter: function (this: Highcharts.TooltipFormatterContextObject) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const point = this.point as any
        const formattedValue = Highcharts.numberFormat(point.value, 0, '.', ',')
        return `${point.areaName}: ${formattedValue}${point.unit}`
      },
    },
    series: updatedSeries,
  }

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={customOptions}
      constructorType={'mapChart'}
    />
  )
}
