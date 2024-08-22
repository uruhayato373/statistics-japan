import { Suspense } from 'react'

import CircularProgressCards from 'components/CircularProgressCards'

import CardsHighchartsScatterChart from 'cards/CardsHighchartsScatterChart'

import handleEstatAPI from 'utils/e-stat'

const TITLE = '総面積'

const ESTAT_PARAMS = [
  {
    statsDataId: '0000010102',
    cdCat01: 'B1101',
  },
  {
    statsDataId: '0000010102',
    cdCat01: 'B1103',
  },
]

export default async function ScatterChartTotalAreaHabitableArea() {
  const title = `都道府県の${TITLE}`

  const document = await handleEstatAPI(ESTAT_PARAMS).fetchDocument()

  const excludedAreaCodes = ['00000', '01000']
  const filterDocument = {
    ...document,
    categories: document.categories.map((d) => {
      return {
        ...d,
        categoryName: d.categoryName.replace('（北方地域及び竹島を除く）', ''),
      }
    }),
    areas: document.areas.filter(
      (a) => !excludedAreaCodes.includes(a.areaCode)
    ),
    values: document.values
      .filter((d) => !excludedAreaCodes.includes(d.areaCode))
      .map((d) => {
        return {
          ...d,
          categoryName: d.categoryName.replace(
            '（北方地域及び竹島を除く）',
            ''
          ),
        }
      }),
  }

  return (
    <Suspense fallback={<CircularProgressCards />}>
      <CardsHighchartsScatterChart title={title} document={filterDocument} />
    </Suspense>
  )
}
