import { ValueType } from 'utils/value'

import { TimeType } from '../types/document'

import formatCategories from './formatCategories'

function extractCommonTimes(values: ValueType[]): TimeType[] {
  const categories = formatCategories(values)

  // 各カテゴリのtimeCodeとtimeNameを抽出
  const categoryTimeMaps = categories.map((category) => {
    const categoryValues = values.filter(
      (v) => v.categoryCode === category.categoryCode
    )
    const timeCodeSet = new Set(categoryValues.map((item) => item.timeCode))
    const timeCodeMap = new Map(
      categoryValues.map((item) => [item.timeCode, item.timeName])
    )
    return { timeCodeSet, timeCodeMap }
  })

  // 全てのカテゴリに共通するtimeCodeを見つける
  const commonTimeCodes = Array.from(categoryTimeMaps[0].timeCodeSet).filter(
    (timeCode) => categoryTimeMaps.every((map) => map.timeCodeSet.has(timeCode))
  )

  // 共通のtimeCodeに対応するTimeTypeオブジェクトを作成
  const commonTimes: TimeType[] = commonTimeCodes.map((timeCode) => {
    const timeNames = categoryTimeMaps.map((map) =>
      map.timeCodeMap.get(timeCode)
    )
    const uniqueTimeNames = Array.from(new Set(timeNames))
    const timeName =
      uniqueTimeNames.length === 1
        ? uniqueTimeNames[0]
        : uniqueTimeNames.join(' / ')
    return { timeCode, timeName: timeName as string }
  })

  return commonTimes
}

export default extractCommonTimes
