import { Suspense } from 'react'

import CircularProgressCards from 'components/CircularProgressCards'

import CardsHighchartsScatterChart from 'cards/CardsHighchartsScatterChart'

import handleDocument from 'utils/document'
import handleEstatAPI from 'utils/e-stat'

const CARD_TITLE = '可住地面積の割合'

const ESTAT_PARAMS_MOLECULE = {
  statsDataId: '0000010102',
  cdCat01: 'B1103',
}

const ESTAT_PARAMS_DENOMINATOR = {
  statsDataId: '0000010102',
  cdCat01: 'B1101',
}

// valuesの取得と整形
async function fetchValues() {
  const values = await handleEstatAPI().fetchValues([
    ESTAT_PARAMS_MOLECULE,
    ESTAT_PARAMS_DENOMINATOR,
  ])

  const formatValues = values
    .filter((f) => f.areaCode !== '00000')
    .filter((f) => f.areaCode !== '01000')
    .map((d) => {
      return {
        ...d,
        categoryName: d.categoryName.replace('（北方地域及び竹島を除く）', ''),
      }
    })

  return formatValues
}

export default async function ScatterChartTotalAreaHabitableArea() {
  const title = `都道府県の${CARD_TITLE}`
  const values = await fetchValues()
  const document = handleDocument().formatDocument(values)

  return (
    <Suspense fallback={<CircularProgressCards />}>
      <CardsHighchartsScatterChart title={title} document={document} />
    </Suspense>
  )
}
