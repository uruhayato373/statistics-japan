import { Suspense } from 'react'

import CircularProgressCards from 'components/CircularProgressCards'

import CardsHighchartsMapChart from 'cards/CardsHighchartsMapChart'

import { actionSaveValues } from 'actions/saveValues'
import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import handleGeoshape from 'utils/geoshape'
import { CardProps, RouterProps } from 'utils/props'
import handleValue, { ValueType } from 'utils/value'

const CARD_TITLE = '人口集中地区面積（総面積に占める割合）'
const CARD_ID = 'MapChartDenselyPopulatedAreaPerTotalArea'

// 分子
const ESTAT_PARAMS_MOLECULE = {
  statsDataId: '0000010101',
  cdCat01: 'A1802',
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
  if (process.env.NODE_ENV === 'development') {
    const values = await handleEstatAPI().fetchDivisionValues(
      ESTAT_PARAMS_MOLECULE,
      ESTAT_PARAMS_DENOMINATOR
    )
    await actionSaveValues(cardProps, formatValues(values))
  }

  const { readValues } = handleValue()
  const values = await readValues(cardProps)

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
async function processDocument(
  cardProps: CardProps,
  values: ValueType[]
): Promise<DocumentType> {
  const { formatDocument } = handleDocument()
  const document = formatDocument(values)

  return document
}

// コンポーネントの描画
export default async function MapChartDenselyPopulatedAreaPerTotalArea({
  routerProps,
}: Props) {
  const title = `都道府県の${CARD_TITLE}`
  const cardProps = { ...routerProps, cardId: CARD_ID }
  const topojson = await handleGeoshape('prefecture').readJson()
  const values = await processValues(cardProps)
  const document = await processDocument(cardProps, values)

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
