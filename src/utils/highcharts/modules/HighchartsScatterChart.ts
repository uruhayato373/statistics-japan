import { SeriesOptionsType } from 'highcharts'

import { DocumentType } from 'utils/document'

const formatHighchartsScatterChart = (
  document: DocumentType
): SeriesOptionsType[] => {
  const { values, areas } = document

  return areas.map((area) => {
    const areaValues = values.filter((v) => v.areaCode === area.areaCode)
    return {
      type: 'scatter',
      name: area.areaName,
      data: [areaValues.map((d) => d.value)],
    }
  })
}

export default formatHighchartsScatterChart
