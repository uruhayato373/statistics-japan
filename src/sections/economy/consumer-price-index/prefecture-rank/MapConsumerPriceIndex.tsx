import { Suspense } from 'react'

import CircularProgressCards from 'components/CircularProgressCards'

import CardsHighchartsMapChart from 'cards/CardsHighchartsMapChart'

import { saveDocument, SaveProps } from 'app/actions/saveDocument'
import { saveValues } from 'app/actions/saveValues'
import handleDocument, { ValueType, DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import handleGeoshape from 'utils/geoshape'
import { RouterProps } from 'utils/props'
import handleValues from 'utils/values'

const CARD_TITLE = '消費者物価指数'
const CARD_ID = 'MapConsumerPriceIndex'

const ESTAT_PARAMS = {
  statsDataId: '0000010103',
  cdCat01: 'C5101',
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

  const { readValues } = handleValues(saveProps)
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
export default async function MapConsumerPriceIndex({ routerProps }: Props) {
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