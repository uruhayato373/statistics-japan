import { AreaType, DocumentType, ValueType } from 'utils/e-stat'

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
    values: type === 'ratio' ? ratioValues(areas, values) : values,
  }
}

function removeDuplicates(array, key) {
  const uniqueMap = new Map()

  array.forEach((item) => {
    if (!uniqueMap.has(item[key])) {
      uniqueMap.set(item[key], item)
    }
  })

  return Array.from(uniqueMap.values())
}

const ratioValues = (areas: AreaType[], values: ValueType[]) => {
  return areas.map((area) => {
    const areaValues = values.filter(
      (value) => value.areaCode === area.areaCode
    )
    return {
      ...areaValues[0],
      value: (areaValues[0].value / areaValues[1].value) * 100,
      unit:
        areaValues[0].unit === areaValues[1].unit
          ? '%'
          : `${areaValues[0].unit}/${areaValues[1].unit}`,
    }
  })
}

export default margeDocuments
