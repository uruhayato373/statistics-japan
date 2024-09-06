import { ApexOptions } from 'apexcharts'

import { DocumentType } from 'utils/document'

const formatBarChart = (
  document: DocumentType,
  timeCode: string
): ApexOptions & { units?: string[] } => {
  const { values } = document
  const timeValues = values.filter((f) => f.timeCode === timeCode)

  return {
    xaxis: { categories: timeValues.map((d) => d.categoryName) },
    series: [{ data: timeValues.map((d) => d.value) }],
  }
}

export default formatBarChart
