import { Suspense } from 'react'

import CircularProgressCards from 'components/CircularProgressCards'

import CardsHighchartsMapChart from 'cards/CardsHighchartsMapChart'

import { saveDocument } from 'actions/saveDocument'
import { saveValues } from 'actions/saveValues'
import handleDocument from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import handleGeoshape from 'utils/geoshape'
import { RouterProps } from 'utils/props'

const CARD_TITLE = '可住地面積'
const CARD_ID = 'MapChartHabitableArea'

const ESTAT_PARAMS = {
  statsDataId: '0000010102',
  cdCat01: 'B1103',
}

interface Props {
  routerProps: RouterProps
}

// valuesの取得と整形
async function fetchValues() {
  const values = await handleEstatAPI().fetchValues({
    ...ESTAT_PARAMS,
  })

  const formatValues = values.map((value) => {
    return {
      ...value,
      unit: 'ha',
    }
  })
  return formatValues
}

// コンポーネントの描画
export default async function MapChartHabitableArea({ routerProps }: Props) {
  const title = `都道府県の${CARD_TITLE}`

  const saveProps = { ...routerProps, cardId: CARD_ID }

  const values = await fetchValues()
  if (process.env.NODE_ENV === 'development') {
    await saveValues(saveProps, values)
  }
  const topojson = await handleGeoshape('prefecture').readJson()

  const document = handleDocument().formatDocument(values)
  if (process.env.NODE_ENV === 'development') {
    await saveDocument(saveProps, document)
  }

  return (
    <Suspense fallback={<CircularProgressCards />}>
      <CardsHighchartsMapChart
        title={title}
        document={document}
        topojson={topojson}
      />
    </Suspense>
  )
}
