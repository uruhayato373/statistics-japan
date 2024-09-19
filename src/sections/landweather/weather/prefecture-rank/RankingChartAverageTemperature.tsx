import { Suspense } from 'react'

import CircularProgressCards from 'components/CircularProgressCards'

import { Options } from 'highcharts'

import CardsHighchartsPrefectureRankingChart from 'cards/CardsHighchartsPrefectureRankingChart'

import { actionSaveValues } from 'actions/saveValues'
import handleDocument, { DocumentType } from 'utils/document'
import handleEstatAPI from 'utils/e-stat'
import { CardProps, RouterProps } from 'utils/props'
import { ValueType } from 'utils/value'

const CARD_TITLE = '平均気温'
const CARD_ID = 'RankingChartAverageTemperature'

const ESTAT_PARAMS = {
  statsDataId: '0000010102',
  cdCat01: 'B4101',
}

const OPTIONS: Options = {
  colorAxis: {
    stops: [
      [0, '#FFFFC0'], // 薄い黄色（最低値）
      [0.1, '#FFEDA0'], // やや濃い黄色
      [0.3, '#FED976'], // 薄いオレンジ
      [0.5, '#FEB24C'], // オレンジ
      [0.7, '#FD8D3C'], // 濃いオレンジ
      [0.9, '#FC4E2A'], // 明るい赤
      [1, '#BD0026'], // 暗い赤（最高値）
    ],
    minColor: '#FFFFC0',
    maxColor: '#BD0026',
    startOnTick: false,
    endOnTick: false,
  },
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
export default async function RankingChartAverageTemperature({
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
        options={OPTIONS}
      />
    </Suspense>
  )
}
