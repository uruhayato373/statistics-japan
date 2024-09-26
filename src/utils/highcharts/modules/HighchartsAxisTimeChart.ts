import {
  Options,
  SeriesLineOptions,
  SeriesColumnOptions,
  SeriesOptionsType,
} from 'highcharts'

import { DocumentType } from 'utils/document'

type CustomSeriesOptions =
  | SeriesLineOptions
  | (SeriesColumnOptions & {
      unit?: string
    })

const formatAxisTimeChart = (
  document: DocumentType,
  group: 'category' | 'area' = 'category'
): Options => {
  if (group === 'category') {
    const { categories, times, values } = document
    return {
      xAxis: {
        categories: times.map((time) => time.timeName),
        labels: {
          enabled: false,
        },
        lineWidth: 0,
        tickWidth: 0,
      },
      series: categories.map((c): CustomSeriesOptions => {
        const categoryValues = values.filter(
          (f) => f.categoryCode === c.categoryCode
        )
        const baseSeriesOptions = {
          name: c.categoryName,
          type: (c.type as 'line' | 'column') || 'line',
          yAxis: c.yAxis || 0,
          data: times.map((time) => {
            const timeValue = categoryValues.find(
              (f) => f.timeCode === time.timeCode
            )
            return timeValue ? timeValue.value : null
          }),
          unit: c.categoryUnit,
        }

        // c.colorがundefinedでない場合のみcolorプロパティを追加
        return c.color !== undefined
          ? { ...baseSeriesOptions, color: c.color }
          : baseSeriesOptions
      }) as SeriesOptionsType[],
    }
  } else {
    const { areas, times, values } = document
    return {
      xAxis: {
        categories: times.map((time) => time.timeName),
      },
      series: areas.map((d): SeriesLineOptions => {
        const areaValues = values.filter((f) => f.areaCode === d.areaCode)
        return {
          name: d.areaName,
          type: 'line',
          data: times.map((time) => {
            const timeValue = areaValues.find(
              (f) => f.timeCode === time.timeCode
            )
            return timeValue ? timeValue.value : null
          }),
        }
      }) as SeriesOptionsType[],
    }
  }
}

export default formatAxisTimeChart
