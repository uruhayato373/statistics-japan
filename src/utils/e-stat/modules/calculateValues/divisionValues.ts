import { ValueType } from 'utils/document'

interface Args {
  moleculeValues: ValueType[] // 分子
  denominatorValues: ValueType[] // 分母
}

export function calculateDivisionValues({
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
        value: m.value / matchValue.value,
        unit: `${m.unit} / ${matchValue.unit}`,
      }
    })
    .filter((f) => f !== null)
}