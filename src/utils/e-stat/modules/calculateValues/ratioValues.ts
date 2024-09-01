import { ValueType } from 'utils/value'

interface Args {
  moleculeValues: ValueType[] // 分子
  denominatorValues: ValueType[] // 分母
}

export function calculateRatioValues({
  moleculeValues,
  denominatorValues,
}: Args): ValueType[] {
  return moleculeValues
    .map((m) => {
      const matchValue = denominatorValues.find(
        (f) => m.timeCode === f.timeCode && m.areaCode === f.areaCode
      )

      if (!matchValue) return null

      return {
        ...m,
        categoryName: `${m.categoryName} / ${matchValue.categoryName}`,
        value: (m.value / matchValue.value) * 100,
        unit: `%`,
      }
    })
    .filter((f) => f !== null)
}
