import { Suspense } from 'react'

import CircularProgressCards from 'components/CircularProgressCards'

import CardsHighchartsMapChart from 'cards/CardsHighchartsMapChart'

import { saveDocument } from 'actions/saveDocument'
import { saveValues } from 'actions/saveValues'
import handleDocument from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import handleGeoshape from 'utils/geoshape'
import { RouterProps } from 'utils/props'

const CARD_TITLE = '小学児童数'
const CARD_ID = 'MapPrimarySchoolStudents'

const ESTAT_PARAMS = {
  statsDataId: '0000010105',
  cdCat01: 'E2501',
}

interface Props {
  routerProps: RouterProps
}

// valuesの取得と整形
async function fetchValues() {
  const values = await handleEstatAPI().fetchValues({
    ...ESTAT_PARAMS,
  })

  return values
}

// コンポーネントの描画
export default async function MapPrimarySchoolStudents({ routerProps }: Props) {
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
