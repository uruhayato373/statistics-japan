import { TimeType, ValueType } from '../types/document'

import formatCategories from './formatCategories'

function extractCommonTimes(values: ValueType[]): TimeType[] {
  const categories = formatCategories(values)

  // 各配列からtimeCodeを抽出してSetを作成
  const timeCodesSet1 = new Set(
    values
      .filter((f) => f.categoryCode === categories[0].categoryCode)
      .map((item) => item.timeCode)
  )
  const timeCodesSet2 = new Set(
    values
      .filter((f) => f.categoryCode === categories[1].categoryCode)
      .map((item) => item.timeCode)
  )

  // timeCodeをキー、timeNameを値とするMapを作成
  const timeCodeMap1 = new Map(
    values
      .filter((f) => f.categoryCode === categories[0].categoryCode)
      .map((item) => [item.timeCode, item.timeName])
  )
  const timeCodeMap2 = new Map(
    values
      .filter((f) => f.categoryCode === categories[1].categoryCode)
      .map((item) => [item.timeCode, item.timeName])
  )

  // 両方のSetに含まれるtimeCodeを抽出し、対応するtimeNameと共に返却
  const commonTimeCodes: TimeType[] = []
  timeCodesSet1.forEach((timeCode) => {
    if (timeCodesSet2.has(timeCode)) {
      const timeName1 = timeCodeMap1.get(timeCode)
      const timeName2 = timeCodeMap2.get(timeCode)
      // timeName1とtimeName2が同じ場合はそれを使用し、異なる場合は両方を含める
      const timeName =
        timeName1 === timeName2 ? timeName1 : `${timeName1} / ${timeName2}`
      commonTimeCodes.push({ timeCode, timeName: timeName as string })
    }
  })

  return commonTimeCodes
}

export default extractCommonTimes
