import { Suspense } from 'react'

import CircularProgressCards from 'components/CircularProgressCards'

import CardsApexPyramidChart from 'cards/CardsApexPyramidChart'

import { saveDocument } from 'app/actions/saveDocument'
import { saveValues } from 'app/actions/saveValues'
import handleDocument from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { PrefectureType } from 'utils/prefecture'
import { RouterProps } from 'utils/props'

const CARD_TITLE = '総人口の推移'
const CARD_ID = 'PyramidChartPopulation'

const ESTAT_PARAMS = {
  statsDataId: '0000010101',
  cdCat01: [
    'A120101',
    'A120102',
    'A120201',
    'A120202',
    'A120301',
    'A120302',
    'A120401',
    'A120402',
    'A120501',
    'A120502',
    'A120601',
    'A120602',
    'A120701',
    'A120702',
    'A120801',
    'A120802',
    'A120901',
    'A120902',
    'A121001',
    'A121002',
    'A121101',
    'A121102',
    'A121201',
    'A121202',
    'A121301',
    'A121302',
    'A121401',
    'A121402',
    'A121501',
    'A121502',
    'A121601',
    'A121602',
  ],
}

interface Props {
  routerProps: RouterProps
  prefecture: PrefectureType
}

// valuesの取得と整形
async function fetchValues(prefCode: string) {
  const values = await handleEstatAPI().fetchValues({
    ...ESTAT_PARAMS,
    cdArea: prefCode,
  })

  return values
}

// コンポーネントの描画
export default async function PyramidChartPopulation({
  routerProps,
  prefecture,
}: Props) {
  const { prefCode, prefName } = prefecture

  const title = `${prefName}の${CARD_TITLE}`

  const saveProps = { ...routerProps, cardId: CARD_ID }

  const values = await fetchValues(prefCode)
  if (process.env.NODE_ENV === 'development') {
    await saveValues(saveProps, values)
  }

  const document = handleDocument().formatDocument(values)
  if (process.env.NODE_ENV === 'development') {
    await saveDocument(saveProps, document)
  }

  return (
    <Suspense fallback={<CircularProgressCards />}>
      <CardsApexPyramidChart title={title} document={document} />
    </Suspense>
  )
}
