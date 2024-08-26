import { ApexOptions } from 'apexcharts'

import { DocumentType } from 'utils/document'

const formatPyramidChart = (
  document: DocumentType,
  timeCode: string
): ApexOptions => {
  const { categories, values } = document

  const timeValues = values.filter((f) => f.timeCode === timeCode)

  const formatCategories = categories
    .filter((_, index) => index % 2 === 1)
    .map((d) => d.categoryName.replace('（女）', ''))
    .reverse()

  return {
    series: [
      {
        name: '男性',
        data: formatCategories.map((category) => {
          const value = timeValues.find(
            (f) => f.categoryName === `${category}（男）`
          )
          return value ? value.value * -1 : 0
        }),
      },
      {
        name: '女性',
        data: formatCategories.map((category) => {
          const value = timeValues.find(
            (f) => f.categoryName === `${category}（女）`
          )
          return value ? value.value : 0
        }),
      },
    ],
    xaxis: {
      categories: formatCategories,
    },
  }
}

export default formatPyramidChart
