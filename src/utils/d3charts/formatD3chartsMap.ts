import { CategoryType, DocumentType } from 'utils/document'

export interface D3ChartMapContentsType {
  categories: CategoryType[]
  series: {
    areaCode: string
    areaName: string
    value: number
    unit: string
  }[]
}

const formatD3chartsMap = (document: DocumentType): D3ChartMapContentsType => {
  const { values, categories } = document

  const series = values
    .filter((f) => f.areaCode !== '00000')
    .map((d) => ({
      areaCode: d.areaCode,
      areaName: d.areaName,
      value: d.value,
      unit: d.unit,
    }))

  return {
    categories,
    series,
  }
}

export default formatD3chartsMap
