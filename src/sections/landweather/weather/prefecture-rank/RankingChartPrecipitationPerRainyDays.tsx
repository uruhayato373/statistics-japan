import { Suspense } from 'react'

import CircularProgressCards from 'components/CircularProgressCards'

import CardsHighchartsPrefectureRankingChart from 'cards/CardsHighchartsPrefectureRankingChart'

import { actionSaveValues } from 'actions/saveValues'
import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { CardProps, RouterProps } from 'utils/props'
import { ValueType } from 'utils/value'

const CARD_TITLE = '降水量（降水日平均）'
const CARD_ID = 'RankingChartPrecipitationPerRainyDays'

// 分子
const ESTAT_PARAMS_MOLECULE = {
  statsDataId: '0000010102',
  cdCat01: 'B4109',
}

// 分母
const ESTAT_PARAMS_DENOMINATOR = {
  statsDataId: '0000010102',
  cdCat01: 'B4106',
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
  return values.map((d) => ({
    ...d,
    categoryName: '降水量',
    value: Number(d.value.toFixed(1)),
    unit: 'mm/日',
  }))
}

// document
async function processDocument(values: ValueType[]): Promise<DocumentType> {
  const { formatDocument } = handleDocument()
  const document = formatDocument(values)

  return document
}

// コンポーネントの描画
export default async function RankingChartPrecipitationPerRainyDays({
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