import React from 'react'

import Highcharts, {
  Options,
  SeriesMapDataOptions,
  SeriesMapOptions,
  TooltipFormatterContextObject,
} from 'highcharts'
import HC_exportData from 'highcharts/modules/export-data'
import HC_exporting from 'highcharts/modules/exporting'
import HC_map from 'highcharts/modules/map'
import HighchartsReact from 'highcharts-react-official'

import getMaxDecimalPlaces from 'utils/value/modules/getMaxDecimalPlaces'

if (typeof Highcharts === 'object') {
  HC_map(Highcharts)
  HC_exporting(Highcharts)
  HC_exportData(Highcharts)
}

interface Props {
  options: Options
}

interface ExtendedPoint extends Highcharts.Point {
  value: number
  areaName: string
  unit: string
}

const isSeriesMapDataOptions = (data: unknown): data is SeriesMapDataOptions =>
  typeof data === 'object' && data !== null && 'value' in data

const extractValues = (data: SeriesMapOptions['data']): number[] =>
  data.reduce((acc: number[], d) => {
    if (isSeriesMapDataOptions(d) && typeof d.value === 'number') {
      acc.push(d.value)
    } else if (Array.isArray(d) && typeof d[1] === 'number') {
      acc.push(d[1])
    }
    return acc
  }, [])

const getMinMaxValues = (values: number[]): [number, number] => {
  const validValues = values.filter((value) => !isNaN(value))
  return [Math.min(...validValues), Math.max(...validValues)]
}

const createTooltipFormatter = (digits: number) =>
  function (this: TooltipFormatterContextObject) {
    const point = this.point as ExtendedPoint
    const formattedValue = Highcharts.numberFormat(
      point.value,
      digits,
      '.',
      ','
    )
    return `${point.name}: ${formattedValue}${point.unit}`
  }

const defaultOptions: Options = {
  title: { text: '' },
  mapNavigation: {
    enabled: true,
    buttonOptions: { verticalAlign: 'bottom' },
    enableMouseWheelZoom: true,
    enableTouchZoom: true,
    enableDoubleClickZoom: true,
    enableDoubleClickZoomTo: true,
    mouseWheelSensitivity: 1.5,
  },
  colorAxis: {
    stops: [
      [0, '#E6F2FF'], // かなり薄い青
      [0.25, '#99C5FF'], // 薄い青
      [0.5, '#4D94FF'], // 中間の青
      [0.75, '#0062FF'], // 濃い青
      [1, '#0041A8'], // かなり濃い青
    ],
    minColor: '#E6F2FF',
    maxColor: '#0041A8',
    startOnTick: false,
    endOnTick: false,
  },
  legend: { enabled: false },
  credits: { enabled: false },
  chart: { animation: false },
  mapView: { zoom: 5.2, center: [137.5, 38] },
  exporting: {
    enabled: true,
  },
}

export default function HighchartsMapChart({ options }: Props) {
  const mapSeries = options.series as SeriesMapOptions[]
  const values = mapSeries[0]?.data ? extractValues(mapSeries[0].data) : []
  const digits = getMaxDecimalPlaces(values)
  const [minValue, maxValue] = getMinMaxValues(values)

  const mergedColorAxis = {
    ...defaultOptions.colorAxis,
    ...(options.colorAxis as Highcharts.ColorAxisOptions),
    min: minValue,
    max: maxValue,
  }

  const customOptions: Options = {
    ...defaultOptions,
    ...options,
    colorAxis: mergedColorAxis,
    tooltip: {
      formatter: createTooltipFormatter(digits),
    },
  }

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={customOptions}
      constructorType={'mapChart'}
    />
  )
}
