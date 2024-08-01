import { DocumentType } from 'utils/e-stat'

export type ApexChartPieContentsType = {
  categories: string[]
  series: number[]
}

const formatApexchartsPie = (document: DocumentType, timeCode: string) => {
  const { values } = document
  const timeValues = values.filter((f) => f.timeCode === timeCode)

  return {
    categories: timeValues.map((d) => d.categoryName),
    series: timeValues.map((d) => d.value),
  }
}

export default formatApexchartsPie
