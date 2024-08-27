import { ApexOptions } from 'apexcharts'

import { DocumentType } from 'utils/document'

const formatPieChart = (
  document: DocumentType,
  timeCode: string
): ApexOptions & { units?: string[] } => {
  const { values } = document
  const timeValues = values.filter((f) => f.timeCode === timeCode)

  return {
    labels: timeValues.map((d) => d.categoryName),
    series: timeValues.map((d) => d.value),
    units: timeValues.map((d) => d.unit),
  }
}

export default formatPieChart
