import { Suspense } from 'react'

import CircularProgressCards from 'components/CircularProgressCards'

import CardsHighchartsMapChart from 'cards/CardsHighchartsMapChart'

import { actionSaveValues } from 'actions/saveValues'
import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import handleGeoshape from 'utils/geoshape'
import { CardProps, RouterProps } from 'utils/props'
import { ValueType } from 'utils/value'

const CARD_TITLE = '人口集中地区面積（可住地面積に占める割合）'
const CARD_ID = 'MapChartDenselyPopulatedAreaPerHabitableArea'

// 分子
const ESTAT_PARAMS_MOLECULE = {
  statsDataId: '0000010101',
  cdCat01: 'A1802',
}

// 分母
const ESTAT_PARAMS_DENOMINATOR = {
  statsDataId: '0000010102',
  cdCat01: 'B1103',
}

interface Props {
  routerProps: RouterProps
}

// values
async function processValues(cardProps: CardProps) {
  const values = await handleEstatAPI().fetchDivisionValues(
    ESTAT_PARAMS_MOLECULE,
    ESTAT_PARAMS_DENOMINATOR
  )
  await actionSaveValues(cardProps, formatValues(values))

  return formatValues(values)
}

// format values
function formatValues(values: ValueType[]) {
  // 人口集中地区面積はkm2、総面積はhaなので、100倍する
  return values.map((d) => ({
    ...d,
    value: d.value * 100,
    unit: '%',
  }))
}

// document
async function processDocument(values: ValueType[]): Promise<DocumentType> {
  const { formatDocument } = handleDocument()
  const document = formatDocument(values)

  return document
}

// コンポーネントの描画
export default async function MapChartDenselyPopulatedAreaPerHabitableArea({
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
