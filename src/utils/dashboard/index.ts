import { DocumentType } from 'utils/document'
import { ValueType } from 'utils/value'
import getMaxDecimalPlaces from 'utils/value/modules/getMaxDecimalPlaces'

import calculateDifference from './modules/calculateDifference'
import calculateRate from './modules/calculateRate'

export interface DashboardValueType extends ValueType {
  difference: number
  rate: number
}

const validateDocument = (document: DocumentType): void => {
  if (document.categories.length !== 1) {
    throw new Error(`予期しないカテゴリ数です: ${document.categories.length}`)
  }
  if (document.areas.length !== 1) {
    throw new Error(`予期しない地域数です: ${document.areas.length}`)
  }
}

const formatDashboardValues = (
  document: DocumentType
): DashboardValueType[] => {
  validateDocument(document)

  const { times, values } = document
  const maxDecimalPlaces = getMaxDecimalPlaces(values.map((v) => v.value))

  const result = times.reduce<DashboardValueType[]>((acc, time) => {
    const value = values.find((v) => v.timeCode === time.timeCode)
    if (!value) return acc

    const previousValue = acc[acc.length - 1]?.value
    const difference = calculateDifference(
      value.value,
      previousValue,
      maxDecimalPlaces
    )
    const rate =
      previousValue !== undefined
        ? calculateRate(value.value, previousValue)
        : 0

    acc.push({
      ...value,
      difference,
      rate,
    })

    return acc
  }, [])

  return result.sort((a, b) => b.timeCode.localeCompare(a.timeCode))
}

export default formatDashboardValues
