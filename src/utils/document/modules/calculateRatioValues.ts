import { ValueType } from 'utils/value'

import extractAreas from './formatAreas'

const calculateRatioValues = (values: ValueType[], digit: number = 0) => {
  const valueMap = new Map<string, ValueType[]>()
  values.forEach((value) => {
    if (!valueMap.has(value.areaCode)) {
      valueMap.set(value.areaCode, [])
    }
    valueMap.get(value.areaCode)!.push(value)
  })
  const areas = extractAreas(values)

  return areas.map((area) => {
    const areaValues = valueMap.get(area.areaCode) || []
    if (areaValues.length !== 2) {
      throw new Error(`Invalid data for area ${area.areaCode}`)
    }

    const [value1, value2] = areaValues
    const ratio = (value1.value / value2.value) * 100

    return {
      ...value1,
      value: roundValue(ratio, digit),
      unit: value1.unit === value2.unit ? '%' : `${value1.unit}/${value2.unit}`,
    }
  })
}

function roundValue(num: number, digits: number): number {
  if (digits === 0) {
    return Math.round(num)
  }
  const multiplier = Math.pow(10, digits)
  return Math.round(num * multiplier) / multiplier
}

export default calculateRatioValues
