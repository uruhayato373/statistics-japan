import { AreaType, DocumentType, TimeType, ValueType } from 'utils/e-stat'

import calculateRatioValues from './modules/calculateRatioValues'

export type * from './types/document'

const margeDocuments = (documents: DocumentType[], type: string = 'flat') => {
  const categories = documents.flatMap((d) => d.categories)
  const areas = removeDuplicates(
    documents.flatMap((d) => d.areas),
    'areaCode'
  )
  const values = documents.flatMap((d) => d.values)
  const times = extractCommonTimeCodes(documents[0].values, documents[1].values)

  return {
    categories,
    areas,
    times,
    values: type === 'ratio' ? calculateRatioValues(values) : values,
  }
}

function extractCommonTimeCodes(
  values1: ValueType[],
  values2: ValueType[]
): TimeType[] {
  // 各配列からtimeCodeを抽出してSetを作成
  const timeCodesSet1 = new Set(values1.map((item) => item.timeCode))
  const timeCodesSet2 = new Set(values2.map((item) => item.timeCode))

  // timeCodeをキー、timeNameを値とするMapを作成
  const timeCodeMap1 = new Map(
    values1.map((item) => [item.timeCode, item.timeName])
  )
  const timeCodeMap2 = new Map(
    values2.map((item) => [item.timeCode, item.timeName])
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

function removeDuplicates(array: TimeType[] | AreaType[], key: string) {
  const uniqueMap = new Map()

  array.forEach((item) => {
    if (!uniqueMap.has(item[key])) {
      uniqueMap.set(item[key], item)
    }
  })

  return Array.from(uniqueMap.values())
}

export default margeDocuments
