import { Options, SeriesMapOptions } from 'highcharts'

import { DocumentType } from 'utils/document'
import { TopoJSONData } from 'utils/geoshape'

const formatHighchartsMapChart = (
  document: DocumentType,
  topojson: TopoJSONData
): Options => {
  const { values, categories } = document
  const data = values
    .filter((f) => f.areaCode !== '00000')
    .map((d) => ({
      id: d.areaCode,
      name: d.areaName,
      value: d.value,
      unit: d.unit,
    }))

  const series: SeriesMapOptions = {
    type: 'map',
    mapData: topojson,
    name: categories[0].categoryName,
    data,
    joinBy: ['N03_001', 'name'],
  }

  return {
    chart: {
      map: topojson,
      animation: false,
    },
    series: [series],
  }
}

export default formatHighchartsMapChart
