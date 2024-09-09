import { Suspense } from 'react'

import CircularProgressCards from 'components/CircularProgressCards'

import CardsHighchartsMapChart from 'cards/CardsHighchartsMapChart'

import { actionSaveValues } from 'actions/saveValues'
import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import handleGeoshape from 'utils/geoshape'
import { CardProps, RouterProps } from 'utils/props'
import { ValueType } from 'utils/value'

const CARD_TITLE = '可住地面積（総面積に占める割合）'
const CARD_ID = 'MapChartHabitableAreaPerTotalArea'

// 分子
const ESTAT_PARAMS_MOLECULE = {
  statsDataId: '0000010102',
  cdCat01: 'B1103',
}

// 分母
const ESTAT_PARAMS_DENOMINATOR = {
  statsDataId: '0000010102',
  cdCat01: 'B1101',
}

interface Props {
  routerProps: RouterProps
}

// values
async function processValues(cardProps: CardProps) {
  const values = await handleEstatAPI().fetchRatioValues(
    ESTAT_PARAMS_MOLECULE,
    ESTAT_PARAMS_DENOMINATOR
  )
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
export default async function MapChartHabitableAreaPerTotalArea({
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
