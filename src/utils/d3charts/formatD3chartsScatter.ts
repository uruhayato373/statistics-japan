import calcCorrelationCoefficient from 'utils/calcCorrelationCoefficient'
import { CategoryType, DocumentType, TimeType } from 'utils/document'

export interface D3ScatterContentsType {
  categories: CategoryType[]
  time: TimeType
  series: {
    x: number
    y: number
  }[]
  correlationCoefficient: number
}

const formatD3chartsScatter = (
  document: DocumentType
): D3ScatterContentsType => {
  const { values, categories, areas } = document

  const latestTime = document.times.sort(
    (a, b) => parseInt(b.timeCode) - parseInt(a.timeCode)
  )[0]

  const series = areas.map((d) => {
    const filteredValues = values
      .filter((f) => f.areaCode === d.areaCode)
      .filter((f) => f.timeCode === latestTime.timeCode)

    return {
      x: filteredValues[0].value,
      y: filteredValues[1].value,
    }
  })

  // 相関係数を計算
  const correlationCoefficient = Number(
    calcCorrelationCoefficient(series.map((d) => [d.x, d.y])).toFixed(4)
  )

  return {
    categories,
    time: latestTime,
    series,
    correlationCoefficient,
  }
}

export default formatD3chartsScatter
