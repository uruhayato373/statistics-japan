import { ApexOptions } from 'apexcharts'

import { DocumentType } from 'utils/e-stat'

const formatPieChart = (
  document: DocumentType,
  timeCode: string
): ApexOptions => {
  const { values } = document
  const timeValues = values.filter((f) => f.timeCode === timeCode)

  return {
    labels: timeValues.map((d) => d.categoryName),
    series: timeValues.map((d) => d.value),
  }
}

export default formatPieChart
