import { Options, SeriesMapOptions } from 'highcharts'

import { DocumentType } from 'utils/document'

const formatHighchartsMapChart = (document: DocumentType): Options => {
  const { values, categories } = document
  const data = values
    .filter((f) => f.areaCode !== '00000')
    .map((d) => ({
      areaCode: d.areaCode,
      areaName: d.areaName,
      value: d.value,
      unit: d.unit,
    }))

  const series: SeriesMapOptions = {
    type: 'map',
    name: categories[0].categoryName,
    data,
    joinBy: ['N03_001', 'areaName'],
  }

  return {
    series: [series],
  }
}

export default formatHighchartsMapChart
