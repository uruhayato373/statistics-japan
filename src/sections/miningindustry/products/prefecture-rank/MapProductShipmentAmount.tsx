import { Suspense } from 'react'

import CircularProgressCards from 'components/CircularProgressCards'

import CardsHighchartsMapChart from 'cards/CardsHighchartsMapChart'

import { saveDocument } from 'actions/saveDocument'
import { saveValues } from 'actions/saveValues'
import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import handleGeoshape from 'utils/geoshape'
import { RouterProps } from 'utils/props'

const CARD_TITLE = '製造品出荷額'
const CARD_ID = 'MapProductShipmentAmount'

const ESTAT_PARAMS = {
  statsDataId: '0000010103',
  cdCat01: 'C3401',
}

interface Props {
  routerProps: RouterProps
}

// values
async function processValues(saveProps: SaveProps) {
  if (process.env.NODE_ENV === 'development') {
    const { fetchValues } = handleEstatAPI()
    const values = await fetchValues(ESTAT_PARAMS)
    await saveValues(saveProps, values)
  }

  const { readValues } = handleValue(saveProps)
  const values = readValues()

  return values
}

// document
async function processDocument(
  saveProps: SaveProps,
  values: ValueType[]
): Promise<DocumentType> {
  const { formatDocument } = handleDocument()
  const document = formatDocument(values)

  if (process.env.NODE_ENV === 'development') {
    await saveDocument(saveProps, document)
  }

  return document
}

// コンポーネントの描画
export default async function MapProductShipmentAmount({ routerProps }: Props) {
  const title = `都道府県の${CARD_TITLE}`

  const saveProps = { ...routerProps, cardId: CARD_ID }

  const topojson = await handleGeoshape('prefecture').readJson()

  const values = await processValues(saveProps)
  const document = await processDocument(saveProps, values)

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
