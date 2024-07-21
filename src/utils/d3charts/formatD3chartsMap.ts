import { CategoryType, DocumentType } from 'utils/e-stat'

export type D3ChartMapContentsType = {
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

  // 全国の統計値が紛れ込む場合があるので除外する
  const series = values
    .filter((f) => f.areaCode !== '00000')
    .map((d) => {
      return {
        areaCode: d.areaCode,
        areaName: d.areaName,
        value: d.value,
        unit: d.unit,
      }
    })

  return {
    categories,
    series,
  }
}

export default formatD3chartsMap
