'use client'

import React from 'react'

import Highcharts from 'highcharts'
import HC_exportData from 'highcharts/modules/export-data'
import HC_exporting from 'highcharts/modules/exporting'
import HC_map from 'highcharts/modules/map'
import HighchartsReact from 'highcharts-react-official'

import useGeoshape from 'hooks/useGeoshape'
import { D3ChartMapContentsType } from 'utils/d3charts'

if (typeof Highcharts === 'object') {
  HC_map(Highcharts)
  HC_exporting(Highcharts)
  HC_exportData(Highcharts)
}

interface Props {
  /** チャートのデータ内容 */
  contents: D3ChartMapContentsType
}

export default function HighchartsMapChart({ contents }: Props) {
  const { geoShape } = useGeoshape('prefecture')

  const options = {
    chart: {
      map: geoShape,
    },
    title: {
      text: '',
    },
    mapView: {
      fitToGeometry: {
        type: 'MultiPoint',
        coordinates: [
          [126, 30], // 南西端
          [146, 46], // 北東端
        ],
      },
      animation: {
        duration: 0, // アニメーション時間を0に設定
      },
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
        [0, '#EFEFFF'],
        [0.5, '#4444FF'],
        [1, '#000044'],
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
    series: [
      {
        mapData: geoShape,
        data: contents.series,
        joinBy: ['N03_001', 'areaName'],
        name: 'データ値',
        states: {
          hover: {
            color: '#BADA55',
          },
        },
        dataLabels: {
          enabled: true,
          format: '{point.name}',
        },
      },
    ],
  }

  return (
    <div className="w-full h-[600px]">
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        constructorType={'mapChart'}
      />
    </div>
  )
}
