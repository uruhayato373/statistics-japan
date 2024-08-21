import { SeriesMapOptions } from 'highcharts'

import { DocumentType } from 'utils/document'

const formatHighchartsMapChart = (document: DocumentType): SeriesMapOptions => {
  const { values, categories } = document
  const data = values
    .filter((f) => f.areaCode !== '00000')
    .map((d) => ({
      areaCode: d.areaCode,
      areaName: d.areaName,
      value: d.value,
      unit: d.unit,
    }))

  return {
    type: 'map',
    name: categories[0].categoryName,
    data,
    joinBy: ['N03_001', 'areaName'],
  }
}

export default formatHighchartsMapChart
