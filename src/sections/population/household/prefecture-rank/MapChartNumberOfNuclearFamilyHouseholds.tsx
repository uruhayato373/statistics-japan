import { Suspense } from 'react'

import CircularProgressCards from 'components/CircularProgressCards'

import CardsHighchartsMapChart from 'cards/CardsHighchartsMapChart'

import { actionSaveValues } from 'actions/saveValues'
import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import handleGeoshape from 'utils/geoshape'
import { CardProps, RouterProps } from 'utils/props'
import { ValueType } from 'utils/value'

const CARD_TITLE = '核家族世帯数'
const CARD_ID = 'MapChartNumberOfNuclearFamilyHouseholds'

const ESTAT_PARAMS = {
  statsDataId: '0000010101',
  cdCat01: 'A810102',
}

interface Props {
  routerProps: RouterProps
}

// values
async function processValues(cardProps: CardProps) {
  const { fetchValues } = handleEstatAPI()
  const values = await fetchValues(ESTAT_PARAMS)
  await actionSaveValues(cardProps, values)

  return values
}

// document
async function processDocument(values: ValueType[]): Promise<DocumentType> {
  const { formatDocument } = handleDocument()
  const document = formatDocument(values)

  return document
}

// コンポーネントの描画
export default async function MapChartNumberOfNuclearFamilyHouseholds({
  routerProps,
}: Props) {
  const title = `都道府県の${CARD_TITLE}`
  const cardProps = { ...routerProps, cardId: CARD_ID }
  const topojson = await handleGeoshape('prefecture').readJson()
  const values = await processValues(cardProps)
  const document = await processDocument(values)

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
