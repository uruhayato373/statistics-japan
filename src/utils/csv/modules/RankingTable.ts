import { DocumentType } from 'utils/document'

const formatRankingTable = (document: DocumentType) => {
  const { categories, times, values } = document

  const headers = [
    { label: '年度', key: 'timeName' },
    ...categories.map((category) => ({
      label: category.categoryName,
      key: category.categoryCode,
    })),
  ]

  const data = times.map((time) => {
    const filteredValues = values.filter(
      (value) => value.timeCode === time.timeCode
    )

    return {
      timeName: time.timeName,
      ...categories.reduce((acc, category) => {
        const filteredValue = filteredValues.find(
          (value) => value.categoryCode === category.categoryCode
        )

        return {
          ...acc,
          [category.categoryCode]: filteredValue
            ? `${filteredValue.value}${filteredValue.unit}`
            : '',
        }
      }, {}),
    }
  })

  return { headers, data }
}

export default formatRankingTable
