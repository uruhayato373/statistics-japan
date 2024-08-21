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
  series: SeriesMapOptions
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

export default function HighchartsMapChart({ series }: Props) {
  const { geoShape } = useGeoshape('prefecture')

  const seriesOptions: SeriesMapOptions = {
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
  }

  const options: Options = {
    ...defaultOptions,
    chart: {
      map: geoShape as TopoJSONData,
      animation: false,
    },
    mapView: {
      zoom: 5,
      center: [137.5, 38],
    },
    series: [seriesOptions],
  }

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      constructorType={'mapChart'}
    />
  )
}
