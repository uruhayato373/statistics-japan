import { Suspense } from 'react'

import CircularProgressCards from 'components/CircularProgressCards'

import CardsHighchartsPrefectureRankingChart from 'cards/CardsHighchartsPrefectureRankingChart'

import { actionSaveValues } from 'actions/saveValues'
import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { CardProps, RouterProps } from 'utils/props'
import { ValueType } from 'utils/value'

const CARD_TITLE = '可住地面積（総面積に占める割合）'
const CARD_ID = 'RankingChartHabitableAreaPerTotalArea'

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
  await actionSaveValues(cardProps, formatValues(values))

  return formatValues(values)
}

// format values
function formatValues(values: ValueType[]) {
  return values.map((d) => ({
    ...d,
    value: Number(d.value.toFixed(1)),
  }))
}

// document
async function processDocument(values: ValueType[]): Promise<DocumentType> {
  const { formatDocument } = handleDocument()
  const document = formatDocument(values)

  return document
}

// コンポーネントの描画
export default async function RankingChartHabitableAreaPerTotalArea({
  routerProps,
}: Props) {
  const title = `都道府県の${CARD_TITLE}`
  const cardProps = { ...routerProps, cardId: CARD_ID }
  const values = await processValues(cardProps)
  const document = await processDocument(values)

  return (
    <Suspense fallback={<CircularProgressCards />}>
      <CardsHighchartsPrefectureRankingChart
        title={title}
        document={document}
      />
    </Suspense>
  )
}