import { ValueType } from 'utils/value'

import { CategoryType } from '../types/document'

function formatCategories(values: ValueType[]): CategoryType[] {
  const uniqueMap = new Map<string, CategoryType>()

  values.forEach((value) => {
    if (!uniqueMap.has(value.categoryCode)) {
      uniqueMap.set(value.categoryCode, {
        categoryCode: value.categoryCode,
        categoryName: value.categoryName,
        categoryUnit: value.unit,
      })
    }
  })

  return Array.from(uniqueMap.values())
}

export default formatCategories
