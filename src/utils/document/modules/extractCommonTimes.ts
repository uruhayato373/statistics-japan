import { ValueType } from 'utils/value'

import { TimeType } from '../types/document'

import formatCategories from './formatCategories'

interface CategoryTimeMap {
  timeCodeSet: Set<string>
  timeCodeMap: Map<string, string>
}

function createCategoryTimeMap(categoryValues: ValueType[]): CategoryTimeMap {
  const timeCodeSet = new Set<string>()
  const timeCodeMap = new Map<string, string>()

  categoryValues.forEach((item) => {
    timeCodeSet.add(item.timeCode)
    timeCodeMap.set(item.timeCode, item.timeName)
  })

  return { timeCodeSet, timeCodeMap }
}

function findCommonTimeCodes(categoryTimeMaps: CategoryTimeMap[]): string[] {
  const [firstMap, ...restMaps] = categoryTimeMaps
  return Array.from(firstMap.timeCodeSet).filter((timeCode) =>
    restMaps.every((map) => map.timeCodeSet.has(timeCode))
  )
}

function createCommonTime(
  timeCode: string,
  categoryTimeMaps: CategoryTimeMap[]
): TimeType {
  const timeNames = categoryTimeMaps.map((map) => map.timeCodeMap.get(timeCode))
  const uniqueTimeNames = Array.from(new Set(timeNames))
  const timeName =
    uniqueTimeNames.length === 1
      ? uniqueTimeNames[0]
      : uniqueTimeNames.join(' / ')
  return { timeCode, timeName: timeName as string }
}

function extractCommonTimes(values: ValueType[]): TimeType[] {
  const categories = formatCategories(values)

  const categoryTimeMaps = categories.map((category) => {
    const categoryValues = values.filter(
      (v) => v.categoryCode === category.categoryCode
    )
    return createCategoryTimeMap(categoryValues)
  })

  const commonTimeCodes = findCommonTimeCodes(categoryTimeMaps)

  return commonTimeCodes.map((timeCode) =>
    createCommonTime(timeCode, categoryTimeMaps)
  )
}

export default extractCommonTimes
