import { AreaType, DocumentType, TimeType } from 'utils/e-stat'

import calculateRatioValues from './modules/calculateRatioValues'

const margeDocuments = (documents: DocumentType[], type: string = 'flat') => {
  const categories = documents.flatMap((d) => d.categories)
  const areas = removeDuplicates(
    documents.flatMap((d) => d.areas),
    'areaCode'
  )
  const values = documents.flatMap((d) => d.values)
  const times = removeDuplicates(
    documents.flatMap((d) => d.times),
    'timeCode'
  )
  return {
    categories,
    areas,
    times,
    values: type === 'ratio' ? calculateRatioValues(values) : values,
  }
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
