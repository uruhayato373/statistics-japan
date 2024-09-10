import { Options } from 'highcharts'

import { DocumentType } from 'utils/document'

const formatHighchartsBarChart = (document: DocumentType): Options => {
  const { categories, values } = document
  return {
    series: categories.map((c) => {
      const categoryValues = values
        .filter((f) => f.categoryCode === c.categoryCode)
        .filter((f) => f.areaCode !== '00000')
        .sort((a, b) => b.value - a.value)

      return {
        name: c.categoryName,
        type: 'bar',
        data: categoryValues.map((d) => {
          return [d.areaName, d.value]
        }),
        unit: c.categoryUnit,
      }
    }),
  }
}

export default formatHighchartsBarChart
