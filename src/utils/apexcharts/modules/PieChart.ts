import { ApexOptions } from 'apexcharts'

import { DocumentType } from 'utils/document'

const formatPieChart = (
  document: DocumentType
): ApexOptions & { units?: string[] } => {
  const { values } = document

  return {
    labels: values.map((d) => d.categoryName),
    series: values.map((d) => d.value),
    units: values.map((d) => d.unit),
  }
}

export default formatPieChart
