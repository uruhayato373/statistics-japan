import { DocumentType } from 'utils/e-stat'

export interface DashboardSingleContentsType {
  name: string
  curTimeName: string
  preTimeName: string
  curValue: number
  preValue: number
  rate: number //増減率
  difference: number //増減値
  unit: string
}

interface Args extends DocumentType {
  digit: number //小数点以下の桁数
}

const calculateRate = (current: number, previous: number): number =>
  current === 0 || previous === 0
    ? 0
    : Math.round(((current - previous) / previous) * 1000) / 10

const roundToDigit = (value: number, digit: number): number => {
  const multiplier = Math.pow(10, digit)
  return Math.round(value * multiplier) / multiplier
}

const formatDashboardSingle = ({
  categories,
  values,
  digit = 0,
}: Args): DashboardSingleContentsType => {
  if (categories.length !== 1) {
    throw new Error(
      `予期しないカテゴリー数です: ${categories.length}。1つのカテゴリーが必要です。`
    )
  }

  const sorterValues = values
    .filter((f) => !Number.isNaN(f.value))
    .sort((a, b) => b.timeCode.localeCompare(a.timeCode))

  const [curValue, preValue] = sorterValues

  const difference = roundToDigit(curValue.value - preValue.value, digit)

  return {
    name: categories[0].categoryName,
    curTimeName: curValue.timeName,
    preTimeName: preValue.timeName,
    curValue: curValue.value,
    preValue: preValue.value,
    rate: calculateRate(curValue.value, preValue.value),
    difference,
    unit: curValue.unit,
  }
}

export default formatDashboardSingle
