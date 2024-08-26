import { Suspense } from 'react'

import CircularProgressCards from 'components/CircularProgressCards'

import CardsHighchartsMapChart from 'cards/CardsHighchartsMapChart'

import { saveDocument } from 'app/actions/saveDocument'
import { saveValues } from 'app/actions/saveValues'
import handleDocument from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { RouterProps } from 'utils/props'

const CARD_TITLE = '総面積'
const CARD_ID = 'MapChartTotalArea'

const ESTAT_PARAMS = {
  statsDataId: '0000010102',
  cdCat01: 'B1101',
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
      categoryName: '総面積',
      unit: 'ha',
    }
  })
  return formatValues
}

// コンポーネントの描画
export default async function MapChartTotalArea({ routerProps }: Props) {
  const title = `都道府県の${CARD_TITLE}`

  const saveProps = { ...routerProps, cardId: CARD_ID }

  const values = await fetchValues()
  if (process.env.NODE_ENV === 'development') {
    await saveValues(saveProps, values)
  }

  const document = handleDocument().formatDocument(values)
  if (process.env.NODE_ENV === 'development') {
    await saveDocument(saveProps, document)
  }

  return (
    <Suspense fallback={<CircularProgressCards />}>
      <CardsHighchartsMapChart title={title} document={document} />
    </Suspense>
  )
}
