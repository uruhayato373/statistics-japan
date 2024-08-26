import { Options } from 'highcharts'

import { DocumentType } from 'utils/document'

const formatAxisTimeChart = (
  document: DocumentType,
  group: 'category' | 'area' = 'category'
): Options => {
  if (group === 'category') {
    const { categories, times, values } = document
    return {
      xAxis: {
        categories: times.map((time) => time.timeName),
      },
      series: categories.map((c) => {
        const categoryValues = values.filter(
          (f) => f.categoryCode === c.categoryCode
        )
        return {
          name: c.categoryName,
          type: 'line',
          data: times.map((time) => {
            const timeValue = categoryValues.find(
              (f) => f.timeCode === time.timeCode
            )

            return timeValue ? timeValue.value : null
          }),
          unit: c.categoryUnit,
        }
      }),
    }
  } else {
    const { areas, times, values } = document
    return {
      xAxis: {
        categories: times.map((time) => time.timeName),
      },

      series: areas.map((d) => {
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
          unit: areaValues[0].unit,
        }
      }),
    }
  }
}

export default formatAxisTimeChart
