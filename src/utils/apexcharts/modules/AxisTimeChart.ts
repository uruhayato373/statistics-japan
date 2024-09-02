import { ApexOptions } from 'apexcharts'

import { DocumentType } from 'utils/document'

const formatAxisTimeChart = (
  document: DocumentType,
  group: 'category' | 'area' = 'category'
): ApexOptions => {
  if (group === 'category') {
    const { categories, times, values } = document
    return {
      series: categories.map((c) => {
        return {
          name: c.categoryName,
          data: times.map((time) => {
            const value = values.find(
              (v) =>
                v.timeCode === time.timeCode &&
                v.categoryCode === c.categoryCode
            )
            return {
              x: time.timeName,
              y: value ? value.value : null,
              unit: value ? value.unit : null,
            }
          }),
          type: c.type ? c.type : 'line',
        }
      }),
    }
  } else {
    const { areas, times, values } = document
    return {
      series: areas.map((d) => {
        return {
          name: d.areaName,
          data: times.map((time) => {
            const value = values.find(
              (v) => v.timeCode === time.timeCode && v.areaCode === d.areaCode
            )
            return {
              x: time.timeName,
              y: value ? value.value : null,
              unit: value ? value.unit : null,
            }
          }),
          type: 'line',
        }
      }),
    }
  }
}

export default formatAxisTimeChart
