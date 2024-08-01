import { DocumentType } from 'utils/e-stat'

export type ApexChartTimeContentsType = {
  categories: string[]
  series: {
    name: string
    data: number[]
    unit: string
    type?: string
  }[]
}

const formatApexchartsTime = (
  document: DocumentType,
  group: 'category' | 'area' = 'category'
): ApexChartTimeContentsType => {
  if (group === 'category') {
    const { categories, times, values } = document
    return {
      categories: times
        .sort((a, b) => a.timeCode.localeCompare(b.timeCode))
        .map((d) => d.timeName),
      series: categories.map((c) => {
        return {
          name: c.categoryName,
          data: values
            .filter((f) => f.categoryCode === c.categoryCode)
            .sort((a, b) => a.timeCode.localeCompare(b.timeCode))
            .map((d) => d.value),
          unit: values[0].unit,
        }
      }),
    }
  } else {
    const { areas, times, values } = document
    return {
      categories: times
        .sort((a, b) => a.timeCode.localeCompare(b.timeCode))
        .map((d) => d.timeName),
      series: areas.map((d) => {
        return {
          name: d.areaName,
          data: values
            .filter((f) => f.areaCode === d.areaCode)
            .sort((a, b) => a.timeCode.localeCompare(b.timeCode))
            .map((d) => d.value),
          unit: values[0].unit,
        }
      }),
    }
  }
}

export default formatApexchartsTime
